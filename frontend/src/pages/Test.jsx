import { login, register } from "../api/auth.api";

export default function Test() {

    const testLogin = async () => {
        try {
            const data = {
                "password": "sample@1234",
                "email": "sample98@gmail.com"
            }

            const resp = await login(data)
            console.log(resp.data);
        }
        catch {

            console.log("api not working");

        }
    }


    return (
        <button onClick={testLogin}>
            test login
        </button>
    );
}