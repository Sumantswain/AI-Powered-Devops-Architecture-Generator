import { dbPool } from '../config/db';

export interface ArchitectureRecord {
  id: string;
  user_id: string;
  name: string;
  app_type: string;
  traffic_scale: string;
  ha_required: boolean;
  region: string;
  architecture: any;
  terraform: string;
  cicd_yaml: string;
  cost_breakdown: any;
  scalability_score: number;
  created_at: Date;
}

export async function saveArchitecture(record: Omit<ArchitectureRecord, 'id' | 'created_at'>) {
  const result = await dbPool.query<ArchitectureRecord>(
    `INSERT INTO architectures
     (user_id, name, app_type, traffic_scale, ha_required, region, architecture, terraform, cicd_yaml, cost_breakdown, scalability_score)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [
      record.user_id,
      record.name,
      record.app_type,
      record.traffic_scale,
      record.ha_required,
      record.region,
      record.architecture,
      record.terraform,
      record.cicd_yaml,
      record.cost_breakdown,
      record.scalability_score,
    ],
  );
  return result.rows[0];
}

export async function listUserArchitectures(userId: string) {
  const result = await dbPool.query<ArchitectureRecord>(
    'SELECT * FROM architectures WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
    [userId],
  );
  return result.rows;
}

