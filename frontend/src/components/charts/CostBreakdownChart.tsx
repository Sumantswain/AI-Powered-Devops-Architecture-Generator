import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

type Props = {
  data: { name: string; value: number }[];
};

export function CostBreakdownChart({ data }: Props) {
  return (
    <div className="h-64 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-glass-dark">
      <div className="mb-3 text-sm font-medium text-slate-200">
        Infrastructure cost breakdown
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={11} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#020617',
              borderColor: '#1e293b',
              borderRadius: 12,
              color: '#e2e8f0',
              fontSize: 12,
            }}
          />
          <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

