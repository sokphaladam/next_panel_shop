'use client';
import React from 'react';
import { Navigation, NavigationItemProps } from '@shopify/polaris';
import { usePathname, useRouter } from 'next/navigation';
import { MenuItems } from '@/lib/MenuItems';
import { useUser } from '@/service/UserProvider';
import { HomeIcon, OrderIcon, ProductIcon, TargetIcon } from '@shopify/polaris-icons';

interface Props {
  onClick?: () => void;
}

export function NavigationMarkup(props: Props) {
  const user = useUser();
  const pathname = usePathname();
  const { push } = useRouter();

  // return (
  //   <Navigation location="/">
  //     <Navigation.Section
  //       title="Report"
  //       items={[
  //         {
  //           label: 'Sale',
  //           selected: true,
  //           icon: HomeIcon,
  //           url: '/sale',
  //           subNavigationItems: [
  //             {
  //               label: 'Sale Day',
  //               url: '/sale/byday',
  //             },
  //             {
  //               label: 'Sale',
  //               url: '/sale',
  //               excludePaths: ['/sale'],
  //             },
  //           ],
  //         },
  //       ]}
  //     />
  //     <Navigation.Section
  //       items={[
  //         {
  //           url: '#',
  //           excludePaths: ['#'],
  //           label: 'Home',
  //           icon: HomeIcon,
  //         },
  //         {
  //           url: '#',
  //           excludePaths: ['#'],
  //           label: 'Orders',
  //           icon: OrderIcon,
  //           badge: '15',
  //           subNavigationItems: [
  //             {
  //               url: '#',
  //               excludePaths: ['#'],
  //               disabled: false,
  //               label: 'Collections',
  //             },
  //             {
  //               url: '#',
  //               excludePaths: ['#'],
  //               disabled: false,
  //               label: 'Inventory',
  //             },
  //           ],
  //         },
  //         {
  //           url: '#',
  //           excludePaths: ['#'],
  //           label: 'Marketing',
  //           icon: TargetIcon,
  //           badge: '15',
  //           subNavigationItems: [
  //             {
  //               url: '#',
  //               excludePaths: ['#'],
  //               disabled: false,
  //               label: 'Reports',
  //             },
  //             {
  //               url: '#',
  //               excludePaths: ['#'],
  //               disabled: false,
  //               label: 'Live view',
  //             },
  //           ],
  //         },
  //         {
  //           url: '#',
  //           label: 'Products',
  //           icon: ProductIcon,
  //           selected: true,
  //           subNavigationItems: [
  //             {
  //               url: '#',
  //               excludePaths: ['#'],
  //               disabled: false,
  //               label: 'Collections',
  //             },
  //             {
  //               url: '#',
  //               disabled: false,
  //               label: 'Inventory',
  //             },
  //           ],
  //         },
  //       ]}
  //     />
  //   </Navigation>
  // );

  return (
    <Navigation location="/">
      {MenuItems(user).map((item, index) => {
        const items = item.items.map((x: any) => {
          let selected = !pathname;

          if (!selected) {
            selected = pathname === x.url;
          }

          const item: NavigationItemProps = {
            label: x.label + '',
            icon: x.icon as any,
            onClick: () => {
              push(x.url || '');
              props.onClick && props.onClick();
            },
            selected,
            url: x.url,
            subNavigationItems: x.items
              ? x.items.map((y: any) => {
                  return {
                    label: y.label,
                    matches: pathname === y.url,
                    url: y.url,
                    onClick: () => {
                      push(y.url || '');
                      props.onClick && props.onClick();
                    },
                  };
                })
              : [],
          };

          return item;
        });
        return <Navigation.Section separator={index > 0} key={index} title={item.title} items={items} />;
      })}
    </Navigation>
  );
}
