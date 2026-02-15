import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { TrendingUp, DollarSign, Activity } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

const costData = [
  { name: 'EC2', value: 520, color: '#3b82f6' },
  { name: 'RDS', value: 320, color: '#22c55e' },
  { name: 'ALB', value: 48, color: '#8b5cf6' },
  { name: 'S3', value: 28, color: '#f59e0b' },
  { name: 'CloudFront', value: 95, color: '#06b6d4' },
];

const usageData = [
  { name: 'EC2', value: 260 },
  { name: 'RDS', value: 180 },
  { name: 'ALB', value: 40 },
  { name: 'S3', value: 20 },
  { name: 'CloudFront', value: 60 },
];

export function AnalyticsPage() {
  const score = 92;
  return (
    <div className="space-y-8">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold tracking-tight text-white"
        >
          Analytics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="mt-1 text-sm text-slate-400"
        >
          Cost breakdown and scalability metrics
        </motion.p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard delay={0.1}>
          <div className="mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent-400" />
            <h2 className="text-sm font-semibold text-white">Estimated monthly cost</h2>
          </div>
          <p className="text-3xl font-bold text-white">$2,343</p>
          <p className="text-xs text-slate-500">Across all tiers</p>
        </GlassCard>
        <GlassCard delay={0.15}>
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary-400" />
            <h2 className="text-sm font-semibold text-white">Scalability score</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: score / 100 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="text-primary-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                {score}
              </span>
            </div>
            <p className="text-xs text-slate-400">Autoscaling & multi-AZ enabled</p>
          </div>
        </GlassCard>
        <GlassCard delay={0.2}>
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-violet-400" />
            <h2 className="text-sm font-semibold text-white">Optimization</h2>
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>• Use gp3 for RDS storage</li>
            <li>• Enable CloudFront caching</li>
            <li>• Consider Graviton instances</li>
          </ul>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard delay={0.25}>
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary-400" />
            <h2 className="text-sm font-semibold text-white">Cost by service</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12,
                    color: '#e2e8f0',
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        <GlassCard delay={0.3}>
          <div className="mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent-400" />
            <h2 className="text-sm font-semibold text-white">Distribution</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {costData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12,
                    color: '#e2e8f0',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
