import { z } from "zod"
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.js";
import {FormControl, FormField, FormItem, FormLabel, FormMessage, Form} from "@/components/ui/form.js";
import {Button} from "@/components/ui/button.js";
import {zodResolver} from "@hookform/resolvers/zod";
import {useContext} from "react";
import LoginContext from "@/context/loginContext.js";
import {redirect, replace, useNavigate} from "react-router-dom";
import {toast, Toaster} from "sonner";


const formSchema = z.object({
    email: z.string().email({message: "请输入正确的邮箱格式"}),
    password: z.string().min(1, {message: "密码为空"})
})




function LoginForm() {
    const context = useContext(LoginContext);

    const navigate = useNavigate();

    const  form = useForm({resolver: zodResolver(formSchema), defaultValues: {email: "", password: ""}});

    async function onSubmit(data) {

        const response = await fetch("http://localhost:3000/api/authentication/login", {
            method: "POST",
            body: JSON.stringify({
                ...data,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const responseData = await response.json()

        if (!response.ok) {
            console.log(responseData.error ?? "错误")
            toast.error(responseData.error)
        } else {
            localStorage.setItem("userId", JSON.stringify(responseData.userInfo.id.replaceAll('"', "")));
            localStorage.setItem("isLogin", "true");
            context.login()
            navigate("/home", {replace: true})
        }

    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4 w-50 flex flex-col  items-center"}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"text-white"}>邮箱</FormLabel>
                            <FormControl>
                                <Input placeholder="邮箱" {...field} className={"border-2 text-white"} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"text-white"}>密码</FormLabel>
                            <FormControl>
                                <Input placeholder="密码" {...field} className={"border-2 text-white"}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">登录</Button>
            </form>
            <Toaster richColors/>
        </Form>
    )


}

export default LoginForm



