// assets
import {
  IconBuildingCommunity,
  IconClock,
  IconFileDescription,
  IconKey,
  IconUser,
  IconUsers,
  IconBell,
  IconServer
  // IconCreditCardPay,
  // IconCreditCardRefund
} from '@tabler/icons';

//mui
import {
  LooksOneOutlined,
  LooksTwoOutlined,
  Looks3Outlined,
  Looks4Outlined,
  Looks5Outlined,
  Looks6Outlined,
  CheckCircleOutline,
  RemoveCircleOutline,
  AdminPanelSettingsOutlined,
  PeopleAltOutlined,
  PaidOutlined,
  AccountBalanceOutlined,
  NewspaperOutlined,
  ListAltOutlined,
  SavingsOutlined,
  CurrencyExchangeOutlined,
  RequestQuoteOutlined,
  Domain,
  DomainAdd,
  HomeOutlined,
  OtherHousesOutlined
} from '@mui/icons-material';

// constant
const icons = {
  IconKey,
  IconUser,
  IconClock,
  IconBuildingCommunity,
  IconFileDescription,
  IconUsers,
  IconBell,
  IconServer,
  LooksOneOutlined,
  LooksTwoOutlined,
  Looks3Outlined,
  Looks4Outlined,
  Looks5Outlined,
  Looks6Outlined,
  CheckCircleOutline,
  RemoveCircleOutline,
  AdminPanelSettingsOutlined,
  PeopleAltOutlined,
  PaidOutlined,
  AccountBalanceOutlined,
  NewspaperOutlined,
  ListAltOutlined,
  SavingsOutlined,
  CurrencyExchangeOutlined,
  RequestQuoteOutlined,
  Domain,
  DomainAdd,
  HomeOutlined,
  OtherHousesOutlined
};

const pages = {
  id: 'pages',
  title: 'Bảng điều khiển',
  type: 'group',
  children: [
    {
      id: 'systemManagement',
      title: 'Quản trị hệ thống',
      type: 'collapse',
      // url: '/users',
      icon: icons.AdminPanelSettingsOutlined,
      children: [
        // {
        //   id: 'addStaf',
        //   title: 'Thêm tài khoản CMS',
        //   type: 'item',
        //   url: 'them-tai-khoan-CMS'
        //   // icon: icons.IconBell
        // },
        {
          id: 'listAccount',
          title: 'Danh sách quản trị',
          type: 'item',
          url: '/danh-sach-tai-khoan-CMS'
        }
      ]
    },

    {
      id: 'news',
      title: 'Bài viết tin tức',
      type: 'collapse',
      // url: '/users',
      icon: icons.NewspaperOutlined,
      children: [
        {
          id: 'newsList',
          title: 'Danh sách bài viết',
          type: 'item',
          url: '/quan-ly-bai-viet-tin-tuc',
          icon: icons.IconUser
        },
        {
          id: 'notification',
          title: 'Thông báo',
          type: 'item',
          url: '/quan-ly-thong-bao-firebase',
          icon: icons.IconBell
        }
        // {
        //   id: 'levelCredit',
        //   title: 'Các cấp đại lý',
        //   type: 'item',
        //   url: '/quan-ly-cac-cap-dai-ly',
        //   icon: icons.IconUser
        // },
        // {
        //   id: '3',
        //   title: 'Danh hiệu',
        //   type: 'item',
        //   url: '/quan-ly-danh-hieu-dai-ly',
        //   icon: icons.IconUser
        // }
      ]
    },
    {
      id: 'websiteManagement',
      title: 'Quản lý nội dung website',
      type: 'collapse',
      icon: icons.NewspaperOutlined,
      children: [
        {
          id: 'consultationRequests',
          title: 'Danh sách muốn được tư vấn',
          type: 'item',
          url: '/danh-sach-tu-van'
        },
        {
          id: 'recruitmentJobs',
          title: 'Các job tuyển dụng',
          type: 'item',
          url: '/danh-sach-tuyen-dung'
        }
      ]
    }
  ]
};

const generateUrlToKeyMap = (state) => {
  const map = {};
  const processChildren = (parentModule, children) => {
    children.forEach((child) => {
      const fullKey = `${parentModule}.${child.id}`;
      map[child.url] = fullKey;
      // Nếu có các children tiếp theo, xử lý đệ quy
      if (child.children) {
        processChildren(child.id, child.children);
      }
    });
  };

  state.forEach((topLevelModule) => {
    const parentModule = topLevelModule.id;
    if (topLevelModule.children) {
      processChildren(parentModule, topLevelModule.children);
    }
  });

  return map;
};

export const urlToKeyMap = generateUrlToKeyMap(pages.children);

export default pages;
