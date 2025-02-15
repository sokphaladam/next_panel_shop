"use client";
import { useOrderBalanceSummaryQuery } from "@/gql/graphql";
import { Box, Card, Layout, Link, Page, Text } from "@shopify/polaris";
import moment from "moment";
import React from "react";
import { Balance } from "./dashboard/Balance";
import { TopSell } from "./dashboard/TopSell";
import {
  PolarisLayout,
  role_permission,
} from "@/components/polaris/PolarisLayout";

export function DashboardScreen() {
  return (
    <PolarisLayout
      title=""
      titleHidden
      permission={[
        role_permission.ADMIN,
        role_permission.SUPER_ADMIN,
        role_permission.MANAGER,
      ]}
    >
      <Balance />
      <br />
      <hr />
      <br />
      <Layout>
        <TopSell />
        <Layout.Section variant="oneHalf"></Layout.Section>
      </Layout>
    </PolarisLayout>
  );
}
