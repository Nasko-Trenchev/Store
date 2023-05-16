import { NavLink } from "react-router-dom";
import { UserAuth } from '../../contexts/UserContext'

import styles from './NavigationHeader.module.css'

export const NavigationHeader = () => {

    const { user } = UserAuth();

    return (
        <header className={styles["navHeader"]}>
            <nav className={styles["navigationHeader"]}>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <input type="search" placeholder="Search for your product..." />
                    <button className={styles["button-32"]}>Search</button>
                    {user ? <>
                        <li><NavLink to="/catalog">Catalog</NavLink></li>
                        <i>Hello {user.email}</i>
                        <li><NavLink to="/logout">Logout</NavLink></li>
                    </>
                        : <>
                            <li><NavLink to="/register">Register</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                        </>}
                        <li><NavLink to="/">Cart</NavLink></li>

                </ul>
            </nav>
        </header>

    )
}