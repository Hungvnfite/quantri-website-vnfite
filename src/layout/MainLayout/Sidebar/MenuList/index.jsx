import { memo, useEffect } from 'react';
// material-ui
import { useState } from 'react';
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from '~/menu-items';
import { useSelector } from 'react-redux';

const hiddenMenu = (moduleRoleState) => {
  const hiddenItems = [];
  for (const item of moduleRoleState) {
    if (item.role === 'NONE') {
      hiddenItems.push(item.module);
    }
    // else {
    //   if (item.children) {
    //     hiddenMenu(item.children);
    //   }
    // }
  }

  return hiddenItems;
};
// hiddenMenu([]);

// const removeHiddenItem = (data) => {
//   return data
//     .filter((item) => !hiddenItems.includes(item.id))
//     .map((item) => ({
//       ...item,
//       children: item.children ? removeHiddenItem(item.children) : []
//     }));
// };

// const listPage = removeHiddenItem(pages.children);

const MenuList = () => {
  // const [urlToKeyMap, setUrlToKeyMap] = useState({});
  const moduleRoles = useSelector((state) => state.authentication.loginInfo?.roles || []);
  const [menu, setMenu] = useState(menuItem);
  useEffect(() => {
    if (moduleRoles.length === 0) {
      return;
    }

    const hiddenIds = hiddenMenu(moduleRoles); // Lấy danh sách các id cần ẩn

    // Lọc lại menu trực tiếp và cập nhật state
    setMenu((prevMenu) => {
      const updatedItems = prevMenu.items.map((item, index) => {
        if (index === 1) {
          return {
            ...item,
            children: item.children.filter((i) => !hiddenIds.includes(i.id))
          };
        }
        return item;
      });

      return {
        ...prevMenu,
        items: updatedItems
      };
    });
  }, [moduleRoles]);

  const navItems = menu.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default memo(MenuList);
