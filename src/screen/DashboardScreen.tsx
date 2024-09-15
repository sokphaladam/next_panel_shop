'use client';
import { useOrderBalanceSummaryQuery } from '@/gql/graphql';
import { Box, Card, Layout, Link, Page, Text } from '@shopify/polaris';
import moment from 'moment';
import React from 'react';

export function DashboardScreen() {
  const { data, loading } = useOrderBalanceSummaryQuery();

  if (loading) {
    return <></>;
  }

  return (
    <Page>
      <Layout>
        <Layout.Section variant="fullWidth">
          <Text as="h5" variant="headingMd">
            Today
          </Text>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <Box>
              <Text as="h4" variant="headingMd">
                Order Balance ({moment(new Date()).format('YYYY-MMM-DD')})
              </Text>
              <br />
              <Text as="h3" variant="heading2xl" tone="success">
                ${data?.orderBalanceSummary.order}
              </Text>
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <Box>
              <Text as="h4" variant="headingMd">
                Products
              </Text>
              <br />
              <Text as="h3" variant="heading2xl" tone="magic">
                {data?.orderBalanceSummary.product}
              </Text>
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <Box>
              <Text as="h4" variant="headingMd">
                Staffs
              </Text>
              <br />
              <Text as="h3" variant="heading2xl" tone="caution">
                {data?.orderBalanceSummary.staff}
              </Text>
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section variant="fullWidth">
          <Text as="h5" variant="headingMd">
            Quick Access
          </Text>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Link url="/employee/attendance">
            <Card>
              <Box>
                <Text as="h4" variant="headingMd">
                  Attendance
                </Text>
              </Box>
            </Card>
          </Link>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Link url="/order/list">
            <Card>
              <Box>
                <Text as="h4" variant="headingMd">
                  Customer Order
                </Text>
              </Box>
            </Card>
          </Link>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Link url="/set">
            <Card>
              <Box>
                <Text as="h4" variant="headingMd">
                  Table
                </Text>
              </Box>
            </Card>
          </Link>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
