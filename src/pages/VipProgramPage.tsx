import { useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { ErrorState } from '../components/ErrorState/ErrorState';
import { Loading } from '../components/Loading/Loading';
import { RewardsSection } from '../components/RewardsSection/RewardsSection';
import { VipHero } from '../components/VipHero/VipHero';
import { VipLevelsCarousel } from '../components/VipLevelsCarousel/VipLevelsCarousel';
import { VipLevelTable } from '../components/VipLevelTable/VipLevelTable';
import { useVipData } from '../hooks/useVipData';
import type { Reward, VipData, VipLevel, VipLevelDetail, VipUser } from '../types/vip';

const HOUR_MS = 60 * 60 * 1000;
const WEEK_MS = 7 * 24 * HOUR_MS;

const rewardRules: Record<string, { cooldownMs?: number; monthly?: boolean; levelUp?: boolean }> = {
  'instant-rakeback': { cooldownMs: HOUR_MS },
  'weekly-rakeback': { cooldownMs: WEEK_MS },
  'level-up-bonus': { levelUp: true },
  'monthly-bonus': { monthly: true },
};

type RewardCooldown = number | 'next-level';

interface ResolvedVipState {
  user: VipUser;
  currentLevel: VipLevel;
  vipLevelDetails: VipLevelDetail[];
  pointsUntilNextLevel: number;
}

const getMonthlyCooldown = () => {
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth.getTime();
};

const formatCountdown = (targetTime: number, now: number) => {
  const totalSeconds = Math.max(0, Math.ceil((targetTime - now) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
};

const resolveVipState = (data: VipData, bonusXp: number): ResolvedVipState => {
  const currentXp = data.vipUser.currentXp + bonusXp;
  const sortedLevelDetails = [...data.vipLevelDetails].sort((a, b) => a.xpRequired - b.xpRequired);
  const currentLevelDetail =
    [...sortedLevelDetails].reverse().find((detail) => currentXp >= detail.xpRequired) ?? data.vipUser.nextLevel;
  const nextLevel = sortedLevelDetails.find((detail) => detail.xpRequired > currentXp) ?? currentLevelDetail;
  const vipLevelDetails = data.vipLevelDetails.map((detail) => ({
    ...detail,
    completed: currentXp >= detail.xpRequired,
  }));
  const baseCurrentLevel =
    data.vipLevels.find((level) => level.id === currentLevelDetail.levelId) ?? data.vipUser.currentLevel;
  const currentLevel = {
    ...baseCurrentLevel,
    xpRequired: currentLevelDetail.xpRequired,
    completed: true,
  };
  const pointsUntilNextLevel = Math.max(nextLevel.xpRequired - currentXp, 0);
  const progress =
    nextLevel.id === currentLevelDetail.id || nextLevel.xpRequired <= 0
      ? 100
      : Math.min(100, Math.max(0, Math.round((currentXp / nextLevel.xpRequired) * 100)));

  return {
    user: {
      ...data.vipUser,
      currentXp,
      currentLevel,
      nextLevel,
      progress,
    },
    currentLevel,
    vipLevelDetails,
    pointsUntilNextLevel,
  };
};

export const VipProgramPage = () => {
  const { data, loading, error, refetch } = useVipData();
  const [rewardCooldowns, setRewardCooldowns] = useState<Record<string, RewardCooldown>>({});
  const [bonusXp, setBonusXp] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);

    return () => window.clearInterval(timer);
  }, []);

  const vipState = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return resolveVipState(data, bonusXp);
  }, [bonusXp, data]);

  const selectedLevel = useMemo(() => {
    if (!data?.vipLevels.length) {
      return undefined;
    }

    const currentLevel = vipState?.currentLevel;

    return data.vipLevels.find((level) => level.id === selectedLevelId) ?? currentLevel ?? data.vipLevels[0];
  }, [data?.vipLevels, selectedLevelId, vipState?.currentLevel]);

  const rewards = useMemo<Reward[]>(() => {
    if (!data) {
      return [];
    }

    return data.rewards.map((reward) => {
      const cooldown = rewardCooldowns[reward.id];

      if (cooldown === 'next-level') {
        return {
          ...reward,
          status: 'locked',
          description: 'Upgrade To Unlock',
          countdown: 'Next level',
        };
      }

      if (typeof cooldown === 'number' && cooldown > now) {
        return {
          ...reward,
          status: 'locked',
          description: 'Cooling Down',
          countdown: formatCountdown(cooldown, now),
        };
      }

      return {
        ...reward,
        status: 'available',
        description: 'Ready To Claim',
        countdown: 'Available',
      };
    });
  }, [data, now, rewardCooldowns]);

  const claimableRewardCount = useMemo(
    () => rewards.filter((reward) => reward.status === 'available').length,
    [rewards],
  );

  const levelDetails = useMemo(() => {
    if (!data || !selectedLevel) {
      return [];
    }

    return (vipState?.vipLevelDetails ?? data.vipLevelDetails).filter((detail) => detail.levelId === selectedLevel.id);
  }, [data, selectedLevel, vipState?.vipLevelDetails]);

  const handleClaim = (rewardId: string) => {
    const reward = rewards.find((item) => item.id === rewardId);

    if (!reward || reward.status !== 'available') {
      return;
    }

    const rule = rewardRules[rewardId];
    const nextCooldown: RewardCooldown = rule?.levelUp
      ? 'next-level'
      : rule?.monthly
        ? getMonthlyCooldown()
        : Date.now() + (rule?.cooldownMs ?? 0);

    setBonusXp((currentXp) => currentXp + reward.xpReward);
    setRewardCooldowns((currentCooldowns) => ({
      ...currentCooldowns,
      [rewardId]: nextCooldown,
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070712] px-4 py-10 text-white">
        <ErrorState message={error} onRetry={refetch} />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[#070712] px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <EmptyState title="VIP data is empty" description="Please retry after the VIP data source is available." />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#191919] p-2 text-white sm:p-4">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[#191919]" />
      </div>

      <div className="relative mx-auto max-w-[980px] space-y-10 bg-[#15121d] px-6 py-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:px-10 sm:py-12">
        <VipHero
          user={vipState?.user ?? data.vipUser}
          pointsUntil={vipState?.pointsUntilNextLevel ?? 0}
        />
        <RewardsSection rewards={rewards} claimableCount={claimableRewardCount} onClaim={handleClaim} />
        <VipLevelsCarousel
          levels={data.vipLevels}
          selectedLevelId={selectedLevel?.id ?? ''}
          currentLevelId={vipState?.currentLevel.id ?? data.vipUser.currentLevel.id}
          onSelectLevel={setSelectedLevelId}
        />
        <VipLevelTable details={levelDetails} />
      </div>
    </main>
  );
};
