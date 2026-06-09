import type { CSSProperties } from 'react';
import type { VipLevel } from '../../types/vip';
import { icons } from '../../icons';

interface VipLevelCardProps {
  level: VipLevel;
  selected: boolean;
  current: boolean;
  onSelect: (levelId: string) => void;
  className?: string;
  style?: CSSProperties;
}

export const VipLevelCard = ({ level, selected, current, onSelect, className = '', style }: VipLevelCardProps) => (
  <button
    className={`group relative h-[164px] w-[146px] overflow-hidden rounded-xl border px-3 py-4 text-center transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d85eff]/80 sm:h-[174px] sm:w-[166px] ${
      selected
        ? 'border-[#9f49ff] bg-[#1b1726] text-white shadow-[0_0_5px_rgba(159,73,255,0.45),inset_0_0_6px_rgba(159,73,255,0.08)]'
        : 'border-white/[0.06] bg-[#14121d]/90 text-white/62 shadow-[0_14px_30px_rgba(0,0,0,0.22)] hover:border-[#9f49ff]/45 hover:text-white'
    } ${className}`}
    style={style}
    onClick={() => onSelect(level.id)}
    type="button"
  >
    {current ? (
      <img className="absolute right-1 top-1 h-auto w-auto max-w-none" src={icons.me} alt="Current level" />
    ) : null}
    <img
      className="relative mx-auto h-[76px] w-full object-contain drop-shadow-[0_0_20px_rgba(244,114,182,0.48)] transition duration-300 group-hover:scale-105 sm:h-[84px]"
      src={level.icon}
      alt={`${level.name} level`}
    />
    <h3 className="relative mt-2 text-base font-black leading-tight sm:text-lg">{level.name}</h3>
    <p className={`mt-1 text-[8px] font-semibold ${selected ? 'text-[#9f49ff]' : 'text-white/30'}`}>
      {level.xpRequired.toLocaleString()} XP required
    </p>
  </button>
);
