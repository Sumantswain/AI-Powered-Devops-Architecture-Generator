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
import { Cloud, DollarSign, FileCode, GitBranch, Sparkles, TrendingUp } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

const costData = [
  { name: 'EC2', value: 420, color: '#3b82f6' },
  { name: 'RDS', value: 280, color: '#22c55e' },
  { name: 'S3', value: 45, color: '#8b5cf6' },
  { name: 'CloudFront', value: 120, color: '#f59e0b' },
  { name: 'ALB', value: 35, color: '#06b6d4' },
];

const usageData = [
  { name: 'EC2', count: 12 },
  { name: 'Lambda', count: 28 },
  { name: 'RDS', count: 4 },
  { name: 'S3', count: 9 },
  { name: 'CloudFront', count: 6 },
];

const score = 87;

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold tracking-tight text-white"
        >
          Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-1 text-sm text-slate-400"
        >
          Overview of your architectures and cost estimates
        </motion.p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard delay={0.05}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Architectures
              </p>
              <p className="mt-1 text-2xl font-bold text-white">128</p>
              <p className="text-xs text-slate-500">Last 30 days</p>
            </div>
            <div className="rounded-xl bg-primary-500/20 p-3">
              <Cloud className="h-6 w-6 text-primary-400" />
            </div>
          </div>
        </GlassCard>
        <GlassCard delay={0.1}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Est. Monthly Cost
              </p>
              <p className="mt-1 text-2xl font-bold text-white">$2.4k</p>
              <p className="text-xs text-slate-500">Across all envs</p>
            </div>
            <div className="rounded-xl bg-accent-500/20 p-3">
              <DollarSign className="h-6 w-6 text-accent-400" />
            </div>
          </div>
        </GlassCard>
        <GlassCard delay={0.15}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Terraform Exports
              </p>
              <p className="mt-1 text-2xl font-bold text-white">97</p>
              <p className="text-xs text-slate-500">Ready for apply</p>
            </div>
            <div className="rounded-xl bg-violet-500/20 p-3">
              <FileCode className="h-6 w-6 text-violet-400" />
            </div>
          </div>
        </GlassCard>
        <GlassCard delay={0.2}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                CI/CD Templates
              </p>
              <p className="mt-1 text-2xl font-bold text-white">64</p>
              <p className="text-xs text-slate-500">GitHub Actions</p>
            </div>
            <div className="rounded-xl bg-amber-500/20 p-3">
              <GitBranch className="h-6 w-6 text-amber-400" />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard delay={0.25} className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary-400" />
            <h2 className="text-sm font-semibold text-white">Service usage</h2>
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
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard delay={0.3}>
          <div className="mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent-400" />
            <h2 className="text-sm font-semibold text-white">Cost breakdown</h2>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
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

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard delay={0.35}>
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary-400" />
            <h2 className="text-sm font-semibold text-white">Scalability score</h2>
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative h-32 w-32">
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
              <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
                {score}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-400">Out of 100</p>
          </div>
        </GlassCard>

        <GlassCard delay={0.4} className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <h2 className="text-sm font-semibold text-white">AI recommendations</h2>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-2 rounded-lg bg-white/5 px-3 py-2">
              <span className="text-primary-400">•</span>
              Consider gp3 for RDS storage to reduce baseline IOPS cost.
            </li>
            <li className="flex gap-2 rounded-lg bg-white/5 px-3 py-2">
              <span className="text-primary-400">•</span>
              Enable CloudFront caching for static assets served from S3.
            </li>
            <li className="flex gap-2 rounded-lg bg-white/5 px-3 py-2">
              <span className="text-primary-400">•</span>
              Use Graviton-based instances (m7g, c7g) for up to 20% compute savings.
            </li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
