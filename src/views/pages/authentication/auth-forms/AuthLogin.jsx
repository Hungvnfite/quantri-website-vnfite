import { memo, useCallback, useState } from 'react';

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack
  // Typography
} from '@mui/material';
import { Button as ButtonAntd } from 'antd';
import { useTheme } from '@mui/material/styles';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';
// project imports
import { useAuthenticationStore } from '~/hooks/authentication';

// import AnimateButton from '~/ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Local_Key } from '../../../../utils/CONSTANT';

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const { dispatchLogin } = useAuthenticationStore();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((value) => !value);
  }, []);

  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleSaveAccount = (data) => {
    if (data.checked) {
      localStorage.setItem(Local_Key.USER_NAME, data.username);
      localStorage.setItem(Local_Key.PASS_WORD, data.password);
      localStorage.setItem(Local_Key.SAVE_ACCOUNT, data.checked);
    } else {
      localStorage.clear();
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          username: localStorage.getItem(Local_Key.USER_NAME) || '',
          password: localStorage.getItem(Local_Key.PASS_WORD) || '',
          deviceId: '',
          submit: null,
          checked: localStorage.getItem(Local_Key.SAVE_ACCOUNT) || false
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().matches(/\S/, 'Tên người dùng không hợp lệ').max(255).required('Vui lòng nhập tên người dùng'),
          password: Yup.string().max(255).required('Vui lòng nhập mật khẩu')
        })}
        onSubmit={(values, { setErrors, setStatus }) => {
          const handleSubmit = async () => {
            try {
              handleSaveAccount(values);
              setLoading(true);
              dispatchLogin({
                username: values.username,
                password: values.password,
                deviceId: ''
              });
              setLoading(false);
            } catch (err) {
              console.error(err);
              setLoading(false);
              setStatus({ success: false });
              setErrors({ submit: err.message });
            }
          };

          handleSubmit();
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-login">Tên người dùng</InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-username-login"
                type="text"
                value={values.username}
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                label="username"
                inputProps={{}}
              />
              <FormHelperText
                error
                id="standard-weight-helper-text-username-login"
                style={{ visibility: touched.username && errors.username ? 'visible' : 'hidden', display: 'block' }}
              >
                {errors.username}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Mật khẩu</InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
                style={{ visibility: touched.password && errors.password ? 'visible' : 'hidden', display: 'block' }}
              >
                {errors.password}
              </FormHelperText>
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={<Checkbox checked={Boolean(values.checked)} onChange={handleChange} name="checked" color="error" />}
                label="Ghi nhớ mật khẩu"
              />
            </Stack>
            <Box sx={{ mt: 3, visibility: errors.submit ? 'visible' : 'hidden' }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>

            <Box sx={{ mt: 2 }}>
              <ButtonAntd
                // type="primary"
                htmlType="submit"
                loading={loading}
                iconPosition={'start'}
                size="large"
                color="danger"
                variant="solid"
                style={{ width: '100%', backgroundColor: '#DC2626', color: 'white', borderRadius: 12 }}
              >
                {
                  loading ? 'Đang xử lý...' : 'Đăng nhập' // Thay bằng spinner nếu cần isSubmitting
                }
              </ButtonAntd>
              {/* <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  color: 'white',
                  backgroundColor: isSubmitting ? '#c46c6c' : '#DC2626',
                  borderRadius: 12,
                  '&:hover': {
                    backgroundColor: isSubmitting ? '#c46c6c' : '#B91C1C' // Màu khi hover
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#c46c6c', // Màu khi disabled
                    color: '#ffffff'
                  }
                }}
              >
                {
                  isSubmitting ? 'Đang xử lý...' : 'Đăng nhập' // Thay bằng spinner nếu cần isSubmitting
                }
              </Button> */}
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default memo(FirebaseLogin);
