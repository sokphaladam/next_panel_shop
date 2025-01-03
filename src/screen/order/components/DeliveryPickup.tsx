'use client';
import { useCustomToast } from '@/components/custom/CustomToast';
import { Order, useChangeOrderStatusMutation, useDeliveryListQuery } from '@/gql/graphql';
import { Button, InlineGrid, Modal, Select, Text, TextField } from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';

interface Props {
  order?: Order;
  size?: 'micro' | 'slim' | 'medium' | 'large' | undefined;
}

export function DeliveryPickup(props: Props) {
  const { setToasts, toasts } = useCustomToast();
  const [open, setOpen] = useState(false);
  const [deliveryId, setDeliveryId] = useState(props.order?.delivery?.id + '');
  const [deliveryCode, setDeliveryCode] = useState(props.order?.deliveryCode || '');
  const queryDelivery = useDeliveryListQuery({
    variables: {
      limit: 1000,
      offset: 0,
    },
  });
  const [change] = useChangeOrderStatusMutation({
    refetchQueries: ['order', 'orderList'],
  });

  useEffect(() => {
    if (open && props.order?.delivery) {
      setDeliveryId(props.order.delivery.id + '' || '');
      setDeliveryCode(props.order.deliveryCode || '');
    }
  }, [props, open]);

  const toggleOpen = useCallback(() => setOpen(!open), [open]);

  const handleDeliveryPickup = useCallback(() => {
    const input = {
      orderId: Number(props.order?.id),
      deliverPickupId: Number(deliveryId),
      deliverPickupCode: String(deliveryCode),
    };

    change({
      variables: {
        data: input,
      },
    })
      .then((res) => {
        if (!!res.data?.changeOrderStatus) {
          setToasts([...toasts, { content: 'Done!', status: 'success' }]);
          toggleOpen();
          setDeliveryId('');
          setDeliveryCode('');
        } else {
          setToasts([
            ...toasts,
            {
              content: 'Oop! somthing was wrong please try!',
              status: 'error',
            },
          ]);
        }
      })
      .catch(() => {
        setToasts([...toasts, { content: 'Oop! somthing was wrong please try!', status: 'error' }]);
      });
  }, [change, deliveryCode, deliveryId, props.order?.id, setToasts, toasts, toggleOpen]);

  const activator = (
    <Button size={props.size} onClick={() => toggleOpen()}>
      Delivery Pickup
    </Button>
  );

  return (
    <Modal
      title="Delivery Pickup"
      open={open}
      onClose={() => {
        toggleOpen();
      }}
      activator={activator}
      primaryAction={{
        content: 'Save',
        disabled: !deliveryId || !deliveryCode,
        onAction: handleDeliveryPickup,
      }}
    >
      <Modal.Section>
        <InlineGrid columns={2} gap={'400'}>
          <Select
            label="Delivery"
            options={
              queryDelivery.data
                ? [
                    { label: '-- select one delivery --', value: '' },
                    ...(queryDelivery.data?.deliveryList || []).map((x) => {
                      return {
                        label: x?.name + '',
                        value: x?.id + '',
                      };
                    }),
                  ]
                : []
            }
            value={deliveryId || props.order?.delivery?.id + ''}
            onChange={setDeliveryId || props.order?.deliveryCode + ''}
          />
          <TextField autoComplete="off" label="Delivery Code" value={deliveryCode} onChange={setDeliveryCode} />
        </InlineGrid>
      </Modal.Section>
    </Modal>
  );
}
