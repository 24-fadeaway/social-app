import logo from "@/assets/logo.png";
import {Link, NavLink} from "react-router-dom";
import {RiHomeFill} from "react-icons/ri";
import {categories} from "@/lib/utils/data.js";


const isNotActiveStyle = "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle = "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";


function Sidebar({user, closeToggle}) {
    function handleCloseSidebar() {
        if (closeToggle)
            closeToggle()
    }



    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-50 hide-scrollbar">
            <div className={"flex flex-col"}>
                <Link to="/" className={"flex px-5 gap-2 my-6 pt-1 w-50 items-center"} onClick={handleCloseSidebar}>
                    <img src={logo} alt="logo" className={"w-full"}/>
                </Link>
                <div className={"flex flex-col gap-5"}>
                    <NavLink to="/home" end className={(isActive) => isActive.isActive ? isActiveStyle : isNotActiveStyle}>
                        <RiHomeFill/>
                        主页
                    </NavLink>
                    <h3 className={"mt-2 px-5 text-base 2xl:text-xl"}>探索分类</h3>
                    {categories.slice(0, categories.length - 1).map(category => {
                        return (<NavLink to={`/home/category/${category.enName}`} onClick={handleCloseSidebar} key={category.name}
                                         className={(isActive) => isActive.isActive ? isActiveStyle : isNotActiveStyle }>
                            <img src={category.image} alt="category" className={"w-8 h-8 rounded-full shadow-sm"}/>
                            {category.name}
                        </NavLink>)
                    })}
                </div>
            </div>
            {user && (
                <Link to={`/home/user-profile/${user._id}`} className={"flex my-5 mb-3 gap-2 p-2 bg-white " +
                    "items-center rounded-lg shadow-lg mx-3"} onClick={handleCloseSidebar}>
                    <img src={user.image} className={"w-10 h-10 rounded-full"} alt={"user-profile"} />
                    <p>{user.name}</p>
                </Link>
            )}
        </div>
    )
}

export default Sidebar;