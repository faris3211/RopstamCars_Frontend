import { Navigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../../Services/localStorage';

function ProtectRoute({ children }) {
  const user = getUserFromLocalStorage();

  if (!user) {
    return <Navigate to='/' replace />;
  }

  return children;
}

export default ProtectRoute;
