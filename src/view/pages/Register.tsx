import React from "react";
import { useForm } from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import { backendApi } from "../../../api";

type RegisterFormData = {
    name: string;
    email: string;
    password: string;
    role: string;
};

const Register: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await backendApi.post("auth/register", {
                ...data,
                role: "customer", // Force role as customer
            });


            if (response.status === 201) {
                alert("Registration successful!");
                navigate("/");
            } else {
                alert("Registration failed!");
            }
        } catch (error: any) {
            console.error(error);
            console.log(error.response.data);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="h-[calc(100vh-120px)] flex justify-center items-center">
            <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4">Please Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            type="text"
                            id="name"
                            placeholder="Your Full Name"
                            className="shadow appearance-none border rounded w-full py-2 px-3"
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            className="shadow appearance-none border rounded w-full py-2 px-3"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="shadow appearance-none border rounded w-full py-2 px-3"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded cursor-pointer"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        Login
                    </Link>
                </p>

                <p className="mt-5 text-center text-gray-500 text-xs">
                    ©2025 Book Store. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Register;
