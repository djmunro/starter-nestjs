import { Injectable } from '@nestjs/common';
const CyclicDB = require('@cyclic.sh/dynamodb');

@Injectable()
export class AppService {
  getHello(): string {
    const db = CyclicDB('busy-bracelet-tickCyclicDB');
    const discs = db.collection('discs');
    // return discs.filter({ manufacturer: 'Innova Champion Discs' });
    return discs.list();
  }
}
