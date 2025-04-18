import { memo } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import { useCustomizationStore } from '~/hooks/customization';
import Logo from '~/ui-component/Logo';

const LogoSection = () => {
  const { customizationState, dispatchMenuOpen } = useCustomizationStore();
  return (
    <ButtonBase disableRipple onClick={() => dispatchMenuOpen(customizationState.defaultId)} component={Link} to="">
      <Logo />
    </ButtonBase>
  );
};

export default memo(LogoSection);
