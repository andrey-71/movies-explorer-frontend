import { Navigate } from 'react-router-dom';

function ProtectedRoute(props) {
  return props.isLogin ? props.children : <Navigate to='/' />;
}

export default ProtectedRoute;