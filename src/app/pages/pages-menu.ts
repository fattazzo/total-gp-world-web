import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'fas fa-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'CURRENT SEASON',
    group: true,
  },
  {
    title: 'Drivers',
    icon: 'fas fa-user-astronaut',
    link: '/pages/drivers',
  },
  {
    title: 'Constructors',
    icon: 'fas fa-car',
    link: '/pages/constructors',
  },
  {
    title: 'Circuits',
    icon: 'fas fa-road',
    link: '/pages/circuits',
  },
  {
    title: 'SINCE 1950',
    group: true,
  },
];
