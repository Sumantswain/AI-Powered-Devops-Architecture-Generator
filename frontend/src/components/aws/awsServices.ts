import type { LucideIcon } from 'lucide-react';
import {
  Server,
  Cpu,
  Container,
  Box,
  Gauge,
  Database,
  HardDrive,
  FolderOpen,
  Cloud,
  Globe,
  Shield,
  Users,
  Activity,
  Radio,
  Network,
  Route,
  Lock,
  Key,
  Eye,
  Code2,
  GitBranch,
  Rocket,
} from 'lucide-react';

export type AWSServiceDef = {
  id: string;
  name: string;
  category: 'Compute' | 'Storage' | 'Database' | 'Networking' | 'Security' | 'Monitoring' | 'DevOps';
  icon: LucideIcon;
  description: string;
  color: string;
};

export const AWS_SERVICES: AWSServiceDef[] = [
  { id: 'ec2', name: 'EC2', category: 'Compute', icon: Server, description: 'Virtual servers in the cloud. Run applications with flexible compute capacity.', color: '#ff9900' },
  { id: 'lambda', name: 'Lambda', category: 'Compute', icon: Cpu, description: 'Run code without provisioning servers. Event-driven, serverless compute.', color: '#ff9900' },
  { id: 'ecs', name: 'ECS', category: 'Compute', icon: Container, description: 'Container orchestration service. Run Docker containers at scale.', color: '#ff9900' },
  { id: 'eks', name: 'EKS', category: 'Compute', icon: Box, description: 'Managed Kubernetes. Run Kubernetes on AWS without managing control plane.', color: '#ff9900' },
  { id: 'fargate', name: 'Fargate', category: 'Compute', icon: Gauge, description: 'Serverless compute for containers. No servers to manage.', color: '#ff9900' },
  { id: 'autoscaling', name: 'Auto Scaling', category: 'Compute', icon: Gauge, description: 'Automatically adjust capacity to maintain performance and cost.', color: '#ff9900' },
  { id: 's3', name: 'S3', category: 'Storage', icon: Database, description: 'Object storage for any use case. Durable, scalable, highly available.', color: '#569a31' },
  { id: 'ebs', name: 'EBS', category: 'Storage', icon: HardDrive, description: 'Block storage for EC2. High-performance volumes with consistent I/O.', color: '#569a31' },
  { id: 'efs', name: 'EFS', category: 'Storage', icon: FolderOpen, description: 'Managed NFS file storage. Shared file system for EC2 and Lambda.', color: '#569a31' },
  { id: 'rds', name: 'RDS', category: 'Database', icon: Database, description: 'Managed relational databases. MySQL, PostgreSQL, MariaDB, Oracle, SQL Server.', color: '#527fff' },
  { id: 'aurora', name: 'Aurora', category: 'Database', icon: Database, description: 'High-performance managed relational database. MySQL and PostgreSQL compatible.', color: '#527fff' },
  { id: 'dynamodb', name: 'DynamoDB', category: 'Database', icon: Database, description: 'NoSQL key-value and document database. Single-digit millisecond latency.', color: '#527fff' },
  { id: 'elasticache', name: 'ElastiCache', category: 'Database', icon: Database, description: 'In-memory cache (Redis, Memcached). Sub-millisecond response times.', color: '#527fff' },
  { id: 'vpc', name: 'VPC', category: 'Networking', icon: Network, description: 'Isolated cloud network. Define your own IP range, subnets, route tables.', color: '#ff9900' },
  { id: 'route53', name: 'Route 53', category: 'Networking', icon: Route, description: 'DNS and domain registration. Highly available and scalable.', color: '#ff9900' },
  { id: 'cloudfront', name: 'CloudFront', category: 'Networking', icon: Globe, description: 'Content delivery network. Low latency, high transfer speeds globally.', color: '#ff9900' },
  { id: 'alb', name: 'ALB', category: 'Networking', icon: Activity, description: 'Application Load Balancer. Distribute traffic across targets (HTTP/HTTPS).', color: '#ff9900' },
  { id: 'nlb', name: 'NLB', category: 'Networking', icon: Activity, description: 'Network Load Balancer. Handle millions of requests with ultra-low latency.', color: '#ff9900' },
  { id: 'apigateway', name: 'API Gateway', category: 'Networking', icon: Radio, description: 'Create, deploy, and manage APIs at scale. REST and WebSocket.', color: '#ff9900' },
  { id: 'iam', name: 'IAM', category: 'Security', icon: Lock, description: 'Identity and access management. Control who can use which AWS resources.', color: '#dd344c' },
  { id: 'cognito', name: 'Cognito', category: 'Security', icon: Users, description: 'User sign-up, sign-in, and access control. Federated identity.', color: '#dd344c' },
  { id: 'waf', name: 'WAF', category: 'Security', icon: Shield, description: 'Web application firewall. Protect against common web exploits.', color: '#dd344c' },
  { id: 'shield', name: 'Shield', category: 'Security', icon: Shield, description: 'DDoS protection. Always-on detection and automatic mitigations.', color: '#dd344c' },
  { id: 'cloudwatch', name: 'CloudWatch', category: 'Monitoring', icon: Eye, description: 'Monitoring and observability. Metrics, logs, alarms, dashboards.', color: '#ff9900' },
  { id: 'xray', name: 'X-Ray', category: 'Monitoring', icon: Activity, description: 'Distributed tracing. Analyze and debug production applications.', color: '#ff9900' },
  { id: 'codebuild', name: 'CodeBuild', category: 'DevOps', icon: Code2, description: 'Fully managed build service. Compile source code, run tests.', color: '#ff9900' },
  { id: 'codepipeline', name: 'CodePipeline', category: 'DevOps', icon: GitBranch, description: 'Continuous delivery. Automate release pipelines.', color: '#ff9900' },
  { id: 'codedeploy', name: 'CodeDeploy', category: 'DevOps', icon: Rocket, description: 'Automate deployments. Deploy to EC2, Lambda, on-premises.', color: '#ff9900' },
];

export const AWS_SERVICES_BY_CATEGORY = AWS_SERVICES.reduce((acc, s) => {
  if (!acc[s.category]) acc[s.category] = [];
  acc[s.category].push(s);
  return acc;
}, {} as Record<string, AWSServiceDef[]>);
