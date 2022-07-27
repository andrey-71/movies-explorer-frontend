import { Navigate } from 'react-router-dom';

function UnprotectedRoute(props) {
  return !props.isLogin ? props.children : <Navigate to='/movies' />;
}

export default UnprotectedRoute;