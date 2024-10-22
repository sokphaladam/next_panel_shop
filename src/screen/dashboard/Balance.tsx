'use client';

import { useOrderBalanceSummaryQuery } from '@/gql/graphql';
import { Box, Card, DatePicker, Layout, Link, Modal, Popover, SkeletonDisplayText, Text } from '@shopify/polaris';
import moment from 'moment';
import { useCallback, useState } from 'react';

function SelectDate({ value, setValue }: { value: string; setValue: (v: string) => void }) {
  const [{ month, year }, setDate] = useState({
    month: Number(value.split('-')[1]) - 1,
    year: Number(value.split('-')[0]),
  });
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const activator = (
    <span onClick={toggleOpen} className="cursor-pointer">
      ({moment(value).format('YYYY-MMM-DD')})
    </span>
  );

  const handleMonthChange = useCallback((month: number, year: number) => setDate({ month, year }), []);

  return (
    <Modal open={open} activator={activator} onClose={toggleOpen} title="Date">
      <Modal.Section>
        <DatePicker
          month={month}
          year={year}
          onChange={(v) => {
            setValue(moment(v.end).format('YYYY-MM-DD'));
          }}
          selected={{
            start: new Date(value),
            end: new Date(value),
          }}
          onMonthChange={handleMonthChange}
        />
      </Modal.Section>
    </Modal>
  );
}

export function Balance() {
  const now = moment(new Date());
  const [dateInput, setDateInput] = useState(now.format('YYYY-MM-DD'));
  const { data, loading } = useOrderBalanceSummaryQuery({
    variables: {
      from: dateInput,
      to: dateInput,
    },
  });

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
}
