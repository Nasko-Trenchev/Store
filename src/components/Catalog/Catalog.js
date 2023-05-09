import { UserAuth } from "../../contexts/UserContext"

export const Catalog = () => {

    const { user } = UserAuth();
    return (
        <>
            <div>This is catalog page</div>
            <div>{user.email}</div>
        </>
    )
}