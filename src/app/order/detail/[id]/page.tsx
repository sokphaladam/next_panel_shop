import dynamic from 'next/dynamic';
const OrderDetailScreen = dynamic(() => import('@/screen/order/detail/OrderDetailScreen'), { ssr: false });

export default function OrderDetailPage() {
  return <OrderDetailScreen />;
}
