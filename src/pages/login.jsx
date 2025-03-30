import logo from "../assets/logo.png"
import shareVideo from "../assets/share.mp4"
import LoginForm from "@/components/myCustomComponents/loginForm.jsx";
import {Link} from "react-router-dom";

function Login() {
    return (
        <div className={"flex flex-col justify-center items-center h-screen"}>
            <div className={"relative w-full h-full"}>
                <video src={shareVideo} type="video/mp4" loop muted controls={false}
                       autoPlay className={"w-full h-full object-cover"} />
                <div className={"absolute flex flex-col justify-center items-center" +
                    " top-0 left-0 backdrop-brightness-50 backdrop-blur-[4px] w-full h-full"}>
                    <img src={logo} alt="logo" className={"w-24 m-4"}/>
                    <LoginForm/>
                    <p className={"text-gray-500 mt-2 font-semibold"}>
                        没有账号？
                        <Link to={"/register"} className={"hover:underline text-white"}>注册一个</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login