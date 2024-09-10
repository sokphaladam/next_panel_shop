'use client';
import { useCustomToast } from '@/components/custom/CustomToast';
import { Leave, LeaveStatus, useUpdateLeaveStatusMutation } from '@/gql/graphql';
import { useUser } from '@/service/UserProvider';
import { ActionList, ActionListItemDescriptor, Icon, Popover } from '@shopify/polaris';
import { MenuVerticalIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

export function ControllLeave({ item }: { item: Leave }) {
  const user = useUser();
  const { toasts, setToasts } = useCustomToast();
  const [open, setOpen] = useState(false);
  const toggelOpen = useCallback(() => setOpen(!open), [open]);
  const [update, props] = useUpdateLeaveStatusMutation({
    refetchQueries: ['leave', 'leaveList'],
  });

  const handleUpdate = useCallback(
    (v: LeaveStatus) => {
      update({
        variables: {
          updateLeaveStatusId: Number(item.id),
          status: v,
        },
      })
        .then((res) => {
          if (res.data?.updateLeaveStatus) {
            setToasts([...toasts, { content: 'Update status to ' + v, status: 'success' }]);
          } else {
            setToasts([...toasts, { content: 'Oop! something was wrong please try again', status: 'error' }]);
          }
        })
        .catch(() => {
          setToasts([...toasts, { content: 'Oop! something was wrong please try again', status: 'error' }]);
        });
    },
    [item.id, setToasts, toasts, update],
  );

  const activator = (
    <div
      className="cursor-pointer hover:bg-gray-300 rounded-full w-[30px] h-[30px] flex flex-row items-center"
      onClick={toggelOpen}
    >
      <Icon source={MenuVerticalIcon} tone="base" />
    </div>
  );

  let menus: ActionListItemDescriptor[] = [];

  if (item.status === LeaveStatus.Request) {
    if ([1, 2, 5].includes(user?.role?.id || 0)) {
      menus = [
        { content: 'Edit', url: '/leave/edit/' + item.id },
        { content: 'Approve', onAction: () => handleUpdate(LeaveStatus.Approved) },
        { content: 'Reject', onAction: () => handleUpdate(LeaveStatus.Rejected) },
        { content: 'Cancel', onAction: () => handleUpdate(LeaveStatus.Cancelled) },
      ];
    } else {
      menus = [{ content: 'Cancel', onAction: () => handleUpdate(LeaveStatus.Cancelled) }];
    }
  }

  return (
    <Popover activator={activator} active={open} onClose={toggelOpen}>
      <ActionList items={menus} />
    </Popover>
  );
}
