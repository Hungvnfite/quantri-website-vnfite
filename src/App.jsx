import { memo, useEffect } from 'react';
import { useCustomizationStore } from './hooks/customization';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createGlobalStyle } from 'styled-components';
import { useAuthenticationStore } from '~/hooks/authentication';
import styled from 'styled-components';
import { ConfigProvider } from 'antd';

// routing
import Routes from '~/routes';

// defaultTheme
import themes from '~/themes';

// project imports
import NavigationScroll from '~/layout/NavigationScroll';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { customizationState } = useCustomizationStore();
  const { authenticationState, dispatchInitApp } = useAuthenticationStore();
  useEffect(() => {
    if (authenticationState?.accessToken?.token && authenticationState?.refreshToken?.token) {
      dispatchInitApp({
        accessToken: authenticationState?.accessToken,
        refreshToken: authenticationState?.refreshToken
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customizationState)}>
        <ConfigProvider
          theme={{
            components: {
              Modal: {
                zIndexPopupBase: 10,
                zIndexBase: 10
              },
              Select: {
                zIndexPopupBase: 10000,
                zIndexBase: 10000,
                zIndexPopup: 10000
              }
            }
          }}
        >
          <CssBaseline />
          <NavigationScroll>
            <GlobalStyle />
            <Routes />
            <ToastContainerCustom />
          </NavigationScroll>
        </ConfigProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default memo(App);

const GlobalStyle = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;

  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;

    .ant-modal-root {
      z-index: 9999;
      position: relative;
    }

    .ant-select-dropdown{
      z-index: 9999;
    }

    .ant-picker-dropdown{
      z-index: 9999;
    }

    .ant-popover {
      z-index: 9999;
    }

    .mapboxgl-ctrl-logo {
      display: none;
    }

    .mapboxgl-compact {
      display: none;
    }

    .mapboxgl-ctrl-attrib {
      display: none;
    }

    #root {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;

      & > *:first-child {
        min-width: 100%;
      }
    }

    &::-webkit-scrollbar{
      background:transparent;
      height:8px;
      width:8px
    }

    &::-webkit-scrollbar-track{
      margin:3px 0
    }

    &::-webkit-scrollbar-thumb{
      border:none;
      box-shadow:none;
      background:#dadce0;
      border-radius:4px;
      min-height:40px
    }

    &:hover::-webkit-scrollbar-thumb,::-webkit-scrollbar-thumb:hover{
      background:#bdc1c6
    }

    *::-webkit-scrollbar-thumb:active{
      background:#9aa0a6
    }

    *::-webkit-scrollbar{
      background:transparent;
      height:8px;
      width:8px
    }

    *::-webkit-scrollbar-track{
      margin:3px 0
    }

    *::-webkit-scrollbar-thumb{
      border:none;
      box-shadow:none;
      background:#dadce0;
      border-radius:4px;
      min-height:40px
    }

    *:hover::-webkit-scrollbar-thumb,::-webkit-scrollbar-thumb:hover{
      background:#bdc1c6
    }

    *::-webkit-scrollbar-thumb:active{
      background:#9aa0a6
    }


  }
}
`;

const ToastContainerCustom = styled(ToastContainer)`
  z-index: 10000;
`;
