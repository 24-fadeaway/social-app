import MasonryLayout from "@/components/layout/MasonryLayout.jsx";
import {Fragment} from "react";

export default function UserPosts(props) {
    const {posts} = props;
    const {user} = props;

    return (
        <Fragment>
        {
            posts?.length ? (
            <div className={"px-2"}>
                <MasonryLayout pins={posts} user={user}/>
            </div>
        ) : (
            <div className={"flex justify-center font-bold"}>
                空空如也
            </div>
        )
        }
        </Fragment>
    )
}