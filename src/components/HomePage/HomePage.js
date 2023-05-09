import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../contexts/UserContext';


export const HomePage = () => {

    const navigate = useNavigate();
    const { signOutUser } = UserAuth();

    const onLogout = async () => {
        await signOutUser();
    }

    return (
        <div>
            <h1>I`m home page</h1>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}