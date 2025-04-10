import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { useAuthenticationStore } from '~/hooks/authentication';
import { useCustomizationStore } from '~/hooks/customization';
import { useSelector } from 'react-redux';

// material-ui
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Modal, Form, Input, Button } from 'antd';

// third-party

// project imports
import MainCard from '~/ui-component/cards/MainCard';
import Transitions from '~/ui-component/extended/Transitions';

// assets
import { IconLogout, IconSettings } from '@tabler/icons';

const selectedIndex = -1;

const ProfileSection = () => {
  const theme = useTheme();
  const { customizationState } = useCustomizationStore();
  const { authenticationState, dispatchLogout, dispatchChangePassword } = useAuthenticationStore();

  const sessionId = useSelector((state) => state.authentication.userId);

  const [open, setOpen] = useState(false);

  const prevOpen = useRef(open);
  const anchorRef = useRef(null);

  const handleLogout = useCallback(() => {
    dispatchLogout();
  }, [dispatchLogout]);

  const handleClose = useCallback((event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }, []);

  const [form] = Form.useForm();
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
  const userId = useSelector((state) => state); // Giả sử userId được lưu trong state.user.id

  const handleChagePassword = useCallback((values) => {
    const { currentPassword, newPassword } = values;
    if (currentPassword === newPassword) {
      form.setFields([
        {
          name: 'newPassword',
          errors: ['Mật khẩu mới không được giống mật khẩu hiện tại!']
        }
      ]);
      return;
    }
    dispatchChangePassword({ currentPassword: currentPassword, newPassword: newPassword, sessionId: sessionId });
    form.resetFields();
    setOpenModalChangePassword(false);
  }, []);

  // const handleListItemClick = useCallback(
  //   (event, index, route = '') => {
  //     setSelectedIndex(index);
  //     handleClose(event);

  //     if (route && route !== '') {
  //       navigate(route);
  //     }
  //   },
  //   [handleClose, navigate]
  // );

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            // src={authenticationState?.loginInfo?.avatar}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 1 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="h4">Hello, {`${authenticationState?.loginInfo?.username}`}</Typography>
                      <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                        {authenticationState.loginInfo.name}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%'
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0.5
                        }
                      }}
                    >
                      <ListItemButton
                        sx={{ borderRadius: `${customizationState.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={() => setOpenModalChangePassword(true)}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Đổi mật khẩu</Typography>} />
                      </ListItemButton>

                      <ListItemButton
                        sx={{ borderRadius: `${customizationState.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Đăng xuất</Typography>} />
                      </ListItemButton>
                    </List>
                  </Box>
                  <Modal
                    title="Đổi mật khẩu"
                    open={openModalChangePassword}
                    onCancel={() => {
                      setOpenModalChangePassword(false);
                      form.resetFields();
                    }}
                    footer
                  >
                    <Form
                      form={form}
                      name="basic"
                      labelCol={{
                        span: 8
                      }}
                      wrapperCol={{
                        span: 16
                      }}
                      style={{
                        maxWidth: 600
                      }}
                      initialValues={{
                        remember: true
                      }}
                      onFinish={handleChagePassword}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Mật khẩu hiện tại"
                        name="currentPassword"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu hiện tại!'
                          },
                          {
                            pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ in hoa và ký tự đặc biệt!'
                          }
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item
                        label="Mật khẩu mới"
                        name="newPassword"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới!'
                          },
                          {
                            pattern: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ in hoa và ký tự đặc biệt!'
                          }
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Form.Item
                        wrapperCol={{
                          offset: 8,
                          span: 16
                        }}
                      >
                        <Button type="primary" htmlType="submit">
                          Đổi mật khẩu
                        </Button>
                      </Form.Item>
                    </Form>
                  </Modal>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default memo(ProfileSection);
