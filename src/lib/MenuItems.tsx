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
      title: lng.menu_inventory,
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
      title: lng.menu_order,
      items: [
        {
          label: lng.menu_table,
          icon: TabletIcon,
          url: '/set',
        },
        {
          label: lng.menu_customer_order,
          icon: CartFilledIcon,
          url: '/order/list',
        },
        {
          label: lng.menu_order_schedule,
          icon: PageClockFilledIcon,
          url: '/order/schedule',
        },
      ],
    },
    {
      title: lng.menu_employee,
      items: [
        {
          label: lng.menu_attendance,
          icon: AttachmentIcon,
          url: '/employee/attendance',
          items: [
            {
              label: lng.menu_check_in_out,
              url: '/employee/attendance',
            },
            {
              label: lng.menu_attendance_admin,
              url: '/attendance',
            },
          ],
        },
        {
          label: lng.menu_manage_staff,
          icon: PersonalizedTextIcon,
          url: '/staff',
          items: [
            {
              label: lng.title_leave,
              icon: FileIcon,
              url: '/leave',
            },
            {
              label: lng.staff,
              icon: PersonIcon,
              url: '/staff',
            },
            {
              label: lng.overtime,
              icon: PageClockIcon,
              url: '/ot',
            },
          ],
        },
        {
          label: lng.menu_shift_handover,
          icon: MoneyFilledIcon,
          url: '/shift',
        },
        {
          label: lng.menu_public_holiday,
          icon: CalendarTimeIcon,
          url: '/holiday',
        },
      ],
    },
    {
      title: lng.menu_report,
      items: [
        {
          label: lng.menu_sale,
          icon: FileIcon,
          url: '/sale',
          items: [
            {
              label: lng.menu_report_sale,
              url: '/sale',
              icon: FileIcon,
            },
            {
              label: lng.menu_report_sale_by_day,
              url: '/sale/byday',
              icon: FileIcon,
            },
            {
              label: lng.menu_report_product_select,
              url: '/sale/byday/products',
              icon: FileIcon,
            },
          ],
        },
        {
          label: lng.menu_staff_payroll,
          icon: PaymentFilledIcon,
          url: '/staff/payroll',
        },
      ],
    },
    {
      title: lng.menu_setting,
      items: [
        {
          label: lng.menu_option,
          icon: SettingsIcon,
          url: '/setting',
        },
        {
          label: lng.menu_delivery,
          icon: DeliveryIcon,
          url: '/delivery',
        },
        {
          label: lng.menu_position,
          icon: StarIcon,
          url: '/position',
        },
        {
          label: lng.menu_payment_info,
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
            title: lng.menu_order,
            items: [
              {
                label: lng.menu_table,
                icon: TabletIcon,
                url: '/set',
              },
              {
                label: lng.menu_customer_order,
                icon: CartFilledIcon,
                url: '/order/list',
              },
            ],
          },
          {
            title: lng.menu_employee,
            items: [
              {
                label: lng.menu_attendance,
                icon: AttachmentIcon,
                url: '/employee/attendance',
              },
              {
                label: lng.title_leave,
                icon: FileIcon,
                url: '/leave',
              },
              {
                label: lng.overtime,
                icon: PageClockIcon,
                url: '/ot',
              },
            ],
          },
          {
            title: lng.menu_setting,
            items: [
              {
                label: lng.menu_delivery,
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
            title: lng.menu_order,
            items: [
              {
                label: lng.menu_table,
                icon: TabletIcon,
                url: '/set',
              },
              {
                label: lng.menu_customer_order,
                icon: CartFilledIcon,
                url: '/order/list',
              },
              {
                label: lng.menu_order_schedule,
                icon: PageClockFilledIcon,
                url: '/order/schedule',
              },
            ],
          },
          {
            title: lng.menu_employee,
            items: [
              {
                label: lng.menu_attendance,
                icon: AttachmentIcon,
                url: '/employee/attendance',
                items: [
                  {
                    label: lng.menu_check_in_out,
                    url: '/employee/attendance',
                  },
                  {
                    label: lng.menu_attendance_admin,
                    url: '/attendance',
                  },
                ],
              },
              {
                label: lng.menu_manage_staff,
                icon: PersonalizedTextIcon,
                url: '/staff',
                items: [
                  {
                    label: lng.title_leave,
                    icon: FileIcon,
                    url: '/leave',
                  },
                  {
                    label: lng.staff,
                    icon: PersonIcon,
                    url: '/staff',
                  },
                  {
                    label: lng.overtime,
                    icon: PageClockIcon,
                    url: '/ot',
                  },
                ],
              },
              {
                label: lng.menu_shift_handover,
                icon: MoneyFilledIcon,
                url: '/shift',
              },
              {
                label: lng.menu_public_holiday,
                icon: CalendarTimeIcon,
                url: '/holiday',
              },
            ],
          },
          {
            title: lng.menu_report,
            items: [
              {
                label: lng.menu_sale,
                icon: FileIcon,
                url: '/sale',
                items: [
                  {
                    label: lng.menu_report_sale,
                    url: '/sale',
                    icon: FileIcon,
                  },
                  {
                    label: lng.menu_report_sale_by_day,
                    url: '/sale/byday',
                    icon: FileIcon,
                  },
                  {
                    label: lng.menu_report_product_select,
                    url: '/sale/byday/products',
                    icon: FileIcon,
                  },
                ],
              },
              {
                label: lng.menu_staff_payroll,
                icon: PaymentFilledIcon,
                url: '/staff/payroll',
              },
            ],
          },
          {
            title: lng.menu_setting,
            items: [
              {
                label: lng.menu_delivery,
                icon: DeliveryIcon,
                url: '/delivery',
              },
              {
                label: lng.menu_position,
                icon: StarIcon,
                url: '/position',
              },
              {
                label: lng.menu_payment_info,
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
            title: lng.menu_inventory,
            items: [
              {
                label: lng.menu_product,
                icon: ArchiveIcon,
                url: '/products',
              },
            ],
          },
          {
            title: lng.menu_order,
            items: [
              {
                label: lng.menu_table,
                icon: TabletIcon,
                url: '/set',
              },
              {
                label: lng.menu_customer_order,
                icon: CartFilledIcon,
                url: '/order/list',
              },
              {
                label: lng.menu_order_schedule,
                icon: PageClockFilledIcon,
                url: '/order/schedule',
              },
            ],
          },
          {
            title: lng.menu_employee,
            items: [
              {
                label: lng.menu_attendance,
                icon: AttachmentIcon,
                url: '/employee/attendance',
              },
              {
                label: lng.menu_shift_handover,
                icon: MoneyFilledIcon,
                url: '/shift',
              },
              {
                label: lng.title_leave,
                icon: FileIcon,
                url: '/leave',
              },
              {
                label: lng.overtime,
                icon: PageClockIcon,
                url: '/ot',
              },
            ],
          },
          {
            title: lng.menu_report,
            items: [
              {
                label: lng.menu_sale,
                icon: FileIcon,
                url: '/sale',
                items: [
                  {
                    label: lng.menu_report_sale,
                    url: '/sale',
                    icon: FileIcon,
                  },
                  {
                    label: lng.menu_report_sale_by_day,
                    url: '/sale/byday',
                    icon: FileIcon,
                  },
                  {
                    label: lng.menu_report_product_select,
                    url: '/sale/byday/products',
                    icon: FileIcon,
                  },
                ],
              },
            ],
          },
          {
            title: lng.menu_setting,
            items: [
              {
                label: lng.menu_delivery,
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
