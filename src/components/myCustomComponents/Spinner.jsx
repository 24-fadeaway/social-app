import {Circles} from "react-loader-spinner";

export default function Spinner({message}) {
    return (
        <div className={"flex flex-col justify-center items-center pt-6"}>
            <Circles
                color={"blue"}
                height={50}
                width={200}
            />

            <p className={"text-lg text-center px-2 m-5"}>{message}</p>
        </div>
    )
}