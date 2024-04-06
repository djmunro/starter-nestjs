import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as dotenv from 'dotenv';
import { join } from 'path';
const CyclicDB = require('@cyclic.sh/dynamodb');

dotenv.config();

interface Disc {
  manufacturer: string;
  model: string;
  maxWeight: number;
  diameter: number;
  height: number;
  rimDepth: number;
  insideRimDiameter: number;
  rimThickness: number;
  rimDepthDiameterRatio: number;
  rimConfiguration: string;
  flexibility: number;
  class: string;
  maxWeightVint: number;
  lastYearProduction: string;
  certificationNumber: string;
  approvedDate: string;
}

function transform(data): Disc {
  return {
    manufacturer: data['Manufacturer / Distributor'],
    model: data['Disc Model'],
    maxWeight: Number(data['Max Weight (gr)']),
    diameter: Number(data['Diameter (cm)']),
    height: Number(data['Height (cm)']),
    rimDepth: Number(data['Rim Depth (cm)']),
    insideRimDiameter: Number(data['Inside Rim Diameter (cm)']),
    rimThickness: Number(data['Rim Thickness (cm)']),
    rimDepthDiameterRatio: Number(data['Rim Depth / Diameter Ratio (%)']),
    rimConfiguration: data['Rim Configuration'],
    flexibility: Number(data['Flexibility (kg)']),
    class: data['Class'],
    maxWeightVint: Number(data['Max Weight Vint (gr)']),
    lastYearProduction: data['Last Year Production'],
    certificationNumber: data['Certification Number'],
    approvedDate: data['Approved Date'],
  };
}

function sanitizeKey(key: string): string {
  // Remove spaces and other disallowed characters like #
  return key.replace(/\s+/g, '_').replace(/#/g, '');
}

async function parseAndSeed(filename: string): Promise<void> {
  const db = CyclicDB('busy-bracelet-tickCyclicDB');
  const discs = db.collection('discs');
  const results: Disc[] = [];

  fs.createReadStream(filename)
    .pipe(csv())
    .on('data', (data) => results.push(transform(data)))
    .on('end', async () => {
      for (const disc of results) {
        await discs.set(sanitizeKey(disc.model), disc);
      }
      console.log('Data seeding completed.');
    });
}

async function main() {
  const filePath = join(
    __dirname,
    '../approved-discs/pdga-approved-disc-golf-discs_2024-04-06T14-08-14.csv',
  );
  await parseAndSeed(filePath);
}

main().catch(console.error);
