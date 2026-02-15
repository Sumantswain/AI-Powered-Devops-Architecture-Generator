import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Download, FileCode, FileText } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

const terraformCode = `provider "aws" {
  region = "ap-south-1"
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames  = true
  enable_dns_support    = true
  tags = {
    Name = "devops-arch-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "\${var.region}a"
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.medium"
  subnet_id     = aws_subnet.public.id
}`;

const cicdYaml = `name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
      - run: terraform apply -auto-approve
`;

type TabId = 'terraform' | 'cicd';

const tabs: { id: TabId; label: string; icon: typeof FileCode }[] = [
  { id: 'terraform', label: 'Terraform', icon: FileCode },
  { id: 'cicd', label: 'GitHub Actions', icon: FileText },
];

export function ExportPage() {
  const [activeTab, setActiveTab] = useState<TabId>('terraform');
  const [copied, setCopied] = useState<TabId | null>(null);

  const content = activeTab === 'terraform' ? terraformCode : cicdYaml;
  const language = activeTab === 'terraform' ? 'hcl' : 'yaml';

  const handleCopy = (tab: TabId) => {
    const text = tab === 'terraform' ? terraformCode : cicdYaml;
    navigator.clipboard.writeText(text);
    setCopied(tab);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadZip = () => {
    const blob = new Blob(
      [
        `terraform/main.tf:${terraformCode}\n---\n.github/workflows/deploy.yml:${cicdYaml}`,
      ],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'devops-arch-export.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold tracking-tight text-white"
        >
          Export
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="mt-1 text-sm text-slate-400"
        >
          Terraform and CI/CD definitions — copy or download
        </motion.p>
      </div>

      <GlassCard delay={0.1} className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex gap-1 rounded-lg bg-slate-800/80 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-500/30 text-primary-300 shadow-glow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCopy(activeTab)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-800/80 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700/80 hover:text-white"
            >
              {copied === activeTab ? (
                <Check className="h-4 w-4 text-accent-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied === activeTab ? 'Copied' : 'Copy'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadZip}
              className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-400"
            >
              <Download className="h-4 w-4" />
              Download ZIP
            </motion.button>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{
                  margin: 0,
                  padding: '1rem 1.25rem',
                  fontSize: 13,
                  background: '#0f172a',
                  borderRadius: 12,
                }}
                showLineNumbers
              >
                {content}
              </SyntaxHighlighter>
            </motion.div>
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
}
