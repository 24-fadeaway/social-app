export default async function fetchUser(id) {

    id = id.replaceAll('"', '')

    fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`)

    const response = await fetch(`http://localhost:3000/api/users/${id}`);

    const responseData = await response.json()

    if (!response.ok) {
        console.log(responseData.error ?? "错误")
    } else {
        return responseData?.user;
    }

}