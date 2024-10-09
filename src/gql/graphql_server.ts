import { getClient } from '@/lib/client';
import { OrderDocument, Query, ReportSaleByDayDocument } from './graphql';
import { ApolloClient, NetworkStatus } from '@apollo/client';

export class graphql_server {
  // private client: ApolloClient<any> | null;

  // constructor() {
  //   this.client = getClient();
  // }

  static async getOrderByID(id: number) {
    const client = getClient();
    if (client) {
      const query = await client.query<Query>({
        query: OrderDocument,
        variables: {
          id: Number(id),
        },
      });

      return query;
    }

    return {
      data: {
        order: null,
      },
      loading: false,
      networkStatus: NetworkStatus.ready,
    };
  }

  static async getReportSaleByDay(from: string, to: string) {
    const client = getClient();
    if (client) {
      const query = await client.query<Query>({
        query: ReportSaleByDayDocument,
        variables: {
          from,
          to,
        },
      });

      return query;
    }

    return {
      data: {
        order: null,
      },
      loading: false,
      networkStatus: NetworkStatus.ready,
    };
  }
}

const graphqlServer = new graphql_server();
export default graphqlServer;
