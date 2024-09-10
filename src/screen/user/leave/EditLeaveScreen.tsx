'use client';
import { useParams } from 'next/navigation';
import { FormLeave } from './FormLeave';

export function EditLeaveScreen() {
  const param = useParams<{ id: string }>();
  return <FormLeave id={Number(param.id)} />;
}
