import type { CSSProperties } from 'react';
import { VipLevelCard } from '../VipLevelCard/VipLevelCard';
import type { VipLevel } from '../../types/vip';

interface VipLevelsCarouselProps {
  levels: VipLevel[];
  selectedLevelId: string;
  currentLevelId: string;
  onSelectLevel: (levelId: string) => void;
}

export const VipLevelsCarousel = ({ levels, selectedLevelId, currentLevelId, onSelectLevel }: VipLevelsCarouselProps) => {
  const selectedIndex = Math.max(
    0,
    levels.findIndex((level) => level.id === selectedLevelId),
  );

  const selectByOffset = (offset: number) => {
    if (levels.length === 0) {
      return;
    }

    const nextIndex = (selectedIndex + offset + levels.length) % levels.length;
    onSelectLevel(levels[nextIndex].id);
  };

  const getSlot = (index: number) => {
    if (levels.length === 0) {
      return 0;
    }

    const rawOffset = (index - selectedIndex + levels.length) % levels.length;
    return rawOffset > levels.length / 2 ? rawOffset - levels.length : rawOffset;
  };

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-black text-white">VIP Levels</h2>
      </div>

      <div className="relative -mx-6 min-h-[218px] overflow-hidden px-6 sm:-mx-8 sm:min-h-[230px] sm:px-8">
        <button
          className="absolute left-1 top-[52%] z-30 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#2a2538] text-[10px] font-bold text-white/55 transition hover:bg-[#9f49ff]/45 hover:text-white sm:left-3"
          onClick={() => selectByOffset(-1)}
          aria-label="Previous VIP level"
          type="button"
        >
          &lt;
        </button>
        <button
          className="absolute right-1 top-[52%] z-30 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#2a2538] text-[10px] font-bold text-white/55 transition hover:bg-[#9f49ff]/45 hover:text-white sm:right-3"
          onClick={() => selectByOffset(1)}
          aria-label="Next VIP level"
          type="button"
        >
          &gt;
        </button>

        <div className="vip-level-orbit pointer-events-none absolute inset-x-6 top-[74px] h-[126px] sm:inset-x-10 sm:top-[82px] sm:h-[132px]" />
        <div className="relative z-10 h-[204px] [perspective:900px] sm:h-[216px]">
          {levels.map((level, index) => {
            const slot = getSlot(index);
            const depth = Math.abs(slot);
            const visible = depth <= 2;
            const selected = level.id === selectedLevelId;

            return (
              <VipLevelCard
                key={level.id}
                level={level}
                selected={selected}
                current={level.id === currentLevelId}
                onSelect={onSelectLevel}
                className={`vip-orbit-card ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}
                style={
                  {
                    '--slot': slot,
                    '--depth': depth,
                    '--orbit-x': `${slot * 126}px`,
                    '--orbit-y': `${depth * 16}px`,
                    '--scale': selected ? 1.05 : Math.max(0.58, 1 - depth * 0.18),
                    '--tilt': `${slot * -10}deg`,
                    opacity: visible ? 1 - depth * 0.24 : 0,
                    zIndex: 20 - depth,
                  } as CSSProperties
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
