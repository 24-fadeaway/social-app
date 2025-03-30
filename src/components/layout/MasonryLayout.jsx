import Masonry from "react-masonry-css"
import Pin from "@/components/myCustomComponents/Pin.jsx";



const breakpointObject = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1
}

function MasonryLayout({pins, user}) {

    return (
        <Masonry className={"flex animate-slide-fws"} breakpointCols={breakpointObject}>
            {pins?.map((pin) => <Pin key={pin._id} post={pin} user={user} className={"w-max"}/>)}
        </Masonry>
    )
}

export default MasonryLayout;