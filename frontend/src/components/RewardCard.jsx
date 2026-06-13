import { formatCRT } from "../utils/helpers";

function StatCard({ label, value, sub, valueClass = "" }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="mb-1 text-sm text-slate-500">{label}</p>
      <p className={`text-2xl font-medium text-slate-900 ${valueClass}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
    </div>
  );
}

export default function RewardCard({ rewardAmount, claimed }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {/* READ #1 */}
      <StatCard label="Reward amount" value={formatCRT(rewardAmount)} sub="Course Reward Token" />
      {/* READ #2 */}
      <StatCard
        label="Status klaim"
        value={claimed ? "Sudah diklaim" : "Belum diklaim"}
        sub="Dibaca dari smart contract"
        valueClass={claimed ? "text-emerald-600" : "text-amber-600"}
      />
    </div>
  );
}
