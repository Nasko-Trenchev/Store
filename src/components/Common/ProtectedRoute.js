import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../contexts/UserContext';

export const ProtectedRoute = ({ children }) => {

    const { user } = UserAuth();

    if (!user) {
        return <Navigate to='/login'></Navigate>
    }
    return children;
}