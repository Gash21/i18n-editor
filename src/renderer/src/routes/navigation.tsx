import {
  IconClipboard,
  IconHome,
  IconPhoto,
  IconUser,
  IconVideo,
} from '@tabler/icons-react';

export const Navigations = [
  { path: '/home', label: 'Home', icon: <IconHome /> },
  { path: '/photo', label: 'Photo', icon: <IconPhoto /> },
  { path: '/video', label: 'Video', icon: <IconVideo /> },
  { path: '/blog', label: 'Blog', icon: <IconClipboard /> },
  { path: '/client', label: 'Client', icon: <IconUser /> },
];
