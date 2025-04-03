import { PageLink } from "src/models/layoutprovider/model"

export const profileSubmenu: Array<PageLink> = [
  {
    title: 'Overview',
    path: '/home',
    isActive: true,
  },
  {
    title: 'Separator',
    path: '/home',
    isActive: true,
    isSeparator: true,
  },
  {
    title: 'Account',
    path: '/home',
    isActive: false,
  },
  {
    title: 'Account',
    path: '/home',
    isActive: false,
    isSeparator: true,
  },
  {
    title: 'Settings',
    path: '/home',
    isActive: false,
  },
  {
    title: 'Settings',
    path: '/home',
    isActive: false,
    isSeparator: true,
  },
]
