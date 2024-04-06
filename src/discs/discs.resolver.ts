import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
const CyclicDB = require('@cyclic.sh/dynamodb');

@ObjectType() // Use @ObjectType() to declare a GraphQL object type
class DiscProps {
  @Field({ nullable: true }) model: string;
  @Field() flexibility: number;
  @Field() lastYearProduction: string;
  @Field() created: string;
  @Field() rimDepth: number;
  @Field() rimDepthDiameterRatio: number;
  @Field() rimThickness: number;
  @Field() class: string;
  @Field() certificationNumber: string;
  @Field() diameter: number;
  @Field() updated: string;
  @Field({ nullable: true }) manufacturer: string;
  @Field() maxWeightVint: number;
  @Field() height: number;
  @Field() insideRimDiameter: number;
  @Field() maxWeight: number;
  @Field() approvedDate: string;
  @Field() rimConfiguration: string;
}

@ObjectType()
class Disc {
  @Field() collection: string;
  @Field() key: string;
  @Field(() => DiscProps)
  props: DiscProps;
}

@Resolver((of) => Disc)
export class DiscsResolver {
  db = CyclicDB('busy-bracelet-tickCyclicDB');
  discs = this.db.collection('discs');

  @Query(() => [Disc], { name: 'getDiscs' }) // Correct the method name if needed
  async getDiscs() {
    // Changed the name to match the query return type
    const data = await this.discs.list();
    // return data;
    // console.log(data.results);
    const daters = data.results.map((item) => {
      // Transform the data if necessary to match the Disc type
      return {
        collection: item.collection,
        key: item.key,
        props: { ...item.props },
      };
    });

    console.log(daters);
    return daters;
  }
}
