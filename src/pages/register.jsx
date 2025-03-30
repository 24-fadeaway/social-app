import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast, Toaster} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.js";
import {Input} from "@/components/ui/input.js";
import {Button} from "@/components/ui/button.js";
import {z} from "zod";



const formSchema = z.object({
    email: z.string().email({message: "请输入正确的邮箱格式"}),
    password: z.string().min(5, {message: "密码需至少大于或等于5位"}),
    username: z.string().min(1, "用户名不可为空")
})

export default function Register() {

    const navigate = useNavigate();

    const  form = useForm({resolver: zodResolver(formSchema), defaultValues: {email: "", password: "", username: ""}});

    async function onSubmit(data) {

        const response = await fetch("http://localhost:3000/api/register", {
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
            toast.error(responseData.error)
        } else {
            toast.success(responseData.message)

            setTimeout(() => navigate("/", {replace: true}), 3000)
        }

    }

    return (
        <div className={"h-screen flex items-center justify-center"}>
        <Form {...form} className={"flex flex-col "}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4 flex flex-col items-center p-4 rounded-lg shadow-lg border-2 border-gray-300"}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className={""}>
                            <FormLabel className={"font-bold"}>邮箱</FormLabel>
                            <FormControl>
                                <Input placeholder="邮箱" {...field} className={"border-2 "} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className={""}>
                            <FormLabel className={"font-bold"}>密码</FormLabel>
                            <FormControl>
                                <Input placeholder="密码" {...field} className={"border-2 "}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={"username"}
                    render={({ field }) => (
                        <FormItem className={""}>
                            <FormLabel className={"font-bold"}>用户名</FormLabel>
                            <FormControl>
                                <Input placeholder={"用户名"} {...field} className={"border-2"}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                <Button type="submit">注册</Button>
            </form>
            <Toaster richColors/>
        </Form>
        </div>
    )

}