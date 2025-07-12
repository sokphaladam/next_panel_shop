"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useOrderBalanceSummaryQuery } from "@/gql/graphql";
import {
  Box,
  DatePicker,
  Layout,
  Link,
  Modal,
  // Popover,
  SkeletonDisplayText,
  Text,
} from "@shopify/polaris";
import { color } from "framer-motion";
import { DollarSignIcon, PackageSearch, Users } from "lucide-react";
import moment from "moment";
import { useCallback, useState } from "react";

function SelectDate({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) {
  const [{ month, year }, setDate] = useState({
    month: Number(value.split("-")[1]) - 1,
    year: Number(value.split("-")[0]),
  });
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const activator = (
    <span onClick={toggleOpen} className="cursor-pointer">
      ({moment(value).format("YYYY-MMM-DD")})
    </span>
  );

  const handleMonthChange = useCallback(
    (month: number, year: number) => setDate({ month, year }),
    []
  );

  return (
    <Popover>
      <PopoverTrigger>{activator}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(value)}
          onSelect={(v) => {
            setValue(moment(v).format("YYYY-MM-DD"));
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export function Balance() {
  const now = moment(new Date());
  const [dateInput, setDateInput] = useState(now.format("YYYY-MM-DD"));
  const { data, loading } = useOrderBalanceSummaryQuery({
    variables: {
      from: dateInput,
      to: dateInput,
    },
  });

  const items =
    !loading && data
      ? [
          {
            text: "Order Balance",
            value: `$${Number(data?.orderBalanceSummary.order || 0).toFixed(2)}`,
            icon: <DollarSignIcon className="h-4 w-4" />,
            color: "text-green-500",
          },
          {
            text: "Expected Order Balance",
            value: `$${Number(data?.orderBalanceSummary.expct_order || 0).toFixed(2)}`,
            icon: <DollarSignIcon className="h-4 w-4" />,
            color: "text-red-500",
          },
          {
            text: "Products",
            value: `${data?.orderBalanceSummary.product || 0}`,
            icon: <PackageSearch className="h-4 w-4" />,
            color: "text-indigo-500",
          },
          {
            text: "Staffs",
            value: `${data?.orderBalanceSummary.staff || 0}`,
            icon: <Users className="h-4 w-4" />,
            color: "",
          },
        ]
      : [];

  return (
    <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => {
        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium tracking-tight">
                    {item.text}
                  </div>
                  {item.text === "Order Balance" && (
                    <SelectDate value={dateInput} setValue={setDateInput} />
                  )}
                </div>
                {item.icon}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${item.color}`}>
                {item.value}
              </div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  /*
  return (
    <Layout>
      <Layout.Section variant="fullWidth">
        <Text as="h5" variant="headingMd">
          Today
        </Text>
      </Layout.Section>
      <Layout.Section variant="fullWidth">
        <div className="flex flex-row gap-10 items-center flex-wrap">
          <div className="min-w-[247px]">
            <Card>
              <Box>
                <Text as="h4" variant="headingMd">
                  <span className="flex flex-row items-center gap-2">
                    Order Balance <SelectDate value={dateInput} setValue={setDateInput} />
                  </span>
                </Text>
                <br />
                {loading && !data ? (
                  <SkeletonDisplayText size="medium" />
                ) : (
                  <Text as="h3" variant="heading2xl" tone="success">
                    ${Number(data?.orderBalanceSummary.order || 0).toFixed(2)}
                  </Text>
                )}
              </Box>
            </Card>
          </div>
          <div className="min-w-[247px]">
            <Card>
              <Box>
                <Text as="h4" variant="headingMd">
                  Expected Order Balance
                </Text>
                <br />
                {loading && !data ? (
                  <SkeletonDisplayText size="medium" />
                ) : (
                  <Text as="h3" variant="heading2xl" tone="critical">
                    ${Number(data?.orderBalanceSummary.expct_order || 0).toFixed(2)}
                  </Text>
                )}
              </Box>
            </Card>
          </div>
          <div className="min-w-[247px]">
            <Card>
              <Box>
                <Text as="h4" variant="headingMd">
                  Products
                </Text>
                <br />
                {loading && !data ? (
                  <SkeletonDisplayText size="medium" />
                ) : (
                  <Text as="h3" variant="heading2xl" tone="magic">
                    {data?.orderBalanceSummary.product}
                  </Text>
                )}
              </Box>
            </Card>
          </div>
          <div className="min-w-[247px]">
            <Card>
              <Box>
                <Text as="h4" variant="headingMd">
                  Staffs
                </Text>
                <br />
                {loading && !data ? (
                  <SkeletonDisplayText size="medium" />
                ) : (
                  <Text as="h3" variant="heading2xl" tone="caution">
                    {data?.orderBalanceSummary.staff}
                  </Text>
                )}
              </Box>
            </Card>
          </div>
        </div>
      </Layout.Section>
      <Layout.Section>
        <br />
        <hr />
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
  );
  */
}
