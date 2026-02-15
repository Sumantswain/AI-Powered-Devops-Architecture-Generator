import { motion } from 'framer-motion';
import type { AWSServiceDef } from './awsServices';
import { Tooltip } from '../ui/Tooltip';

type Props = {
  service: AWSServiceDef;
  onDragStart: (e: React.DragEvent, service: AWSServiceDef) => void;
  index: number;
};

export function AWSServiceCard({ service, onDragStart, index }: Props) {
  const Icon = service.icon;
  return (
    <Tooltip content={service.description} side="right">
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.02 }}
        draggable
        onDragStart={(e) => onDragStart(e, service)}
        className="group flex cursor-grab items-center gap-2 rounded-xl border border-white/10 bg-slate-800/50 px-3 py-2 transition-all hover:border-primary-500/30 hover:bg-slate-700/50 hover:shadow-glow-sm active:cursor-grabbing"
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
          style={{ backgroundColor: service.color + '40' }}
        >
          <Icon className="h-4 w-4" style={{ color: service.color }} />
        </div>
        <span className="text-sm font-medium text-slate-200 group-hover:text-white">
          {service.name}
        </span>
      </motion.div>
    </Tooltip>
  );
}
