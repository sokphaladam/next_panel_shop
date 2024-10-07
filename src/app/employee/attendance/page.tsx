import dynamic from 'next/dynamic';
const EmployeeAttandanceScreen = dynamic(() => import('@/screen/user/attandance/EmployeeAttandanceScreen'), {
  ssr: false,
});

export default function AttandancePage() {
  return <EmployeeAttandanceScreen />;
}
