import "./style.scss";
import { useContext, useEffect, useState } from "react";
import Search from "../../../components/Search/Search";
import { UserContext } from "../../../hooks/UserContextUser";

const HeaderAdmin = () => {
    const [user, setUser] = useState({});
    const userData = useContext(UserContext);
    useEffect(() => {
        setUser(userData);
    }, [userData]);
    return (
        <header className="header-admin">
            <h1 className="hello">Hello {user?.userName} 👋🏼,</h1>
            <div>
                <Search />
            </div>
        </header>
    );
};

export default HeaderAdmin;
