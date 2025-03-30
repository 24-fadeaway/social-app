import { createContext } from "react";

const LoginContext = createContext({
    isLogin: 0,
    login: () => {},
    logout: () => {}
})

export default LoginContext;