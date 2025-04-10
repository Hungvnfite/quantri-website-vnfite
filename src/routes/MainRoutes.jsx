import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticationStore } from '~/hooks/authentication';

// project imports
import MainLayout from '~/layout/MainLayout';
import Notification from '../views/pages/management/Notification';
import AddNotification from '../views/pages/management/AddNotification';
import ShoftNotification from '../views/pages/management/ShoftNotification';
import DashboardDefault from '../views/dashboard/Default';
import NewsList from '../views/pages/news/NewsList';
import AddNews from '../views/pages/news/AddNews';
import ListAccountCMS from '../views/pages/management/ListAccountCMS';
import ConsultantRequestList from '../views/pages/consultation/consultantRequest';
import AuthAccountCMS from '../views/pages/management/AuthAccountCMS';
import NoPermission from './NoPermission';
import RecruitmentJobList from '../views/pages/recruitmentJobs/listJob';
import AddRecruitmentJob from '../views/pages/recruitmentJobs/addRecruimentJob';
import CVList from '../views/pages/recruitmentJobs/CVList';
function ProtectedRoute() {
  const { authenticationState } = useAuthenticationStore();

  return authenticationState.loginInfo ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}

const MainRoutes = {
  path: '/',
  element: <ProtectedRoute />,
  // errorElement:<ErrorPage/>,

  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },

    // "systemManagement",

    {
      element: <NoPermission module={'systemManagement'} />,
      children: [
        {
          path: 'danh-sach-tai-khoan-CMS',
          element: <ListAccountCMS />
        },
        {
          path: 'them-tai-khoan-CMS',
          element: <AuthAccountCMS />
        },
        {
          path: '/phan-quyen-nhan-vien',
          element: <AuthAccountCMS update={true} />
        }
      ]
    },

    // "users",

    {
      element: <NoPermission module={'news'} />,
      children: [
        {
          path: 'quan-ly-bai-viet-tin-tuc',
          element: <NewsList />
        },
        {
          path: 'them-bai-viet-tin-tuc',
          element: <AddNews />
        },
        {
          path: 'sua-bai-viet-tin-tuc',
          element: <AddNews update={true} />
        },
        {
          path: 'quan-ly-thong-bao-firebase',
          element: <Notification />
        },
        {
          path: 'them-thong-bao',
          element: <AddNotification />
        },
        {
          path: 'len-lich-ban-thong-bao',
          element: <ShoftNotification />
        }
      ]
    },
    {
      element: <NoPermission module={'websiteManagement'} />,
      children: [
        {
          path: '/danh-sach-tu-van',
          element: <ConsultantRequestList />
        },
        {
          path: '/danh-sach-tuyen-dung',
          element: <RecruitmentJobList />
        },
        {
          path: '/them-tuyen-dung',
          element: <AddRecruitmentJob />
        },
        {
          path: '/chi-tiet-tuyen-dung',
          element: <AddRecruitmentJob update={true} />
        },
        {
          path: '/danh-sach-ung-tuyen',
          element: <CVList />
        }
      ]
    }
  ]
};

// {
//   id: 'loanDetail',
//   type: 'item',
//   url: '/chi-tiet-vay-von'
// }

export default MainRoutes;
