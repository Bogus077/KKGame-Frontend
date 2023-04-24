import React from 'react';
import './assets/fonts/style.css';
import './assets/global.scss';

import { Provider } from 'react-redux';
import { createStore } from './redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ProtectedRoutes } from './utils/router/ProtectedRoutes';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { frontendRoutes } from './utils/router/routes';
import { ru } from 'date-fns/locale';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AuthPage } from './pages';
import { SnackbarProvider } from 'notistack';

const store = createStore(); // Possible additional params to store init func
const persistor = persistStore(store);

export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            <BrowserRouter>
              <Routes>
                <Route path={'/'} element={<AuthPage />} />

                <Route
                  path={frontendRoutes.user.login}
                  element={<AuthPage />}
                />

                <Route element={<ProtectedRoutes />}>
                  {/* <Route
                    path={frontendRoutes.index}
                    element={<DashboardPage />}
                  /> */}
                </Route>
              </Routes>
            </BrowserRouter>
          </SnackbarProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}
