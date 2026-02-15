import { motion } from 'framer-motion';
import { Moon, Sun, User, Sparkles } from 'lucide-react';

type Props = {
  dark: boolean;
  onThemeToggle: () => void;
  sidebarCollapsed: boolean;
};

export function Header({ dark, onThemeToggle, sidebarCollapsed }: Props) {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-20 border-b border-white/[0.06] bg-slate-900/50 backdrop-blur-xl transition-[margin-left] duration-300"
      style={{ marginLeft: sidebarCollapsed ? 72 : 260 }}
    >
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-2 text-slate-400">
          <Sparkles className="h-4 w-4 text-primary-400" />
          <span className="text-sm">AI-powered DevOps architecture generator</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onThemeToggle}
            className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-slate-300 transition-all hover:border-primary-500/50 hover:text-white hover:shadow-glow-sm"
          >
            {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span>{dark ? 'Dark' : 'Light'}</span>
          </button>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-1 pr-3 py-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-500/80 to-accent-500/80">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium text-white">User</div>
              <div className="text-[10px] text-emerald-400">Pro</div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
