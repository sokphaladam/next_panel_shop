'use client';
import { useOrderBalanceSummaryQuery } from '@/gql/graphql';
import { Box, Card, Layout, Link, Page, Text } from '@shopify/polaris';
import moment from 'moment';
import React from 'react';
import { Balance } from './dashboard/Balance';
import { TopSell } from './dashboard/TopSell';

export function DashboardScreen() {
  return (
    <Page>
      <Balance />
      <br />
      <hr />
      <br />
      <Layout>
        <TopSell />
        <Layout.Section variant="oneHalf"></Layout.Section>
      </Layout>
    </Page>
  );
}
