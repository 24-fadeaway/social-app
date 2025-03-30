import { useState } from 'react';
import LoginContext from "@/context/loginContext.js";


function LoginProvider  ({ children })  {
    const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true");

    const login = () => {
        setIsLogin(true);
    };

    const logout = () => {
        setIsLogin(false);
    };

    const value = {
        isLogin,
        login,
        logout,
    };

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;