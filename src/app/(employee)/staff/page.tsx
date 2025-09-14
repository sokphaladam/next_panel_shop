import { PolarisLayout } from "@/components/polaris/PolarisLayout";
import { UserListScreen } from "@/screen/user/UserListScreen";

export default function StaffPage() {
  return (
    <PolarisLayout
      fullWidth
      // primaryAction={{ content: 'Create', url: '/staff/create' }}
    >
      <UserListScreen />
    </PolarisLayout>
  );
}
