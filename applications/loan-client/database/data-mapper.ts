import { DynamoDB } from 'aws-sdk';
import { DataMapper } from '@aws/dynamodb-data-mapper';

export const dataMapperFactory = () => {
  const mapper = new DataMapper({
    client: new DynamoDB(),
  });

  return mapper;
};
