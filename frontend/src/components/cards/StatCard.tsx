import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Props = {
  title: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
};

export function StatCard({ title, value, helper, icon }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/80 p-4 shadow-glass-dark backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {title}
          </div>
          <div className="mt-1 text-xl font-semibold text-slate-50">
            {value}
          </div>
          {helper && (
            <div className="mt-1 text-xs text-slate-400">{helper}</div>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 text-primary-300 shadow-inner shadow-slate-900">
            {icon}
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-px -z-10 rounded-2xl bg-gradient-to-br from-primary-500/15 via-transparent to-emerald-500/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}

