'use client';
import { useCustomToast } from '@/components/custom/CustomToast';
import { useResetPasswordMutation } from '@/gql/graphql';
import { Icon, Modal, TextField } from '@shopify/polaris';
import { HideIcon, ViewIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

interface Props {
  onClose: any;
  username: string;
  oldPassword: string;
}

export function FormResetPassword(props: Props) {
  const { toasts, setToasts } = useCustomToast();
  const [passwordInput, setPasswordInput] = useState('');
  const [conpasswordInput, setConPasswordInput] = useState('');
  const [show, setShow] = useState(false);
  const [reset] = useResetPasswordMutation();

  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;

  const checkPwd =
    !!passwordInput.match(lowerCaseLetters) && !!passwordInput.match(upperCaseLetters) && !!passwordInput.match(numbers)
      ? true
      : false;

  const checkConPwd =
    !!conpasswordInput.match(lowerCaseLetters) &&
    !!conpasswordInput.match(upperCaseLetters) &&
    !!passwordInput.match(numbers)
      ? true
      : false;

  const handleSave = useCallback(() => {
    if (passwordInput !== conpasswordInput) {
      return;
    }
    reset({
      variables: {
        username: props.username,
        oldPassowrd: props.oldPassword,
        password: conpasswordInput,
      },
    })
      .then((res) => {
        setToasts([
          ...toasts,
          {
            content: res.data?.resetPassword ? 'Reset password success' : 'Oop! something was wrong please try again.',
            status: res.data?.resetPassword ? 'success' : 'error',
          },
        ]);
        props.onClose();
        setTimeout(() => process.browser && window.location.reload(), 500);
      })
      .catch(() => {
        setToasts([
          ...toasts,
          {
            content: 'Oop! something was wrong please try again.',
            status: 'error',
          },
        ]);
      });
  }, [passwordInput, conpasswordInput, props, reset, toasts, setToasts]);

  return (
    <Modal
      open={true}
      onClose={props.onClose}
      title="Reset Password"
      primaryAction={{ content: 'Save', onAction: handleSave, disabled: !checkPwd || !checkConPwd }}
      footer={
        passwordInput !== conpasswordInput ? <div className="text-rose-700">Password not match!</div> : <div></div>
      }
    >
      <Modal.Section>
        <TextField
          autoComplete="off"
          label="New Password"
          type={show ? 'text' : 'password'}
          value={passwordInput}
          onChange={(v) => {
            setPasswordInput(v);
            if (v.length >= 8) {
              if (v.match(lowerCaseLetters) && v.match(upperCaseLetters) && v.match(numbers)) {
              }
            }
          }}
          error={
            passwordInput !== ''
              ? !checkPwd
                ? 'Your password needs Upper and lower case letters, numbers and a minimum 8 chars. it will save information without change password.'
                : passwordInput.length < 8
                ? 'Minimum 8 chars of password input'
                : ''
              : ''
          }
          suffix={
            <div className="cursor-pointer" onClick={() => setShow(!show)}>
              {(<Icon source={show ? HideIcon : ViewIcon} />) as any}
            </div>
          }
        />
        <br />
        <TextField
          autoComplete="off"
          label="Confirm Password"
          type={show ? 'text' : 'password'}
          value={conpasswordInput}
          onChange={(v) => {
            setConPasswordInput(v);
            if (v.length >= 8) {
              if (v.match(lowerCaseLetters) && v.match(upperCaseLetters) && v.match(numbers)) {
              }
            }
          }}
          error={
            conpasswordInput !== ''
              ? !checkConPwd
                ? 'Your password needs Upper and lower case letters, numbers and a minimum 8 chars. it will save information without change password.'
                : conpasswordInput.length < 8
                ? 'Minimum 8 chars of password input'
                : ''
              : ''
          }
          suffix={
            <div className="cursor-pointer" onClick={() => setShow(!show)}>
              {(<Icon source={show ? HideIcon : ViewIcon} />) as any}
            </div>
          }
        />
      </Modal.Section>
    </Modal>
  );
}
