'use client';

import {
  TableSet,
  useGenerateTableSetMutation,
  useGenerateTokenOrderMutation,
  useOrderSubscriptSubscription,
  useTableSetListQuery,
} from '@/gql/graphql';
import { Modal } from '@/hook/modal';
import useLongPress from '@/hook/useLongPress';
import { Badge, Box, Card, Frame, Grid, Layout, Loading, Page, Spinner, Text } from '@shopify/polaris';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

function TableItem({ x }: { x: TableSet }) {
  const { push } = useRouter();
  const [table, propsTable] = useGenerateTableSetMutation({
    refetchQueries: ['tableSetList'],
  });
  const [generate, propsUpdate] = useGenerateTokenOrderMutation({
    refetchQueries: ['tableSetList'],
  });
  const handleLogPress = () => {
    console.log('long press');

    generate({
      variables: {
        set: Number(x.set),
      },
    }).then((res) => {
      setTimeout(() => {
        const doc = document.getElementById(`table_${x.set}`);
        doc?.click();
      }, 1000);
    });
  };

  const handleClick = () => {
    if (propsUpdate.loading || x.order) {
      push('/order/detail/' + x?.order?.id);
      return;
    }
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 1000,
  };

  const handleGenerate = useCallback(
    (value: string, x: any) => {
      if (propsUpdate.loading || x.order) {
        push('/order/detail/' + x?.order.id);
        return;
      }
    },
    [propsUpdate.loading, push],
  );

  // const logPressEvent = useLongPress(handleLogPress, handleClick, defaultOptions);
  return (
    <div className="cursor-pointer" onDoubleClick={handleLogPress} onClick={handleClick} suppressHydrationWarning>
      <div id={`table_${x?.set}`} onClick={() => handleGenerate(x.set + '', x)}></div>
      <Card background={x?.order ? 'bg-fill-success-active' : 'bg-fill'}>
        <Box>
          <div className="flex flex-col justify-center items-center">
            <Text as="h3" variant="bodyLg" fontWeight="bold" tone={x?.order ? 'text-inverse' : 'base'}>
              {!!x.fake ? 'D' + x.set : x?.set}
            </Text>
            {(propsUpdate.loading || propsTable.loading) && <Spinner size="small" />}
          </div>
        </Box>
      </Card>
    </div>
  );
}

function SetScreen() {
  const { data, loading, refetch } = useTableSetListQuery({
    variables: {
      offset: 0,
      limit: 1000,
    },
  });
  const [table, propsTable] = useGenerateTableSetMutation({
    refetchQueries: ['tableSetList'],
  });
  const [generate, propsUpdate] = useGenerateTokenOrderMutation({
    refetchQueries: ['tableSetList'],
  });
  useOrderSubscriptSubscription({
    onData: (res) => {
      if (res.data.data?.orderSubscript.status === 2 || !!res.data.data?.orderSubscript.uuid) {
        refetch();
      }
    },
  });

  const handleGenerateTable = useCallback(() => {
    const pr = window.prompt('How many table for generate?');

    if (!!pr && !isNaN(Number(pr))) {
      Modal.dialog({
        title: 'Confirmation',
        body: [<div key={1}>Are you sure want to generate {pr} tables?</div>],
        buttons: [
          {
            title: 'Yes',
            class: 'primary',
            onPress: () => {
              table({
                variables: {
                  sets: Number(pr),
                },
              });
            },
          },
        ],
      });
    }
  }, [table]);

  if (loading || propsTable.loading) {
    <Frame>
      <Page title="Table">
        <Loading />
      </Page>
    </Frame>;
  }

  return (
    <Page
      title="Table"
      subtitle={
        (
          <div className="flex flex-row gap-4 items-center" suppressHydrationWarning>
            <Badge tone="success">
              {
                (
                  <div className="flex flex-row justify-between items-center p-1">
                    Available = {data?.tableSetList?.filter((x) => !x?.order).length}
                  </div>
                ) as any
              }
            </Badge>
            <Badge tone="attention">
              {
                (
                  <div className="flex flex-row justify-between items-center p-1">
                    In Order = {data?.tableSetList?.filter((x) => !!x?.order).length}
                  </div>
                ) as any
              }
            </Badge>
          </div>
        ) as any
      }
      primaryAction={{ content: 'GenerateTable', onAction: handleGenerateTable, destructive: true }}
    >
      <Layout>
        <Layout.Section>
          <Grid columns={{ xs: 1, sm: 4, md: 4, lg: 6, xl: 6 }}>
            {data &&
              data?.tableSetList?.map((x) => {
                return (
                  <Grid.Cell key={x?.set}>
                    <TableItem key={x?.set} x={x || {}} />
                  </Grid.Cell>
                );
              })}
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default SetScreen;
