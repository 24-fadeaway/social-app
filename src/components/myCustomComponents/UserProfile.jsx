import {useEffect, useState} from "react";
import {data, useNavigate, useParams} from "react-router-dom";
import Spinner from "@/components/myCustomComponents/Spinner.jsx";
import UserPosts from "@/components/myCustomComponents/userPosts.jsx";
import {Button} from "@/components/ui/button.js";

const randomImage = "https://picsum.photos/1200/1600";

const activeBtnStyles = "bg-red-500 mx-2 text-white font-bold p-2 rounded-full w-20 outline-none"
const notActiveBtnStyles = " mx-2 mr-4 text-black font-bold p-2 rounded-full w-20 outline-none"

function UserProfile() {

    const [user, setUser] = useState(null)
    const [savedPosts, setSavedPosts] = useState(null)
    const [postedPosts, setPostedPosts] = useState(null)
    const [text, setText] = useState("已创建")
    const [activeBtn, setActiveBtn] = useState("已创建")
    const navigate = useNavigate()
    const {userId} = useParams()

    function logout() {
        localStorage.clear()

        navigate("/")
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/usersPosts/${userId}`).then(res => res.json())
            .then(data => {
                setSavedPosts(data.savedPosts)
                setPostedPosts(data.postedPosts)
            })

        fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`).then(res => res.json())
            .then(data => setUser(data.user))
    }, []);


    if (!user || !savedPosts || !postedPosts)
        return <Spinner message={"正在加载用户信息"}/>

    return (
        <div className={"relative pb-2 h-full justify-center items-center"}>
            <div className={"flex flex-col pb-5"}>
                <div className={"relative flex flex-col mb-7"}>
                    <div className={"flex flex-col justify-center items-center"}>
                        <img src={randomImage} className={"w-full h-100  shadow-lg object-cover"}
                             alt={"banner-pic"}
                        />
                        <img src={user.image}
                             className={"rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"} alt={"user-image"}/>
                        <h1 className={"font-bold text-3xl text-center mt-3"}>{user.name}</h1>
                        <div className={"absolute top-0 z-1 right-0"}>
                            {userId === user._id && (
                                <div>
                                    <Button className={"m-3 font-semibold rounded-lg bg-red-500 p-3 cursor-pointer"} onClick={logout}>登出</Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={"text-center mb-7"}>
                        <button type={"button"} onClick={(e) => {
                            setText(e.target.textContent)
                            setActiveBtn("已创建")
                        }}
                            className={`${activeBtn === "已创建" ? `${activeBtnStyles}` : `${notActiveBtnStyles}`}`}
                        >
                            已发布
                        </button>
                        <button type={"button"} onClick={(e) => {
                            setText(e.target.textContent)
                            setActiveBtn("收藏")
                        }}
                                className={`${activeBtn === "收藏" ? `${activeBtnStyles}` : `${notActiveBtnStyles}`}`}
                        >
                            收藏
                        </button>
                    </div>
                    {activeBtn === "收藏" ? <UserPosts posts={savedPosts} user={user}/> : <UserPosts posts={postedPosts} user={user}/>}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;