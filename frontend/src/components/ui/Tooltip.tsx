import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  content: string;
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
};

export function Tooltip({ content, children, side = 'top' }: Props) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 max-w-xs rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-xs text-slate-200 shadow-glow ${
              side === 'top' ? 'bottom-full left-1/2 mb-2 -translate-x-1/2' : ''
            } ${side === 'bottom' ? 'top-full left-1/2 mt-2 -translate-x-1/2' : ''} ${
              side === 'left' ? 'right-full top-1/2 mr-2 -translate-y-1/2' : ''
            } ${side === 'right' ? 'left-full top-1/2 ml-2 -translate-y-1/2' : ''}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
