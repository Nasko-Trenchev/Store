import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { UserAuth } from '../../contexts/UserContext'

export const Logout = () => {

    const { signOutUser } = UserAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await signOutUser()
    }

    useEffect(() => {
        onLogout();
        navigate('/');
    }, [])

    return null;
}