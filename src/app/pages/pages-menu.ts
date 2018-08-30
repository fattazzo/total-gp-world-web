import { NbMenuItem } from '@nebular/theme';
import { TitleI18NSpec } from './pages.component';

/**
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
    title: "Drivers",
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
    link: '/pages/sections/circuit',
  }
];
 */

export const MENU_I18N_SPEC: TitleI18NSpec[] = [
  {
    capitalize: true,
    uppercase: false,
    key: 'dashboard.sing',
    menuItem: { title: 'Dashboard', icon: 'fas fa-home', link: '/pages/dashboard', home: true }
  },
  {
    capitalize: false,
    uppercase: true,
    key: 'section.plur',
    menuItem: { title: 'SECTIONS', group: true }
  },
  {
    capitalize: true,
    uppercase: false,
    key: 'driver.plur',
    menuItem: { title: "Drivers", icon: 'fas fa-user-astronaut', link: '/pages/sections/driver' }
  },
  {
    capitalize: true,
    uppercase: false,
    key: 'constructor.plur',
    menuItem: { title: 'Constructors', icon: 'fas fa-car', link: '/pages/sections/constructor' }
  }, {
    capitalize: true,
    uppercase: false,
    key: 'circuit.plur',
    menuItem: { title: 'Circuits', icon: 'fas fa-road', link: '/pages/sections/circuit' }
  }
];
