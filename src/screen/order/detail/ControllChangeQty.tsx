'use client';

import {
  OrderItem,
  StatusOrderItem,
  useDecreaseOrderItemMutation,
  useIncreaseOrderItemMutation,
  useMarkOrderItemStatusMutation,
} from '@/gql/graphql';
import { Modal } from '@/hook/modal';
import { Button, ButtonGroup } from '@shopify/polaris';

interface Props {
  item: OrderItem;
}

export function ControllChangeQty(props: Props) {
  const [plus, { loading: loadingPlus }] = useIncreaseOrderItemMutation({
    refetchQueries: ['order'],
  });
  const [sub, { loading: loadingSub }] = useDecreaseOrderItemMutation({
    refetchQueries: ['order'],
  });
  const [mark, { loading: loadingMark }] = useMarkOrderItemStatusMutation({
    refetchQueries: ['order'],
  });

  // const loading = loadingPlus || loadingMark || loadingSub || props.item.isPrint;
  const loading = false;

  return (
    <ButtonGroup variant="segmented">
      <Button
        size="micro"
        disabled={loading}
        onClick={() => {
          if (props.item.qty === 1) {
            Modal.dialog({
              title: 'Confirmation',
              body: [<div key={0}>Are you sure want to remove this item?</div>],
              buttons: [
                {
                  title: 'Yes',
                  class: 'danger',
                  onPress: () => {
                    mark({
                      variables: {
                        markOrderItemStatusId: Number(props.item.id),
                        status: StatusOrderItem.Deleted,
                      },
                    });
                  },
                },
              ],
            });
            return;
          }
          sub({
            variables: {
              decreaseOrderItemId: Number(props.item.id),
            },
          });
        }}
      >
        -
      </Button>
      <Button disabled size="micro">
        {props.item.qty + ''}
      </Button>
      <Button
        size="micro"
        disabled={loading}
        onClick={() => {
          plus({
            variables: {
              increaseOrderItemId: Number(props.item.id),
            },
          });
        }}
      >
        +
      </Button>
    </ButtonGroup>
  );
}
