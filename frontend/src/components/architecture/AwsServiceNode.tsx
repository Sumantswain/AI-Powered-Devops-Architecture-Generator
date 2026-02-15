import { ReactNode } from 'react';
import { Handle, Position } from 'reactflow';

type Props = {
  data: {
    label: string;
    icon: ReactNode;
    description: string;
  };
};

export function AwsServiceNode({ data }: Props) {
  return (
    <div className="group rounded-2xl border border-slate-800/80 bg-slate-900/80 px-3 py-2 shadow-glass-dark backdrop-blur-md">
      <Handle
        type="target"
        position={Position.Left}
        className="!h-2 !w-2 !bg-emerald-400"
      />
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800/80 text-xs text-primary-200">
          {data.icon}
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-100">
            {data.label}
          </div>
          <div className="text-[10px] text-slate-400">{data.description}</div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!h-2 !w-2 !bg-sky-400"
      />
    </div>
  );
}

