import { icons } from '../../icons';
import type { VipLevel, VipUser } from '../../types/vip';

interface VipHeroProps {
  user: VipUser;
  level?: VipLevel;
  pointsUntil?: number;
}

export const VipHero = ({ user, pointsUntil }: VipHeroProps) => (
  <section>
    <h1 className="text-2xl font-black tracking-tight text-white sm:text-[28px]">VIP Loyalty Club</h1>

    <div className="relative mt-7 overflow-hidden rounded-lg bg-[#171521] px-8 py-7 shadow-[0_18px_55px_rgba(0,0,0,0.32)] sm:px-10">
      <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_340px] md:items-stretch">
      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-3">
          <img
            className="h-11 w-11 rounded-full bg-[#6f2cd9] object-cover p-1"
            src={icons.me}
            alt={`${user.username} avatar`}
          />
          <div>
            <p className="text-xl font-black text-white">{user.username}</p>
          </div>
        </div>

        <div className="mt-5 max-w-[430px]">
          <div className="flex items-center justify-between text-[10px] font-semibold text-white">
            <span>My XP: {user.currentXp.toLocaleString()}</span>
            <span>{user.progress}%</span>
          </div>
          <div className="relative mt-2 h-2 rounded-full bg-[#4b295d]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8047ff] to-[#ee61ff] shadow-[0_0_14px_rgba(205,86,255,0.8)]"
              style={{ width: `${user.progress}%` }}
            />
            <span
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#ee61ff] shadow-[0_0_14px_rgba(205,86,255,0.95)]"
              style={{ left: `calc(${user.progress}% - 6px)` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-white/80">
            <span>
              {typeof pointsUntil === 'number'
                ? `${pointsUntil.toLocaleString()} points until ${user.nextLevel.level}`
                : `${user.currentXp} points until ${user.nextLevel.level}`}
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#ee61ff]" />
              {user.nextLevel.level}
            </span>
          </div>
        </div>

        <p className="mt-7 max-w-[460px] text-[10px] leading-5 text-white/60">
          Your Monthly activity will be reset on first Thursday the level up point, before new level of every month,
          and enjoy the privilege you truly deserve.
        </p>
      </div>

      <div className="relative -mx-8 -mb-7 flex min-h-[210px] items-center justify-center overflow-hidden px-8 pb-7 pt-5 sm:-mx-10 sm:px-10 md:-my-7 md:-mr-10 md:ml-0 md:pb-7 md:pt-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_7%,rgba(210,95,255,0.85),transparent_4.5rem),radial-gradient(ellipse_at_52%_100%,rgba(135,60,255,0.35),transparent_10rem)]" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-[#d958ff] via-[#803bca] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-px w-[88%] bg-gradient-to-l from-[#d958ff] via-[#7431bc]/70 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-8 w-56 -translate-x-1/2 rounded-[100%] bg-[#8f40ff]/30 blur-xl" />

        <div className="relative flex flex-col items-center justify-center">
          <img
            className="relative h-28 w-40 object-contain drop-shadow-[0_0_24px_rgba(244,114,182,0.72)] sm:h-32 sm:w-44"
            src={user.currentLevel.icon}
            alt={`${user.currentLevel.name} VIP level`}
          />
          <span className="relative mt-1 rounded-full bg-[#8f40ff] px-4 py-1 text-[9px] font-bold text-white shadow-[0_0_16px_rgba(143,64,255,0.75)]">
            {user.currentLevel.level}
          </span>
          <p className="relative mt-2 text-4xl font-black leading-none text-white">{user.currentLevel.name}</p>
        </div>
      </div>
    </div>
    </div>
  </section>
);
