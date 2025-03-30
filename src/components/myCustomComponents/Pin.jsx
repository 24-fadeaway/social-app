import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {MdDownloadForOffline} from "react-icons/md";
import logo from "../../assets/logo.png"
import {BsFillArrowUpRightCircleFill} from "react-icons/bs";
import {AiTwotoneDelete} from "react-icons/ai";


export default function Pin(props) {
    const [postHovered, setPostHovered] = useState(false)

    const navigate = useNavigate()

    const {post, user} = props

    const [isSaved, setIsSaved] = useState(user?.savedPostsId?.includes(post?._id))

    async function savePin(save) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/savedPosts`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user?._id,
                    savedPostId: post?._id,
                    save: save
                })
            })

            if (!response.ok) {
                throw new Error(response.error ?? "保存失败")
            }

            setIsSaved(save)

        } catch (error) {
            console.error("保存出错:", error);
        }
    }

    async function deletePin() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/editPosts`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({postId: post?._id?.replaceAll('"', "")})
            })

            if (!res.ok) {
                throw new Error(response.error ?? "删除失败")
            }
        } catch (e){
            console.error(e)
        }
    }

    return (
        <div className={"m-2 flex flex-col"}>
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/home/pin-detail/${post?._id?.toString()}`)}
                className={"flex justify-center relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden duration-500 ease-in-out transition-all"}>

                <img className={"rounded-lg"} alt={"user-post"} src={post.image}/>
                {postHovered && (
                    <div className={"absolute top-0 w-full flex flex-col h-full justify-between p-1 pb-2 z-50 pr-2"}
                         style={{height:'100%'}}>
                        <div className={"flex items-center justify-between"}>
                            <div className={"flex gap-2"}>
                                <a
                                   href={`m`} download
                                   onClick={(e) => e.stopPropagation()}
                                   className={"bg-white w-9 h-9 justify-center items-center text-xl opacity-75 " +
                                       "hover:opacity-100 hover:shadow-md outline-none flex rounded-md"}>
                                    <MdDownloadForOffline/>
                                </a>
                            </div>
                            {
                                isSaved ?
                                <button
                                    type={"button"}
                                    className={"bg-red-500 opacity-70 hover:opacity-100 " +
                                    "text-white font-bold px-5 py-1 rounded-3xl hover:outline-none"}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        savePin(false)
                                    }}>已保存</button> :
                                <button
                                    type={"button"}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        savePin(true)
                                    }}
                                    className={"bg-red-500 opacity-70 hover:opacity-100 " +
                                    "text-white font-bold px-5 py-1 rounded-3xl hover:outline-none"}>保存</button>
                            }
                        </div>
                        <div className={"flex justify-end items-center gap-2 w-full"}>
                            {/*{*/}
                            {/*    destination && (*/}
                            {/*        <a href={destination} target={"_blank"} rel={"noreferrer"}*/}
                            {/*           className={"bg-white flex items-center gap-2 p-2 font-bold pr-4 rounded-full hover:100 hover:shadow-md pl-4"}>*/}
                            {/*            <BsFillArrowUpRightCircleFill/>*/}
                            {/*            {destination.length > 20 ? destination.slice(8, 20) : destination}*/}
                            {/*        </a>*/}
                            {/*    )*/}
                            {/*}*/}
                            {post?.userId === user._id && (
                                <button className={"bg-white p-2 opacity-70 hover:opacity-100 " +
                                    "font-bold text-dark rounded-3xl hover:outline-none"}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deletePin()
                                        }}>
                                    <AiTwotoneDelete/>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link to={`user-profile/${user?._id}`} className={"flex gap-2 mt-2 items-center"}>
                <img
                    className={"w-8 h-8 rounded-full object-cover"}
                    src={logo}
                    alt={"user-profile"}
                />
                <p className={"font-semibold capitalize"}>{user?.name}</p>
            </Link>
        </div>
    )
}