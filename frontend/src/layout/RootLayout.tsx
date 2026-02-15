import { ReactNode, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CloudIcon,
  Cog6ToothIcon,
  CpuChipIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';

type Props = {
  children: ReactNode;
};

type Theme = 'dark' | 'light';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: RectangleStackIcon },
  { to: '/builder', label: 'Architecture Builder', icon: CloudIcon },
  { to: '/analytics', label: 'Analytics', icon: CpuChipIcon },
  { to: '/export', label: 'Exports', icon: Cog6ToothIcon },
];

export function RootLayout({ children }: Props) {
  const [theme, setTheme] = useState<Theme>('dark');
  const location = useLocation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <aside className="hidden border-r border-slate-800/60 bg-slate-950/70 px-4 py-6 shadow-glass-dark backdrop-blur-md md:block w-64">
        <div className="flex items-center gap-2 px-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary-500 to-accent-500 shadow-lg" />
          <div>
            <div className="text-sm font-semibold tracking-tight text-slate-50">
              DevOps Architect AI
            </div>
            <div className="text-xs text-slate-400">AWS-native architectures</div>
          </div>
        </div>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-slate-800/80 text-slate-50 shadow-inner shadow-slate-900'
                      : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-100',
                  ].join(' ')
                }
              >
                <Icon className="h-5 w-5 text-slate-400 group-hover:text-primary-400" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-800/60 bg-slate-950/70 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 md:hidden">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary-500 to-accent-500 shadow-lg" />
              <span className="text-sm font-semibold text-slate-50">
                DevOps Architect AI
              </span>
            </div>
            <div className="hidden text-xs font-medium text-slate-400 md:block">
              AI-powered DevOps architecture generator · Enterprise-ready
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
                }
                className="inline-flex h-9 items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 text-xs font-medium text-slate-200 shadow-glass-dark backdrop-blur-md hover:border-primary-500 hover:text-primary-100"
              >
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-amber-300 to-rose-400 shadow"
                  aria-hidden
                />
                <span>{theme === 'dark' ? 'Dark' : 'Light'} mode</span>
              </button>
              <div className="flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-2 py-1 text-xs shadow-glass-dark backdrop-blur">
                <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-slate-500 to-slate-300" />
                <div className="leading-tight">
                  <div className="font-medium text-slate-100">Balram</div>
                  <div className="text-[10px] uppercase tracking-wide text-emerald-400">
                    Pro plan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-gradient-to-b from-slate-950/90 via-slate-950 to-slate-950 px-3 pb-6 pt-4 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="mx-auto max-w-7xl"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

