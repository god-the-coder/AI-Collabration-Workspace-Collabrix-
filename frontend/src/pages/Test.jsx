import { login, register } from "../api/auth.api";

export default function Test() {

    const testLogin = async () => {
        try {
            // const data = {
            //     "username": "test0",
            //     "first_name": "test0",
            //     "last_name": "test0",
            //     "email": "test0@gmail.com",
            //     "password": "pass@1234",
            //     "confirm_password": "pass@1234",
            // }

            const resp = await profile()
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