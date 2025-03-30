import {useEffect, useState} from "react";
import {data, Link, useParams} from "react-router-dom";
import Spinner from "@/components/myCustomComponents/Spinner.jsx";
import {MdDownloadForOffline} from "react-icons/md";
import {toast} from "sonner";

function PinDetail(props) {
    const {user} = props
    const postId = useParams().pinId;

    const [pinDetail, setPinDetail] = useState(null)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState(null)
    const [addingComment, setAddingComment] = useState(false)

    async function addComment() {
        setAddingComment(true)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/editComments`, {
            method: "POST",
            body: JSON.stringify({
                content: comment,
                userId: user?._id?.replaceAll('"', ""),
                postId: postId?.replaceAll('"', ""),
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok)
            toast.error("评论失败")

        setAddingComment(false)
        setComment("")
    }

    useEffect(() => {

        fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/details/${postId?.replaceAll('"', "")}`).then((res) => res.json())
            .then(data => setPinDetail({...data.postDetail}))
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/comments/${postId?.replaceAll('"', "")}`).then((res) => res.json())
            .then(data => setComments(data.comments))
    }, [addingComment]);

    if (!pinDetail || !comments)
        return <Spinner message={"稍等一下"}/>

    return (
        <div className={"flex lg:flex-row flex-col m-auto mt-3 bg-white min-h-screen"} style={{maxWidth:"1500px", borderRadius:"32px"}} >
            <div className={"flex justify-center flex-1 items-center"}>
                <img src={pinDetail?.image}
                     className={"rounded-3xl"}
                     alt={"user-post"}/>
            </div>
            <div className={"w-full p-5 flex-1"}>
                <div className={"flex justify-between items-center"}>
                    <div className={"flex gap-2 items-center"}>
                        <a
                            href={`m`} download
                            onClick={(e) => e.stopPropagation()}
                            className={"bg-white w-9 h-9 justify-center items-center text-xl opacity-75 " +
                                "hover:opacity-100 hover:shadow-md outline-none flex rounded-md"}>
                            <MdDownloadForOffline/>
                        </a>
                    </div>
                </div>
                <div>
                    <h1 className={"text-4xl font-bold break-words mt-3"}>{pinDetail?.title}</h1>
                    <p className={"mt-3"}>{pinDetail?.about}</p>
                </div>
                <Link to={`/home/user-profile/${pinDetail?.userId}`} className={"flex gap-2 items-center mt-5 bg-white rounded-lg"}>
                    <img className={"w-8 h-8 rounded-full object-cover"} src={user?.image} alt={"user-profile"} />
                    <p className={"font-semibold"}>{user?.name}</p>
                </Link>
                <h2 className={"mt-5 text-2xl"}>评论</h2>
                <div className={"max-h-370 overflow-y-auto"}>
                    {comments?.map(comment => (
                        <div className={"flex gap-2 items-center mt-5 bg-white rounded-lg"} key={comment._id}>
                            <img src={comment.userImage} alt={"user-profile"} className={"w-10 h-10 cursor-pointer rounded-full"}/>
                            <div className={"flex flex-col"}>
                                <p className={"font-bold"}>{comment?.userName}</p>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={"flex flex-wrap mt-6 gap-3"}>
                    <Link to={`user-profile/${pinDetail?.userId}`}>
                        <img className={"w-10 h-10 rounded-full cursor-pointer"} src={user?.image} alt={"user-profile"} />
                    </Link>
                    <input
                        className={"flex-1 border-gray-100 outline-none border-2 px-2 rounded-2xl  focus:border-gray-300"}
                        type={"text"} placeholder={"分享一下你的评论吧"}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button type={"button"}
                            className={"bg-red-500 text-white rounded-full px-6 font-semibold py-2 outline-none"}
                            onClick={addComment}
                    >
                        {addingComment ? "发送中..." : "发送"}
                    </button>
                </div>
            </div>
        </div>
    )

}

export default PinDetail