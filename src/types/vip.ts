export type RewardStatus = 'locked' | 'available' | 'claimed';

export interface VipUser {
  username: string;
  currentXp: number;
  currentLevel: VipLevel;
  nextLevel: VipLevelDetail;
  progress: number;
}

export interface Reward {
  id: string;
  title: string;
  status: RewardStatus;
  description: string;
  countdown?: string;
  xpReward: number;
  icon: string;
}

export interface VipLevel {
  id: string;
  name: string;
  level: string;
  xpRequired: number;
  completed: boolean;
  icon: string;
}

export interface VipLevelDetail {
  id: string;
  levelId: string;
  level: string;
  xpRequired: number;
  completed: boolean;
}

export interface VipData {
  vipUser: VipUser;
  rewards: Reward[];
  vipLevels: VipLevel[];
  vipLevelDetails: VipLevelDetail[];
}
