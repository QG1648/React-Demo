import { Button } from '../Button/Button';
import type { Reward } from '../../types/vip';
import  { icons } from '../../icons';

interface RewardCardProps {
  reward: Reward;
  onClaim: (rewardId: string) => void;
}

const statusLabel: Record<Reward['status'], string> = {
  available: 'Available',
  locked: 'Locked',
  claimed: 'Claimed',
};

const statusClass: Record<Reward['status'], string> = {
  available: 'border-fuchsia-300/30 bg-fuchsia-400/12 text-fuchsia-100',
  locked: 'border-slate-300/10 bg-slate-500/10 text-slate-300',
  claimed: 'border-emerald-300/20 bg-emerald-400/10 text-emerald-100',
};

export const RewardCard = ({ reward, onClaim }: RewardCardProps) => {
  const isAvailable = reward.status === 'available';

  return (
    <article className="group relative flex h-full min-h-[142px] flex-col rounded-lg border border-white/[0.06] bg-[#1b1725] px-4 py-3 transition duration-200 hover:-translate-y-1 hover:border-[#aa4cff]/50 hover:shadow-[0_0_24px_rgba(169,67,255,0.22)]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-semibold text-white/70">{reward.description}</span>
        <span className="text-[12px] text-white/45">
        <img className="h-[12px] w-[12px] object-contain transition group-hover:scale-110" src={icons.rewardsGift} alt="" />
        </span>
      </div>

      <div className="mt-3 flex justify-center">
        <img className="h-[52px] w-[52px] object-contain transition group-hover:scale-110" src={reward.icon} alt="" />
        <span className={`sr-only rounded-full border px-3 py-1 text-xs font-semibold ${statusClass[reward.status]}`}>
          {statusLabel[reward.status]}
        </span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div>
          <h3 className="text-[11px] font-bold text-white">{reward.title}</h3>
          <p className="mt-0.5 text-[9px] font-semibold text-white/50">+{reward.xpReward.toLocaleString()} XP</p>
        </div>
        <p className="text-right text-[9px] font-semibold text-[#bc6cff]">
          {reward.countdown ?? statusLabel[reward.status]}
        </p>
      </div>

      <Button className="mt-2 h-5 w-full px-3 py-0 text-[9px]" disabled={!isAvailable} onClick={() => onClaim(reward.id)}>
        {reward.status === 'claimed' ? 'Claimed' : 'Claim'}
      </Button>
    </article>
  );
};
