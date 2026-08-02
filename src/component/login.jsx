import React from "react";
import authentication from '../appwrite/auth'
import {useDispatch} from 'react-redux'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {login as authlogin} from '../context/auth'
import Logo from '../component/logo'
import { useState } from "react";
import Input from './input'
import Select from './select'
import Button from './button'
import { useSelector } from "react-redux";
export default function Login(){

    const [error,seterror]=useState("");
    const {register,handleSubmit } =useForm();
    const navigation = useNavigate();
    const dispatched = useDispatch();


const login_ = async (data) => {
    seterror("");

    try {
        await authentication.login(data);

        const user = await authentication.get_curr_user();

        if (user) {
            dispatched(authlogin(user));
            navigation("/");
        }

    } catch (error) {

        if (error.type === "user_session_already_exists") {

            const user = await authentication.get_curr_user();

            if (user) {
                dispatched(authlogin(user));
                navigation("/");
            }

            return;
        }

        seterror("Invalid email or password");
    }
}

return ( 

 <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="flex w-full  justify-center">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login_)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}