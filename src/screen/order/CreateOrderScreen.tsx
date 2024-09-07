'use client';

import { PolarisLayout } from '@/components/polaris/PolarisLayout';
import { Box, Card, Layout } from '@shopify/polaris';

export function CreateOrderScreen() {
  return (
    <PolarisLayout title="Create Order">
      <Layout>
        <Layout.Section variant="oneHalf">
          <Card padding={'0'}>
            <Box padding={'300'}></Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird"></Layout.Section>
      </Layout>
    </PolarisLayout>
  );
}
