import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  type Connection,
  type Node,
  type Edge,
  type ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useCallback, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FlowServiceNode } from '../components/architecture/FlowServiceNode';
import type { FlowNodeData } from '../components/architecture/FlowServiceNode';
import { AWS_SERVICES, AWS_SERVICES_BY_CATEGORY } from '../components/aws/awsServices';
import { AWSServiceCard } from '../components/aws/AWSServiceCard';
import type { AWSServiceDef } from '../components/aws/awsServices';
import { DollarSign, Settings, Code, ChevronDown } from 'lucide-react';

const nodeTypes = { flowService: FlowServiceNode };

const SERVICE_ID_KEY = 'application/x-aws-service-id';

let nodeId = 0;
function createNode(service: AWSServiceDef, position: { x: number; y: number }): Node<FlowNodeData> {
  return {
    id: `node-${++nodeId}-${service.id}`,
    type: 'flowService',
    position,
    data: {
      label: service.name,
      service,
      description: service.description.slice(0, 50) + (service.description.length > 50 ? '…' : ''),
    },
  };
}

const COST_BY_SERVICE_ID: Record<string, number> = {
  ec2: 80,
  lambda: 20,
  ecs: 60,
  eks: 150,
  fargate: 45,
  autoscaling: 0,
  s3: 15,
  ebs: 25,
  efs: 35,
  rds: 150,
  aurora: 220,
  dynamodb: 50,
  elasticache: 80,
  vpc: 0,
  route53: 5,
  cloudfront: 35,
  alb: 25,
  nlb: 22,
  apigateway: 15,
  iam: 0,
  cognito: 5,
  waf: 20,
  shield: 0,
  cloudwatch: 15,
  xray: 10,
  codebuild: 5,
  codepipeline: 5,
  codedeploy: 5,
};

function BuilderInner() {
  const flowInstanceRef = useRef<ReactFlowInstance<FlowNodeData> | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<FlowNodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [region, setRegion] = useState('ap-south-1');
  const [appType, setAppType] = useState('mern');
  const [trafficScale, setTrafficScale] = useState('medium');
  const [ha, setHa] = useState(true);

  const onInit = useCallback((instance: ReactFlowInstance<FlowNodeData>) => {
    flowInstanceRef.current = instance;
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const serviceId = e.dataTransfer.getData(SERVICE_ID_KEY);
      if (!serviceId) return;
      const service = AWS_SERVICES.find((s) => s.id === serviceId);
      if (!service) return;
      const instance = flowInstanceRef.current;
      if (!instance?.screenToFlowPosition) return;
      try {
        const position = instance.screenToFlowPosition({ x: e.clientX, y: e.clientY });
        setNodes((nds) => nds.concat(createNode(service, position)));
      } catch (err) {
        console.error('Drop failed', err);
      }
    },
    [setNodes]
  );

  const onDragStart = useCallback((e: React.DragEvent, service: AWSServiceDef) => {
    e.dataTransfer.setData(SERVICE_ID_KEY, service.id);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const archJson = useMemo(() => {
    const serviceIds = nodes
      .map((n) => n.data.service?.id)
      .filter((id): id is string => Boolean(id));
    const counts: Record<string, number> = {};
    serviceIds.forEach((id) => {
      counts[id] = (counts[id] ?? 0) + 1;
    });
    return {
      region,
      appType,
      trafficScale,
      highAvailability: ha,
      services: counts,
      nodeCount: nodes.length,
      edgeCount: edges.length,
    };
  }, [nodes, edges, region, appType, trafficScale, ha]);

  const estCost = useMemo(() => {
    return nodes.reduce((sum, n) => {
      const id = n.data.service?.id;
      return sum + (id ? COST_BY_SERVICE_ID[id] ?? 0 : 0);
    }, 0);
  }, [nodes]);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4">
      <motion.aside
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 280, opacity: 1 }}
        className="flex shrink-0 flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-xl"
      >
        <div className="border-b border-white/10 px-4 py-3">
          <h3 className="text-sm font-semibold text-white">AWS services</h3>
          <p className="text-xs text-slate-400">Drag onto canvas</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {Object.entries(AWS_SERVICES_BY_CATEGORY).map(([cat, services]) => (
            <div key={cat} className="mb-4">
              <div className="flex w-full items-center justify-between py-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
                {cat} 
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="mt-1 space-y-1">
                {services.map((s, i) => (
                  <AWSServiceCard key={s.id} service={s} onDragStart={onDragStart} index={i} /> 
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.aside>

      <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/40">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={onInit}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.2}
          maxZoom={1.5}
          defaultEdgeOptions={{ animated: true }}
        >
          <Background color="#334155" gap={20} size={1} />
          <Controls className="!rounded-lg !border-white/10 !bg-slate-800/90" />
          <MiniMap
            nodeColor="#1e293b"
            maskColor="rgba(15,23,42,0.8)"
            className="!rounded-lg !border-white/10"
          />
        </ReactFlow>
      </div>

      <motion.aside
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 320, opacity: 1 }}
        className="flex shrink-0 flex-col gap-4 overflow-hidden"
      >
        <div className="rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-xl p-4">
          <div className="mb-3 flex items-center gap-2">
            <Settings className="h-4 w-4 text-primary-400" />
            <h3 className="text-sm font-semibold text-white">Configuration</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-sm text-white"
              >
                <option value="ap-south-1">ap-south-1 (Mumbai)</option>
                <option value="us-east-1">us-east-1 (N. Virginia)</option>
                <option value="eu-west-1">eu-west-1 (Ireland)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">App type</label>
              <select
                value={appType}
                onChange={(e) => setAppType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-sm text-white"
              >
                <option value="mern">MERN</option>
                <option value="microservices">Microservices</option>
                <option value="ml">ML</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Traffic</label>
              <select
                value={trafficScale}
                onChange={(e) => setTrafficScale(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-slate-800/80 px-3 py-2 text-sm text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">High availability</span>
              <button
                type="button"
                onClick={() => setHa((h) => !h)}
                className={`h-6 w-11 rounded-full transition-colors ${ha ? 'bg-primary-500' : 'bg-slate-600'}`}
              >
                <span
                  className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${ha ? 'translate-x-5' : 'translate-x-0.5'}`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-xl p-4">
          <div className="mb-3 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-accent-400" />
            <h3 className="text-sm font-semibold text-white">Est. monthly cost</h3>
          </div>
          <p className="text-2xl font-bold text-white">${estCost}</p>
          <p className="text-xs text-slate-500">From services on canvas</p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/60 backdrop-blur-xl p-4">
          <div className="mb-3 flex items-center gap-2">
            <Code className="h-4 w-4 text-primary-400" />
            <h3 className="text-sm font-semibold text-white">Architecture JSON</h3>
          </div>
          <pre className="min-h-0 flex-1 overflow-auto rounded-lg bg-slate-950/80 p-3 text-[10px] text-slate-300">
            {JSON.stringify(archJson, null, 2)}
          </pre>
        </div>
      </motion.aside>
    </div>
  );
}

export function ArchitectureBuilderPage() {
  return (
    <div className="space-y-4">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold tracking-tight text-white"
        >
          Architecture builder
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="mt-1 text-sm text-slate-400"
        >
          Drag AWS services onto the canvas and connect them
        </motion.p>
      </div>
      <ReactFlowProvider>
        <BuilderInner />
      </ReactFlowProvider>
    </div>
  );
}
