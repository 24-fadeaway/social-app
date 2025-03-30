import {Link, useNavigate} from "react-router-dom";
import {IoMdAdd, IoMdSearch} from "react-icons/io";

function Navbar({searchTerm, setSearchTerm, user}) {
    const navigate = useNavigate();

    // if (!user)
    //     return null;


    return (
        <div className={"flex gap-2 md:gap-5  w-full mt-5"}>
            <div className={"flex justify-start items-center w-full px-2 " +
                "bg-white outline-none border-none focus-within:shadow-sm rounded-md"}>
                <IoMdSearch fontSize={21} className={"ml-1"}/>
                <input type={"text"} onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}
                       placeholder={"搜索"} value={searchTerm} onFocus={() => navigate("/home/search")}
                className={"p-2 w-full bg-white outline-none"}/>
            </div>
            <div className={"flex gap-3"}>
                <Link to={`/user-profile/${user?.id}`} className={"hidden md:block"}>
                    <img src={user.image} alt={"user"} className={"rounded-lg h-12 w-14"} />
                </Link>
                <Link to={`/home/create-pin`} className={"bg-black text-white rounded-lg w-12 h-12 " +
                    "md:w-14 md:h-12 items-center justify-center flex"}>
                    <IoMdAdd/>
                </Link>
            </div>
        </div>
    )
}

export default Navbar;