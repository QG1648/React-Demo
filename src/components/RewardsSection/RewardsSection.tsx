import { EmptyState } from '../EmptyState/EmptyState';
import { RewardCard } from '../RewardCard/RewardCard';
import type { Reward } from '../../types/vip';

interface RewardsSectionProps {
  rewards: Reward[];
  claimableCount: number;
  onClaim: (rewardId: string) => void;
}

export const RewardsSection = ({ rewards, claimableCount, onClaim }: RewardsSectionProps) => (
  <section>
    <div className="mb-6 flex items-center gap-2">
      <h2 className="text-2xl font-black text-white">My Rewards</h2>
      <span className="rounded bg-[#a943ff] px-2 py-0.5 text-sm font-black leading-none text-white">
        {claimableCount}
      </span>
    </div>

    {rewards.length > 0 ? (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} onClaim={onClaim} />
        ))}
      </div>
    ) : (
      <EmptyState title="No rewards" description="Rewards will appear after your VIP data is loaded." />
    )}
  </section>
);
