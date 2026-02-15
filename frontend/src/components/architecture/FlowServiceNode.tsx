import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { AWSServiceDef } from '../aws/awsServices';

export type FlowNodeData = {
  label: string;
  service?: AWSServiceDef;
  description?: string;
};

function FlowServiceNodeComponent({ data, selected }: NodeProps<FlowNodeData>) {
  const service = data.service;
  const Icon = service?.icon;
  return (
    <div
      className={`rounded-xl border-2 bg-slate-800/90 px-3 py-2 shadow-card backdrop-blur-md transition-all ${
        selected
          ? 'border-primary-500 shadow-glow'
          : 'border-white/10 hover:border-primary-500/50'
      }`}
    >
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !bg-primary-500" />
      <div className="flex items-center gap-2">
        {Icon && (
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: (service?.color ?? '#3b82f6') + '50' }}
          >
            <Icon className="h-4 w-4" style={{ color: service?.color ?? '#3b82f6' }} />
          </div>
        )}
        <div>
          <div className="text-xs font-semibold text-white">{data.label}</div>
          {data.description && (
            <div className="text-[10px] text-slate-400">{data.description}</div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!h-2 !w-2 !bg-accent-500" />
    </div>
  );
}

export const FlowServiceNode = memo(FlowServiceNodeComponent);
