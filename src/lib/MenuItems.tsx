import { User } from '@/gql/graphql';
import { useScriptLanguage } from '@/service/LanguageProvider';
import {
  AppsIcon,
  ArchiveIcon,
  CartFilledIcon,
  DeliveryIcon,
  MagicIcon,
  SettingsIcon,
  TabletIcon,
  AttachmentIcon,
  FileIcon,
  PersonIcon,
  PageClockIcon,
  StarIcon,
  CreditCardIcon,
  MoneyFilledIcon,
  PaymentFilledIcon,
  PersonalizedTextIcon,
  CalendarTimeIcon,
  PageClockFilledIcon,
} from '@shopify/polaris-icons';
import { FunctionComponent, SVGProps } from 'react';

interface PropsMenu {
  title: string;
  items: PropsMenuItem[];
}

interface PropsMenuItem {
  label: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  url: string;
  items?: any[];
}

export function MenuItems(user: User | null) {
  const lng = useScriptLanguage();

  const defaultValue: PropsMenu[] = [
    {
      title: lng.menu_dashboard,
      items: [
        {
          label: lng.menu_dashboard,
          icon: AppsIcon,
          url: '/',
        },
      ],
    },
    {
      title: 'Inventory',
      items: [
        {
          label: lng.menu_product,
          icon: ArchiveIcon,
          url: '/products',
        },
        {
          label: lng.menu_category,
          icon: MagicIcon,
          url: '/category',
        },
      ],
    },
    {
      title: 'Orders',
      items: [
        {
          label: 'Table',
          icon: TabletIcon,
          url: '/set',
        },
        {
          label: 'Customer Order',
          icon: CartFilledIcon,
          url: '/order/list',
        },
        {
          label: 'Order Schedule',
          icon: PageClockFilledIcon,
          url: '/order/schedule',
        },
      ],
    },
    {
      title: 'Employee',
      items: [
        {
          label: 'Attendance',
          icon: AttachmentIcon,
          url: '/employee/attendance',
          items: [
            {
              label: 'Check In & Out',
              url: '/employee/attendance',
            },
            {
              label: 'Attendance (Admin)',
              url: '/attendance',
            },
          ],
        },
        {
          label: 'Manage Staff',
          icon: PersonalizedTextIcon,
          url: '/staff',
          items: [
            {
              label: 'Leave',
              icon: FileIcon,
              url: '/leave',
            },
            {
              label: 'Staff',
              icon: PersonIcon,
              url: '/staff',
            },
            {
              label: 'Overtime',
              icon: PageClockIcon,
              url: '/ot',
            },
          ],
        },
        {
          label: 'Shift Handover',
          icon: MoneyFilledIcon,
          url: '/shift',
        },
        {
          label: 'Public Holiday',
          icon: CalendarTimeIcon,
          url: '/holiday',
        },
      ],
    },
    {
      title: 'Reports',
      items: [
        {
          label: 'Sale',
          icon: FileIcon,
          url: '/sale',
          items: [
            {
              label: 'Sale Report',
              url: '/sale',
              icon: FileIcon,
            },
            {
              label: 'Sale By Day Report',
              url: '/sale/byday',
              icon: FileIcon,
            },
            {
              label: 'Sale Product Select',
              url: '/sale/byday/products',
              icon: FileIcon,
            },
          ],
        },
        {
          label: 'Staff Payroll',
          icon: PaymentFilledIcon,
          url: '/staff/payroll',
        },
      ],
    },
    {
      title: 'Setting',
      items: [
        {
          label: 'Option',
          icon: SettingsIcon,
          url: '/setting',
        },
        {
          label: 'Delivery',
          icon: DeliveryIcon,
          url: '/delivery',
        },
        {
          label: 'Position',
          icon: StarIcon,
          url: '/position',
        },
        {
          label: 'Payment Info',
          icon: CreditCardIcon,
          url: '/payment',
        },
      ],
    },
  ];

  let MenuItem: any[] = [];

  if (user) {
    switch (user.role?.id) {
      case 1:
        MenuItem = [...defaultValue];
        break;
      case 2:
        MenuItem = [...defaultValue];
        break;
      case 3:
        MenuItem = [
          {
            title: 'Orders',
            items: [
              {
                label: 'Table',
                icon: TabletIcon,
                url: '/set',
              },
              {
                label: 'Order',
                icon: CartFilledIcon,
                url: '/order/list',
              },
            ],
          },
          {
            title: 'Employee',
            items: [
              {
                label: 'Attendance',
                icon: AttachmentIcon,
                url: '/employee/attendance',
              },
              {
                label: 'Leave',
                icon: FileIcon,
                url: '/leave',
              },
              {
                label: 'Overtime',
                icon: PageClockIcon,
                url: '/ot',
              },
            ],
          },
          {
            title: 'Setting',
            items: [
              {
                label: 'Delivery',
                icon: DeliveryIcon,
                url: '/delivery',
              },
            ],
          },
        ];
        break;
      case 4:
        MenuItem = [
          {
            title: 'Kitchen',
            items: [
              {
                label: 'Today Order',
                icon: CartFilledIcon,
                url: '/kitchen/order',
              },
            ],
          },
        ];
        break;
      case 5:
        MenuItem = [
          {
            title: 'Orders',
            items: [
              {
                label: 'Table',
                icon: TabletIcon,
                url: '/set',
              },
              {
                label: 'Order',
                icon: CartFilledIcon,
                url: '/order/list',
              },
              {
                label: 'Order Schedule',
                icon: PageClockFilledIcon,
                url: '/order/schedule',
              },
            ],
          },
          {
            title: 'Employee',
            items: [
              {
                label: 'Attendance',
                icon: AttachmentIcon,
                url: '/employee/attendance',
              },
              {
                label: 'Shift Handover',
                icon: MoneyFilledIcon,
                url: '/shift',
              },
              {
                label: 'Attendance (Admin)',
                icon: AttachmentIcon,
                url: '/attendance',
              },
              {
                label: 'Leave',
                icon: FileIcon,
                url: '/leave',
              },
              {
                label: 'Overtime',
                icon: PageClockIcon,
                url: '/ot',
              },
            ],
          },
          {
            title: 'Reports',
            items: [
              {
                label: 'Sale',
                icon: FileIcon,
                url: '/sale',
                items: [
                  {
                    label: 'Sale Report',
                    url: '/sale',
                    icon: FileIcon,
                  },
                  {
                    label: 'Sale By Day Report',
                    url: '/sale/byday',
                    icon: FileIcon,
                  },
                  {
                    label: 'Sale Product Select',
                    url: '/sale/byday/products',
                    icon: FileIcon,
                  },
                ],
              },
              {
                label: 'Staff Payroll',
                icon: PaymentFilledIcon,
                url: '/staff/payroll',
              },
            ],
          },
          {
            title: 'Setting',
            items: [
              {
                label: 'Table',
                icon: TabletIcon,
                url: '/set',
              },
              {
                label: 'Delivery',
                icon: DeliveryIcon,
                url: '/delivery',
              },
              {
                label: 'Position',
                icon: StarIcon,
                url: '/position',
              },
              {
                label: 'Payment Info',
                icon: CreditCardIcon,
                url: '/payment',
              },
            ],
          },
        ];
        break;
      case 6:
        MenuItem = [
          {
            title: 'Inventory',
            items: [
              {
                label: lng.menu_product,
                icon: ArchiveIcon,
                url: '/products',
              },
            ],
          },
          {
            title: 'Orders',
            items: [
              {
                label: 'Table',
                icon: TabletIcon,
                url: '/set',
              },
              {
                label: 'Order',
                icon: CartFilledIcon,
                url: '/order/list',
              },
              {
                label: 'Order Schedule',
                icon: PageClockFilledIcon,
                url: '/order/schedule',
              },
            ],
          },
          {
            title: 'Employee',
            items: [
              {
                label: 'Attendance',
                icon: AttachmentIcon,
                url: '/employee/attendance',
              },
              {
                label: 'Shift Handover',
                icon: MoneyFilledIcon,
                url: '/shift',
              },
              {
                label: 'Leave',
                icon: FileIcon,
                url: '/leave',
              },
              {
                label: 'Overtime',
                icon: PageClockIcon,
                url: '/ot',
              },
            ],
          },
          {
            title: 'Reports',
            items: [
              {
                label: 'Sale',
                icon: FileIcon,
                url: '/sale',
                items: [
                  {
                    label: 'Sale Report',
                    url: '/sale',
                    icon: FileIcon,
                  },
                  {
                    label: 'Sale By Day Report',
                    url: '/sale/byday',
                    icon: FileIcon,
                  },
                  {
                    label: 'Sale Product Select',
                    url: '/sale/byday/products',
                    icon: FileIcon,
                  },
                ],
              },
            ],
          },
          {
            title: 'Setting',
            items: [
              {
                label: 'Delivery',
                icon: DeliveryIcon,
                url: '/delivery',
              },
            ],
          },
        ];
        break;
      default:
        MenuItem = [];
        break;
    }
  }

  return MenuItem;
}
