import {useEffect, useState} from "react";
import Spinner from "@/components/myCustomComponents/Spinner.jsx";
import {data, useParams} from "react-router-dom";
import fetchUser from "@/lib/utils/fetchUser.js";
import MasonryLayout from "@/components/layout/MasonryLayout.jsx";



function Feed(props) {

    const [isLoading, setIsLoading] = useState(true)

    const [posts, setPosts] = useState()

    const {category} = useParams()

    useEffect(() => {
        setIsLoading(true)

        fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${category}`).then(res => res.json())
            .then(data => {
                setPosts(data.posts)
                setIsLoading(false)
            })
    }, [category]);

    if (isLoading)
        return <Spinner message="我们正在加载今天的最新内容！" />

    if (posts.length === 0)
        return <div className={"h-screen flex justify-center items-center"}>赶紧做第一个发布此类帖子的人吧！</div>

    return (
        <MasonryLayout user={props.user} pins={posts}/>
    )
}

export default Feed;