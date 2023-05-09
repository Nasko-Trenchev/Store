import { NavLink } from "react-router-dom";
import { UserAuth } from '../../contexts/UserContext'

import styles from './NavigationHeader.module.css'

export const NavigationHeader = () => {

    const { user } = UserAuth();

    return (
        <header className={styles["header"]}>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    {user ? <>
                        <li><NavLink to="/catalog">Catalog</NavLink></li>
                        <i>Hello {user.email}</i>
                        <li><NavLink to="/logout">Logout</NavLink></li>
                    </>
                        : <>
                            <li><NavLink to="/register">Register</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                        </>}
                </ul>
            </nav>
        </header>

    )
}