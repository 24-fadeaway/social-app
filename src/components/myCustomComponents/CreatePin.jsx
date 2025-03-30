import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Spinner from "@/components/myCustomComponents/Spinner.jsx";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import {toast, Toaster} from "sonner";
import readFileAsBase64 from "@/lib/utils/readFileAsBase64.js";
import {categories} from "@/lib/utils/data.js";


function CreatePin(props) {
    const {user} = props;
    const [category, setCategory] = useState("")
    const [title, setTitle] = useState("")
    const [fields, setFields] = useState(false)
    const [about, setAbout] = useState("")
    const [loading, setLoading] = useState(false)
    const [destination, setDestination] = useState("")
    const [imageAsset, setImageAsset] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [imageFile, setImageFile] = useState(null)

    const navigate = useNavigate();

    function uploadImage(e) {
        e.preventDefault();

        const file = e.target.files[0];

        if (file.type === "image/jpeg" || file.type === "image/png") {
            setLoading(true)

            const url = URL.createObjectURL(file);
            setImageUrl(url)
            setImageAsset(true)
            setImageFile(file)

            setLoading(false)
        }
        else {
            toast.error("请上传正确格式的图片")
            e.target.value = null
        }

    }

    async function savePin(e) {
        e.preventDefault();

        if (title && about && imageAsset && category){

            const base64 = await readFileAsBase64(imageFile)

            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/editPosts`, {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    about: about,
                    userId: user?._id.replaceAll('"', ""),
                    category: category,
                    image: base64
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!res.ok) {
                console.log(res?.error ?? "上传失败")
            }else {
                console.log(await res.json())
                navigate("/home")
            }
        }
        else {
            setFields(true)
            setTimeout(() => setFields(false), 2000)
        }
    }

    return (
        <div className={"flex flex-col justify-center items-center mt-5 lg:h-4/5 "}>
            {fields && (
                <p className={"text-red-500 mb-5 text-xl transition-all duration-150 ease-in"}>请填入帖子所需要的全部信息</p>
            )}
            <div className={"flex flex-col justify-center items-center bg-white lg:p-5 p-3 w-full lg:w-4/5"}>
                <div className={"bg-secondary p-3 flex flex-0.7 w-full"}>
                    <div className={"flex justify-center items-center flex-col border-2 border-gray-300 border-dotted w-full p-3 h-100"}>
                        {loading && <Spinner/>}
                        {!imageAsset ? (
                            <label>
                                <div className={"flex flex-col justify-center items-center h-full"}>
                                    <div className={"flex flex-col justify-center items-center"}>
                                        <p className={"font-bold text-2xl"}>
                                            <AiOutlineCloudUpload/>
                                        </p>
                                        <p className={"text-lg"}>上传图片</p>
                                    </div>
                                    <p className={"mt-32 text-gray-400"}>
                                        请上传JPG, SVG, PNG, GIF, TIFF格式的图片
                                    </p>
                                </div>
                                <input type={"file"} name={"upload-image"} onChange={uploadImage} className={"w-0 h-0"}/>
                            </label>
                        ) : (
                            <div className={"relative h-full"}>
                                <img src={imageUrl} className={"h-full w-full"} alt={"preview image"} />
                                <button
                                    type="button"
                                    className={"absolute bg-red-500 bottom-3 right-3 p-3 rounded-full text-xl outline-none transition-all cursor-pointer hover:shadow-md duration-500 ease-in-out"}
                                    onClick={() => setImageAsset(null)}
                                >
                                    <MdDelete/>
                                </button>
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className={"flex flex-col flex-1 gap-6 lg:pl-5 mt-5 w-full"}>
                    <input
                        type={"text"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={"标题"}
                        className={"outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"}
                    />
                    {
                        user && (
                            <div className={"flex gap-2 items-center bg-white rounded-lg"}>
                                <img
                                    src={user?.image}
                                    className={"w-10 h-10 rounded-full"}
                                    alt={"user-profile"}/>
                                <p className={"font-bold"}>{user.name}</p>
                            </div>
                        )
                    }
                    <input
                        type={"text"}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder={"今天发生了什么？"}
                        className={"outline-none text-base sm:text-lg font-bold border-b-2 border-gray-200 p-2"}
                    />
                    <div className={"flex flex-col"}>
                        <div>
                            <p className={"mb-2 font-semibold text-lg sm:text-xl"}>
                                选择一个分区
                            </p>
                            <select onChange={(e) => setCategory(e.target.value)}
                                    className={"outline-none w-4/5 text-base border-b-2 border-gray-200 rounded-md p-2 cursor-pointer"}
                            >
                                <option className={"bg-white"} value="others">选择分类</option>
                                {categories?.slice(0, categories.length - 1).map(category => {
                                    return (
                                        <option key={category.name} value={category.enName}>{category.name}</option>
                                    )
                                })}
                            </select>
                            <div className={"flex justify-end items-end mt-5"}>
                                <button type={"button"}
                                        onClick={savePin}
                                        className={"bg-red-500 text-white font-bold w-20 rounded-full outline-none"}
                                >
                                    分享
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster richColors />
        </div>
    )
}

export default CreatePin;