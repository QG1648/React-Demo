import { EmptyState } from '../EmptyState/EmptyState';
import type { VipLevelDetail } from '../../types/vip';

interface VipLevelTableProps {
  details: VipLevelDetail[];
}

export const VipLevelTable = ({ details }: VipLevelTableProps) => (
  <section className="min-h-[236px]">
    {details.length > 0 ? (
      <div className="overflow-x-auto rounded-lg border border-white/[0.04] bg-[#181521]">
        <table className="w-full min-w-[620px] table-fixed border-collapse text-left">
          <thead className="bg-[#1d1928] text-[10px] text-white/45">
            <tr>
              <th className="w-[42%] px-20 py-3 font-semibold">VIP Level</th>
              <th className="w-[28%] px-5 py-3 font-semibold">XP Required</th>
              <th className="w-[30%] px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail) => (
              <tr className="text-[11px] transition hover:bg-purple-300/5" key={detail.id}>
                <td className="px-20 py-2.5 font-semibold text-white/80">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#d85eff] shadow-[0_0_8px_rgba(216,94,255,0.8)]" />
                  {detail.level}
                </td>
                <td className="px-5 py-2.5 text-white/80">{detail.xpRequired.toLocaleString()}</td>
                <td className="px-5 py-2.5">
                  <span className="inline-flex items-center gap-2 text-white/80">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        detail.completed ? 'bg-[#9a55ff]' : 'border border-white bg-transparent'
                      }`}
                    />
                    {detail.completed ? 'Completed' : 'Incomplete'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <EmptyState title="No level details" description="This VIP level does not have detail rows yet." />
    )}
  </section>
);
