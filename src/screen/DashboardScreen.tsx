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
import { PageLayout } from "@/components/shadcn/page-layout";

export function DashboardScreen() {
  return (
    <PageLayout
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
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <TopSell />
        <div></div>
      </div>
    </PageLayout>
  );
}
