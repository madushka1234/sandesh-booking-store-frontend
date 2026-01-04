import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { backendApi } from "../../../api.ts";
import { getUserFromToken } from "../../auth/auth.ts";
import type { UserData } from "../../model/userData.ts";
// import { FaGoogle } from "react-icons/fa"; // Uncomment if using it in UI

type FormData = {
    email: string;
    password: string;
};

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>();
    const [message, setMessage] = useState("");

    const authenticateUser = async (data: FormData) => {
        try {
            const response = await backendApi.post('/auth/login', data);
            console.log("Backend response:", response.data);

            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const user: UserData = getUserFromToken(accessToken);

            localStorage.setItem('user', user.name);
            localStorage.setItem('role', user.role);


            if (user.role === 'customer' ) {
                alert("Login successful.");
                navigate("/");
            } else if (user.role === 'admin') {
                alert("Login successful.");
                navigate("/admin");
            }
        } catch (error) {
            console.error(error);
            setMessage("Login failed. Please check your credentials.");
        }
    };


    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center '>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Login</h2>

                <form onSubmit={handleSubmit(authenticateUser)} autoComplete="off">

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                        <input
                            {...register("email", {required: true})}
                            type="email"
                            id="email"
                            autoComplete="off"
                            placeholder='Email Address'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'
                               htmlFor="password">Password</label>
                        <input
                            {...register("password", {required: true})}
                            type="password"
                            id="password"
                            autoComplete="off"
                            placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                    </div>
                    {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}
                    <div>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>
                            Login
                        </button>
                    </div>
                </form>

                <p className='align-baseline font-medium mt-4 text-sm'>
                    Haven't an account? Please <Link to="/Register" className='text-blue-500 hover:text-blue-700'>Register</Link>
                </p>

                <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Pavithra Book Store. All rights reserved.</p>
            </div>
        </div>
    );
}
