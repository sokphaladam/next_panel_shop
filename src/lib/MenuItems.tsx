import { User } from "@/gql/graphql";
import { useScriptLanguage } from "@/service/LanguageProvider";
import {
  Banknote,
  CalendarSync,
  ChartBarStacked,
  CreditCard,
  FileClock,
  FileOutput,
  FileSpreadsheet,
  FileUser,
  HandCoins,
  LayoutDashboard,
  MonitorCog,
  PackageSearch,
  PersonStanding,
  ShoppingCart,
  Star,
  Tablets,
  Tent,
  Truck,
  UserRoundSearch,
  Warehouse,
} from "lucide-react";

interface PropsMenu {
  title: string;
  items: PropsMenuItem[];
}

interface PropsMenuItem {
  label: string;
  icon: any;
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
          icon: LayoutDashboard,
          url: "/",
        },
      ],
    },
    {
      title: lng.menu_inventory,
      items: [
        {
          label: lng.menu_product,
          icon: PackageSearch,
          url: "/products",
        },
        {
          label: lng.menu_category,
          icon: ChartBarStacked,
          url: "/category",
        },
        {
          label: "Stock",
          icon: Warehouse,
          url: "/inventory",
        },
      ],
    },
    {
      title: lng.menu_order,
      items: [
        {
          label: lng.menu_table,
          icon: Tablets,
          url: "/set",
          items: [
            {
              label: lng.menu_table,
              url: "/set",
            },
            {
              label: "Link Table",
              url: "/link_table",
            },
            {
              label: "Merge Table",
              url: "/merge_table",
            },
          ],
        },
        {
          label: lng.menu_customer_order,
          icon: ShoppingCart,
          url: "/order/list",
        },
        {
          label: lng.menu_order_schedule,
          icon: CalendarSync,
          url: "/order/schedule",
        },
      ],
    },
    {
      title: lng.menu_employee,
      items: [
        {
          label: lng.menu_attendance,
          icon: UserRoundSearch,
          url: "/employee/attendance",
          items: [
            {
              label: lng.menu_check_in_out,
              url: "/employee/attendance",
            },
            {
              label: lng.menu_attendance_admin,
              url: "/attendance",
            },
          ],
        },
        {
          label: lng.menu_manage_staff,
          icon: FileUser,
          url: "/staff",
          items: [
            {
              label: lng.title_leave,
              icon: FileOutput,
              url: "/leave",
            },
            {
              label: lng.staff,
              icon: PersonStanding,
              url: "/staff",
            },
            {
              label: lng.overtime,
              icon: FileClock,
              url: "/ot",
            },
          ],
        },
        {
          label: lng.menu_shift_handover,
          icon: HandCoins,
          url: "/shift",
        },
        {
          label: lng.menu_public_holiday,
          icon: Tent,
          url: "/holiday",
        },
      ],
    },
    {
      title: lng.menu_report,
      items: [
        {
          label: lng.menu_sale,
          icon: FileSpreadsheet,
          url: "/sale",
          items: [
            {
              label: lng.menu_report_sale,
              url: "/sale",
              icon: FileSpreadsheet,
            },
            {
              label: lng.menu_report_sale_by_day,
              url: "/sale/byday",
              icon: FileSpreadsheet,
            },
            {
              label: lng.menu_report_product_select,
              url: "/sale/byday/products",
              icon: FileSpreadsheet,
            },
          ],
        },
        {
          label: lng.menu_staff_payroll,
          icon: Banknote,
          url: "/staff/payroll",
        },
      ],
    },
    {
      title: lng.menu_setting,
      items: [
        {
          label: lng.menu_option,
          icon: MonitorCog,
          url: "/setting",
        },
        {
          label: lng.menu_delivery,
          icon: Truck,
          url: "/delivery",
        },
        {
          label: lng.menu_position,
          icon: Star,
          url: "/position",
        },
        {
          label: lng.menu_payment_info,
          icon: CreditCard,
          url: "/payment",
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
                icon: Tablets,
                url: "/set",
              },
              {
                label: lng.menu_customer_order,
                icon: ShoppingCart,
                url: "/order/list",
              },
            ],
          },
          {
            title: lng.menu_employee,
            items: [
              {
                label: lng.menu_attendance,
                icon: UserRoundSearch,
                url: "/employee/attendance",
              },
              {
                label: lng.title_leave,
                icon: FileOutput,
                url: "/leave",
              },
              {
                label: lng.overtime,
                icon: FileClock,
                url: "/ot",
              },
            ],
          },
          {
            title: lng.menu_setting,
            items: [
              {
                label: lng.menu_delivery,
                icon: Truck,
                url: "/delivery",
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
                icon: Tablets,
                url: "/set",
              },
              {
                label: lng.menu_customer_order,
                icon: ShoppingCart,
                url: "/order/list",
              },
              {
                label: lng.menu_order_schedule,
                icon: CalendarSync,
                url: "/order/schedule",
              },
            ],
          },
          {
            title: lng.menu_employee,
            items: [
              {
                label: lng.menu_attendance,
                icon: UserRoundSearch,
                url: "/employee/attendance",
                items: [
                  {
                    label: lng.menu_check_in_out,
                    url: "/employee/attendance",
                  },
                  {
                    label: lng.menu_attendance_admin,
                    url: "/attendance",
                  },
                ],
              },
              {
                label: lng.menu_manage_staff,
                icon: FileUser,
                url: "/staff",
                items: [
                  {
                    label: lng.title_leave,
                    icon: FileOutput,
                    url: "/leave",
                  },
                  {
                    label: lng.staff,
                    icon: PersonStanding,
                    url: "/staff",
                  },
                  {
                    label: lng.overtime,
                    icon: FileClock,
                    url: "/ot",
                  },
                ],
              },
              {
                label: lng.menu_shift_handover,
                icon: HandCoins,
                url: "/shift",
              },
              {
                label: lng.menu_public_holiday,
                icon: Tent,
                url: "/holiday",
              },
            ],
          },
          {
            title: lng.menu_report,
            items: [
              {
                label: lng.menu_sale,
                icon: FileSpreadsheet,
                url: "/sale",
                items: [
                  {
                    label: lng.menu_report_sale,
                    url: "/sale",
                    icon: FileSpreadsheet,
                  },
                  {
                    label: lng.menu_report_sale_by_day,
                    url: "/sale/byday",
                    icon: FileSpreadsheet,
                  },
                  {
                    label: lng.menu_report_product_select,
                    url: "/sale/byday/products",
                    icon: FileSpreadsheet,
                  },
                ],
              },
              {
                label: lng.menu_staff_payroll,
                icon: Banknote,
                url: "/staff/payroll",
              },
            ],
          },
          {
            title: lng.menu_setting,
            items: [
              {
                label: lng.menu_delivery,
                icon: Truck,
                url: "/delivery",
              },
              {
                label: lng.menu_position,
                icon: Star,
                url: "/position",
              },
              {
                label: lng.menu_payment_info,
                icon: CreditCard,
                url: "/payment",
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
                icon: PackageSearch,
                url: "/products",
              },
              {
                label: "Stock",
                icon: Warehouse,
                url: "/inventory",
              },
            ],
          },
          {
            title: lng.menu_order,
            items: [
              {
                label: lng.menu_table,
                icon: Tablets,
                url: "/set",
                items: [
                  {
                    label: lng.menu_table,
                    url: "/set",
                  },
                  {
                    label: "Merge Table",
                    url: "/merge_table",
                  },
                ],
              },
              {
                label: lng.menu_customer_order,
                icon: ShoppingCart,
                url: "/order/list",
              },
              {
                label: lng.menu_order_schedule,
                icon: CalendarSync,
                url: "/order/schedule",
              },
            ],
          },
          {
            title: lng.menu_employee,
            items: [
              {
                label: lng.menu_attendance,
                icon: UserRoundSearch,
                url: "/employee/attendance",
              },
              {
                label: lng.menu_shift_handover,
                icon: HandCoins,
                url: "/shift",
              },
              {
                label: lng.title_leave,
                icon: FileOutput,
                url: "/leave",
              },
              {
                label: lng.overtime,
                icon: FileClock,
                url: "/ot",
              },
            ],
          },
          {
            title: lng.menu_report,
            items: [
              {
                label: lng.menu_sale,
                icon: FileSpreadsheet,
                url: "/sale",
                items: [
                  {
                    label: lng.menu_report_sale,
                    url: "/sale",
                    icon: FileSpreadsheet,
                  },
                  {
                    label: lng.menu_report_sale_by_day,
                    url: "/sale/byday",
                    icon: FileSpreadsheet,
                  },
                  {
                    label: lng.menu_report_product_select,
                    url: "/sale/byday/products",
                    icon: FileSpreadsheet,
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
                icon: Truck,
                url: "/delivery",
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
