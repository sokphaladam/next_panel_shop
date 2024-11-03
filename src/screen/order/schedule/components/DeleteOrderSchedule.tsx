'use client';
import { useCustomToast } from '@/components/custom/CustomToast';
import { useDeleteOrderScheduleMutation } from '@/gql/graphql';
import { Icon, Modal } from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

export function DeleteOrderSchedule({ id }: { id: number }) {
  const { toasts, setToasts } = useCustomToast();
  const [active, setActive] = useState(false);
  const [remove, removeProps] = useDeleteOrderScheduleMutation({
    refetchQueries: ['orderScheduleList', 'orderSchedule'],
  });

  const toggleActive = useCallback(() => setActive(!active), [active]);

  const handleDelete = useCallback(() => {
    remove({
      variables: {
        deleteOrderScheduleId: Number(id),
      },
    })
      .then((res) => {
        if (res.data?.deleteOrderSchedule) {
          setToasts([...toasts, { content: `Order schedule #${id} was deleted.`, status: 'success' }]);
          toggleActive();
        } else {
          setToasts([...toasts, { content: 'Oop! something was wrong please try again!', status: 'error' }]);
        }
      })
      .catch(() => {
        setToasts([...toasts, { content: 'Oop! something was wrong please try again!', status: 'error' }]);
      });
  }, [remove, id, toasts, setToasts, toggleActive]);

  const activator = (
    <div
      className="bg-rose-700 text-white h-11 px-3 flex flex-row justify-center cursor-not-allowed"
      onClick={toggleActive}
    >
      <Icon source={DeleteIcon} />
    </div>
  );

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={toggleActive}
      title={`Delete Order Schedule #${id}`}
      primaryAction={{
        content: 'Yes, Delete',
        destructive: true,
        onAction: handleDelete,
        loading: removeProps.loading,
        disabled: removeProps.loading,
      }}
      secondaryActions={[
        { content: 'Cancel', onAction: toggleActive, loading: removeProps.loading, disabled: removeProps.loading },
      ]}
      loading={removeProps.loading}
    >
      <Modal.Section>
        <p>
          Delete order schedule #{id} will be no long effect on display product. Are you sure want to continue delete?
        </p>
      </Modal.Section>
    </Modal>
  );
}
