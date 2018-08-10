import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'fas fa-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'SECTIONS',
    group: true,
  },
  {
    title: 'Drivers',
    icon: 'fas fa-user-astronaut',
    link: '/pages/sections/driver',
  },
  {
    title: 'Constructors',
    icon: 'fas fa-car',
    link: '/pages/sections/constructor',
  },
  {
    title: 'Circuits',
    icon: 'fas fa-road',
    link: '/pages/circuits',
  }
];
