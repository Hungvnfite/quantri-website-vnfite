import { memo } from 'react';
// material-ui
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from '~/assets/images/logo-dark.svg';
 * import logo from '~/assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //
import logo from '../assets/images/logo-vnfite-v2.png';
const Logo = () => {
  return <img src={logo} alt="Berry" width="180" />;
};

export default memo(Logo);
