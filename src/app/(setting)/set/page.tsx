import dynamic from 'next/dynamic';

const SetScreen = dynamic(() => import('@/screen/setting/set/SetScreen'), { ssr: false });

export default function SetPage() {
  return <SetScreen />;
}
