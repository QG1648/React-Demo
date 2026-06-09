import { icons } from '../icons';
import type { Reward, VipData, VipLevel, VipLevelDetail, VipUser } from '../types/vip';

export const rewards: Reward[] = [
  {
    id: 'instant-rakeback',
    title: 'Instant Rakeback',
    status: 'available',
    description: 'Ready To Claim',
    xpReward: 500,
    icon: icons.instantRakeback,
  },
  {
    id: 'weekly-rakeback',
    title: 'Weekly Rakeback',
    status: 'available',
    description: 'Ready To Claim',
    xpReward: 5000,
    icon: icons.weeklyRakeback,
  },
  {
    id: 'level-up-bonus',
    title: 'Level-up Bonus',
    status: 'available',
    description: 'Ready To Claim',
    xpReward: 500,
    icon: icons.levelUpBonus,
  },
  {
    id: 'monthly-bonus',
    title: 'Monthly Bonus',
    status: 'available',
    description: 'Ready To Claim',
    xpReward: 10000,
    icon: icons.monthlyBonus,
  },
];

export const vipLevels: VipLevel[] = [
  {
    id: 'capsule',
    name: 'Capsule',
    level: 'Lv.1',
    xpRequired: 0,
    completed: true,
    icon: icons.vipCapsule,
  },
  {
    id: 'tablet',
    name: 'Tablet',
    level: 'Lv.2',
    xpRequired: 1000,
    completed: true,
    icon: icons.vipTablet,
  },
  {
    id: 'dose',
    name: 'Dose',
    level: 'Lv.3',
    xpRequired: 6000,
    completed: false,
    icon: icons.vipDose,
  },
  {
    id: 'double-dose',
    name: 'Double dose',
    level: 'Lv.4',

    xpRequired: 16000,
    completed: false,
    icon: icons.vipDoubleDose,
  },
  {
    id: 'booster',
    name: 'Booster',
    level: 'Lv.5',
    xpRequired: 35000,
    completed: false,
    icon: icons.vipBooster,
  },
];

export const vipLevelDetails: VipLevelDetail[] = [
  { id: 'capsule-1', levelId: 'capsule', level: 'Capsule Lv.1', xpRequired: 0, completed: true },
  { id: 'capsule-2', levelId: 'capsule', level: 'Capsule Lv.2', xpRequired: 200, completed: true },
  { id: 'capsule-3', levelId: 'capsule', level: 'Capsule Lv.3', xpRequired: 400, completed: true },
  { id: 'capsule-4', levelId: 'capsule', level: 'Capsule Lv.4', xpRequired: 600, completed: true },
  { id: 'capsule-5', levelId: 'capsule', level: 'Capsule Lv.5', xpRequired: 800, completed: true },
  { id: 'tablet-1', levelId: 'tablet', level: 'Tablet Lv.1', xpRequired: 1000, completed: true },
  { id: 'tablet-2', levelId: 'tablet', level: 'Tablet Lv.2', xpRequired: 2000, completed: true },
  { id: 'tablet-3', levelId: 'tablet', level: 'Tablet Lv.3', xpRequired: 3000, completed: false },
  { id: 'tablet-4', levelId: 'tablet', level: 'Tablet Lv.4', xpRequired: 4000, completed: false },
  { id: 'tablet-5', levelId: 'tablet', level: 'Tablet Lv.5', xpRequired: 5000, completed: false },
  { id: 'dose-1', levelId: 'dose', level: 'Dose Lv.1', xpRequired: 6000, completed: false },
  { id: 'dose-2', levelId: 'dose', level: 'Dose Lv.2', xpRequired: 8000, completed: false },
  { id: 'dose-3', levelId: 'dose', level: 'Dose Lv.3', xpRequired: 10000, completed: false },
  { id: 'dose-4', levelId: 'dose', level: 'Dose Lv.4', xpRequired: 12000, completed: false },
  { id: 'dose-5', levelId: 'dose', level: 'Dose Lv.5', xpRequired: 14000, completed: false },
  { id: 'double-dose-1', levelId: 'double-dose', level: 'Double dose Lv.1', xpRequired: 16000, completed: false },
  { id: 'double-dose-2', levelId: 'double-dose', level: 'Double dose Lv.2', xpRequired: 20000, completed: false },
  { id: 'double-dose-3', levelId: 'double-dose', level: 'Double dose Lv.3', xpRequired: 24000, completed: false },
  { id: 'double-dose-4', levelId: 'double-dose', level: 'Double dose Lv.4', xpRequired: 28000, completed: false },
  { id: 'double-dose-5', levelId: 'double-dose', level: 'Double dose Lv.5', xpRequired: 32000, completed: false },
  { id: 'booster-1', levelId: 'booster', level: 'Booster Lv.1', xpRequired: 35000, completed: false },
  { id: 'booster-2', levelId: 'booster', level: 'Booster Lv.2', xpRequired: 40000, completed: false },
  { id: 'booster-3', levelId: 'booster', level: 'Booster Lv.3', xpRequired: 45000, completed: false },
  { id: 'booster-4', levelId: 'booster', level: 'Booster Lv.4', xpRequired: 50000, completed: false },
  { id: 'booster-5', levelId: 'booster', level: 'Booster Lv.5', xpRequired: 550000, completed: false },
];

export const vipUser: VipUser = {
  username: 'UserID',
  currentXp: 2000,
  currentLevel: vipLevels[1], // Tablet Lv.2
  nextLevel: vipLevelDetails[7], // Tablet Lv.3
  progress: 0,
};
export const mockVipData: VipData = {
  vipUser,
  rewards,
  vipLevels,
  vipLevelDetails,
};
