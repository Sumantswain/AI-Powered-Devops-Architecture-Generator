import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

type Props = {
  data: { name: string; value: number }[];
};

const COLORS = ['#22c55e', '#38bdf8', '#a855f7', '#f97316', '#facc15'];

export function ServiceDistributionPie({ data }: Props) {
  return (
    <div className="h-64 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-glass-dark">
      <div className="mb-3 text-sm font-medium text-slate-200">
        Service distribution
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            dataKey="value"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
                stroke="#020617"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#020617',
              borderColor: '#1e293b',
              borderRadius: 12,
              color: '#e2e8f0',
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

