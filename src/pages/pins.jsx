import logo from "../assets/logo.png"
import {useState} from "react";
import Navbar from "@/components/myCustomComponents/Navbar.jsx";
import {Routes, Route} from "react-router-dom";
import Feed from "@/components/myCustomComponents/Feed.jsx";
import PinDetail from "@/components/myCustomComponents/PinDetail.jsx";
import CreatePin from "@/components/myCustomComponents/CreatePin.jsx";
import Search from "@/components/myCustomComponents/Search.jsx";


function Pins(props) {
    const [searchTerm, setSearchTerm] = useState("")



    return (
       <div className={"px-2 md:px-5"}>
           <div className={"bg-gray-50"}>
               <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={props.user} />
           </div>
           <div className={"h-full"}>
               <Routes>
                   <Route path={""} element={<Feed user={props.user}/>}/>
                   <Route path={"category/:category"} element={<Feed user={props.user} />}/>
                   <Route path={"pin-detail/:pinId"} element={<PinDetail user={props.user} />}/>
                   <Route path={"create-pin"} element={<CreatePin user={props.user} />}/>
                   <Route path={"search"} element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={props.user} />}/>
               </Routes>
           </div>
       </div>
    )
}





export default Pins;