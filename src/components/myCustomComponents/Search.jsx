import {useEffect, useState} from "react";
import Spinner from "@/components/myCustomComponents/Spinner.jsx";
import MasonryLayout from "@/components/layout/MasonryLayout.jsx";


function Search({ searchTerm, user }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm) {
                setLoading(true);
                fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/search`, {
                    method: "POST",
                    body: JSON.stringify({ title: searchTerm }),
                    headers: { "Content-Type": "application/json" },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setPosts(data.posts);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("错误:", error);
                        setLoading(false);
                    });
            } else {
                setPosts([]);
                setLoading(false);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <div>
            {loading && <Spinner message={"正在查找"} />}
            {posts?.length > 0 && <MasonryLayout pins={posts} user={user}/>}
            {posts?.length === 0 && searchTerm !== "" && !loading && (
                <div className={"mt-10 text-center text-xl"}>空空如也</div>
            )}
        </div>
    );
}

export default Search;