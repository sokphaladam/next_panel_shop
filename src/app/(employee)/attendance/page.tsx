import dynamic from 'next/dynamic';
const AdminEployeeAttendanceScreen = dynamic(() => import('@/screen/user/attandance/AdminEployeeAttendanceScreen'), {
  ssr: false,
});

export default function AttendanceAdminPage() {
  return <AdminEployeeAttendanceScreen />;
}
