import { Navigate } from 'react-router-dom';

function ProtectedRoute(props) {
  return props.isLogin || localStorage.idUser ? props.children : <Navigate to='/' />;
}

export default ProtectedRoute;