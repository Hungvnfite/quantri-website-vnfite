import React from 'react';
import { Tooltip } from 'antd';

const CustomTooltip = ({ children, open }) => {
  if (open == true) {
    return <Tooltip title={'Bạn không có quyền sử dụng chức năng này'}>{children}</Tooltip>;
  } else {
    return children;
  }
};

export default CustomTooltip;
