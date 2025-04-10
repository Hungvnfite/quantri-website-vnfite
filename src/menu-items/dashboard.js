// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

const dashboard = {
  id: 'dashboard',
  title: 'Bảng thống kê',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Bảng thống kê',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
