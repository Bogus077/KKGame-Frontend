import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '../../redux';
import { isAuthorized } from '../../redux/authSlice';
import { frontendRoutes } from './routes';

export const ProtectedRoutes = () => {
  const isUserAuthorized = useTypedSelector(isAuthorized);

  return isUserAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to={frontendRoutes.user.login} />
  );
};
