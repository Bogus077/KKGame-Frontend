import TextField from '@mui/material/TextField';
import React, { useCallback } from 'react';
import styles from './AuthPage.module.scss';
import CallIcon from '@mui/icons-material/Call';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { FormikContext, useFormik } from 'formik';
import { loginInitialValues, loginValidationSchema } from './schema';
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material';
import { useLoginMutation } from '../../redux/KKApi';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../utils/router/routes';
import { DefaultError } from '../../models/API/API';

export const AuthPage = () => {
  const [triggerLogin, loginState] = useLoginMutation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  document.title = 'Авторизация | Гранит';

  const handleSubmit = useCallback(
    async (values: typeof loginInitialValues) => {
      try {
        await triggerLogin(values).unwrap();
        navigate(frontendRoutes.index);
      } catch (error) {
        const errorMessage =
          (error as DefaultError)?.data?.errorMessage ?? 'Ошибка сервера';
        enqueueSnackbar(`Ошибка входа: ${errorMessage}`, {
          variant: 'error',
        });
      }
    },
    [enqueueSnackbar, navigate, triggerLogin]
  );

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikContext.Provider value={formik}>
      <div className={styles.main}>
        <div className={styles.image} />
        <div className={styles.auth}>
          <div className={styles.header}>
            <span className={styles.header__text}>Добро пожаловать!</span>
          </div>
          <Grid container justifyContent="center" sx={{ mb: 4 }}>
            <Avatar
              alt="logo"
              src="/logo_middle.png"
              sx={{ width: 168, height: 200 }}
            />
          </Grid>
          <div className={styles.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  id="phone"
                  label="Номер телефона"
                  variant="outlined"
                  fullWidth
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.phone)}
                  helperText={formik.errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CallIcon />
                        <Typography sx={{ ml: 2 }}>+7</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  label="Пароль"
                  variant="outlined"
                  type="password"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.password)}
                  helperText={formik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={
                    loginState.isLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <LoginIcon />
                    )
                  }
                  size="large"
                  type="submit"
                  disabled={!formik.isValid || loginState.isLoading}
                  onClick={() => formik.handleSubmit()}
                >
                  Войти
                </Button>
              </Grid>
              <Grid item xs={12} container justifyContent="space-between">
                <Grid item>
                  <Button variant="text" fullWidth size="small">
                    Забыли пароль
                  </Button>
                </Grid>

                <Grid item title="Регистрация временно недоступна">
                  <Button variant="text" fullWidth size="small" disabled>
                    Регистрация
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </FormikContext.Provider>
  );
};
