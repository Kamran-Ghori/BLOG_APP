import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authentication from "../appwrite/auth"
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {login as authlogin } from "../context/auth"
import Button from "./button";
import Input from "./input";
import Logo from "./logo";

export default function SignUp(){
    const {register,handleSubmit} =useForm();
    const [error,seterror]=useState("");
    const navigation=useNavigate();
    const dispatched=useDispatch();

    const login_submit=async ()=>{
        console.log(`aya`);
        try{
            const result=await authentication.login_google();
           
        }catch(error){
            console.log(`login fails`);
        }
        return;
    }

    const sign_up = async (data) => {
    seterror("");
    try {
        const result = await authentication.signup({...data});
        if (result) {
            const user_data_ = await authentication.get_curr_user();
            if (user_data_) {
                
                dispatched(authlogin(user_data_));
                navigation("/");
            }
        }
    } catch (error) {
        if (error?.type === "user_already_exists") {
            seterror("An account with this email already exists.");
        } else if (error?.type === "password_personal_data" || error?.message?.toLowerCase().includes("password")) {
            seterror("Password must be at least 8 characters and not too common.");
        } else {
            seterror(error?.message || "Something went wrong. Please try again.");
        }
    }
};
return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                     <span className="flex w-full  justify-center">
                                            <Logo width="100%" />
                                        </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
<form onSubmit={handleSubmit(sign_up)}>
    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
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
                        minLength:8,
                    })}
                        />

                         <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                        <div>
                         
                        </div>
                           </div>
                </form>
              
                 <Button   type="submit" onClick={login_submit} className="w-full flex justify-center-safe gap-10" >
                               <img className="h-5 w-7 "  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJKueq1tsHBNK-60iE4zuAMN8scsdu8Uy4ak9C7_S0nQ&s=10"></img>
                        
                            Continue with Google
                        </Button>
                       
            </div>

    </div>

)}