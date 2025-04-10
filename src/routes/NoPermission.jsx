import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import MainCard from '../ui-component/cards/MainCard';
import { setRoleForModule } from '../store/slices/authentication';

const NoPermission = ({ module }) => {
  const moduleRole = useSelector((state) => state.authentication.loginInfo?.roles || []);
  const dispatch = useDispatch();

  // Tìm module và role
  const item = moduleRole.find((item) => item.module === module);

  // Dispatch chỉ thực hiện trong useEffect
  // useEffect(() => {
  //   if (item && item.role !== 'NONE') {
  //   }
  // }, [item, dispatch]);

  // Kiểm tra quyền và render giao diện
  if (!item || item?.role === 'NONE') {
    return (
      <MainCard>
        <h1>Bạn không có quyền truy cập</h1>
      </MainCard>
    );
  }
  dispatch(setRoleForModule(item));

  return <Outlet />;
};

export default NoPermission;
