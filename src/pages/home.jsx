import Sidebar from "../components/myCustomComponents/Sidebar.jsx";
import {HiMenu} from "react-icons/hi"
import {useContext, useEffect, useRef, useState} from "react";
import {Link, Navigate, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png"
import {AiFillAlipayCircle, AiFillCloseCircle} from "react-icons/ai";
import UserProfile from "@/components/myCustomComponents/UserProfile.jsx";
import Pins from "@/pages/pins.jsx";
import Spinner from "@/components/myCustomComponents/Spinner.jsx";
import LoginContext from "@/context/loginContext.js";


function Home() {
    const context = useContext(LoginContext);

    if (!context.isLogin)
        return <Navigate to="/" replace />;

    const [toggleSidebar, setToggleSidebar] = useState(false);

    const [isLoading, setIsLoading] = useState(true)

    const scrollRef = useRef(null);

    const [user, setUser] = useState(null);

    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId.replaceAll('"', "")}`)
        .then(res => res.json()).then(data =>{
            setUser({...data.user})
        }).then(() => setIsLoading(false))
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo(0, 0);
        }
    }, [scrollRef.current])


    if(isLoading || !user)
        return <Spinner />

    return (
        <div className={"flex bg-gray-50 md:flex-row flex-col h-screen duration-75 ease-out"}>
            <div className={"hidden md:flex h-screen flex-initial"}>
                <Sidebar user={user ?? false} closeToggle={setToggleSidebar}/>
            </div>
            <div className={"flex md:hidden flex-row"}>
                <div className={"p-2 w-full flex flex-row items-center shadow-md justify-between"}>
                    <HiMenu fontSize={40} className={"cursor-pointer"} onClick={() => {setToggleSidebar(true)}}/>
                    <Link to={"/"}>
                        <img src={logo} alt={"logo"} className={"w-28"}/>
                    </Link>
                    <Link to={`user-profile/${user?.id}`}>
                        <img src={logo} alt={"logo"} className={"w-28"}/>
                    </Link>
                    <div className={`fixed top-0 left-0 w-4/5 h-screen bg-white overflow-y-auto shadow-md z-20 transform
                transition-transform duration-300 ease-in-out ${
                        toggleSidebar ? "translate-x-0" : "-translate-x-full"}`}>
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle
                                fontSize={30}
                                className="cursor-pointer"
                                onClick={() => setToggleSidebar(false)}
                            />
                        </div>
                        <Sidebar user={user ?? false} closeToggle={setToggleSidebar} />
                    </div>
                </div>
            </div>
            {toggleSidebar && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
                    onClick={() => setToggleSidebar(false)}>
                </div>
            )}
            <div className={"pb-2 flex-1 h-screen overflow-y-scroll"} ref={scrollRef}>
                <Routes>
                    <Route path="/*" element={<Pins user={user?? false}/>} />
                    <Route path="/user-profile/:userId" element={<UserProfile />} />
                </Routes>
            </div>
        </div>
    )
}




export default Home;