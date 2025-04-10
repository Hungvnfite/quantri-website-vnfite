import { memo } from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// import
// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';
import { Button } from 'antd';
// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 }
};

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
      },
      darkTitle,
      secondary,
      shadow,
      sx = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      },
      title,
      canGoBack,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const onGoBack = () => {
      navigate(-1);
    };
    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {/* card header and action */}
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 12 }}>
            {canGoBack && (
              <div style={{ cursor: 'pointer', alignItems: 'center' }}>
                <Button onClick={onGoBack} danger type="Text">
                  <ArrowBackIcon />
                </Button>
              </div>
            )}
            <CardHeader sx={headerSX} title={darkTitle ? <Typography variant="h3">{title}</Typography> : title} action={secondary} />
          </div>
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass} style={{ overflow: 'auto', height: '100%' }}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default memo(MainCard);
