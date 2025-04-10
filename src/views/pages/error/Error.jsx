import MainCard from '../../../ui-component/cards/MainCard';
// import MainCard from '../../../ui-component/cards/MainCard';
import IconErrorPage from '../../../assets/svg/error_page_icon.svg';

const ErrorPage = () => {
  return (
    // <MainLayout>

    <MainCard>
      <div className="flex items-center justify-center flex-col mt-44" style={{ margin: 'auto' }}>
        <img src={IconErrorPage} alt="123" />
        <h1 className="text-3xl font-bold text-black mt-8 tikluy-font">Hệ thống đang bảo trì</h1>
      </div>
    </MainCard>
    //  </MainLayout>
  );
};
export default ErrorPage;
