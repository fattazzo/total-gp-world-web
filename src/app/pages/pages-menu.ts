import { TitleI18NSpec } from './pages.component';

export const MENU_I18N_SPEC: TitleI18NSpec[] = [
  {
    capitalize: true,
    uppercase: false,
    key: 'dashboard.sing',
    menuItem: {
      title: 'Dashboard',
      icon: 'fas fa-home',
      link: '/pages/dashboard',
      home: true,
    },
  },
  {
    capitalize: true,
    uppercase: false,
    key: 'comparison.sing',
    menuItem: {
      title: 'Comparison',
      icon: 'fas fa-project-diagram',
      link: '/pages/comparison',
      home: true,
    },
  },
  {
    capitalize: true,
    uppercase: false,
    key: 'race-anatomy',
    menuItem: {
      title: 'Race anatomy',
      icon: 'fas fa-infinity',
      link: '/pages/race-anatomy',
      home: true,
    },
  },
  {
    capitalize: true,
    uppercase: false,
    key: 'query.plur',
    menuItem: {
      title: 'Query',
      icon: 'fas fa-search',
      link: '/pages/query',
      home: true,
    },
  },
  {
    capitalize: false,
    uppercase: true,
    key: 'section.plur',
    menuItem: { title: 'SECTIONS', group: true },
  },
  {
    capitalize: true,
    uppercase: false,
    key: 'driver.plur',
    menuItem: {
      title: 'Drivers',
      icon: 'fas fa-user-astronaut',
      link: '/pages/sections/driver',
    },
  },
  {
    capitalize: true,
    uppercase: false,
    key: 'constructor.plur',
    menuItem: {
      title: 'Constructors',
      icon: 'fas fa-car',
      link: '/pages/sections/constructor',
    },
  },
  {
    capitalize: true,
    uppercase: false,
    key: 'circuit.plur',
    menuItem: {
      title: 'Circuits',
      icon: 'fas fa-road',
      link: '/pages/sections/circuit',
    },
  },
  {
    capitalize: false,
    uppercase: true,
    key: 'other.sing',
    menuItem: { title: 'OTHERS', group: true },
  },
  {
    capitalize: true,
    uppercase: false,
    key: 'info.sing',
    menuItem: {
      title: 'Info',
      icon: 'fas fa-info-circle',
      link: '/pages/info',
    },
  },
  {
    capitalize: true,
    uppercase: false,
    key: 'about',
    menuItem: {
      title: 'About',
      icon: 'fas fa-id-card',
      link: '/pages/about',
    },
  },
];
