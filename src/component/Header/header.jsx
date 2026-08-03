import React from "react";
import Container from "../container/container";
import Logout_btn from "./logout_btn";
import Logo from "../logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header(){

    const user_login=useSelector((state)=>state.Auth.status);
    console.log(user_login);
    const navigation = useNavigate();
    const nav_items=[
        {
            name:"Home",
            url:"/",
            active:true,
        },
        {
            name:"Login",
            url:"/login",
            active:!user_login,
        },
        {
            name:"Signup",
            url:"/signup",
            active:!user_login,
        },
        {
            name:"My Posts",
            url:"/my-posts",
            active:user_login,
        },
        {
            name:"Add Post",
            url:"/add-post",
            active:user_login,
        },
    ]


    return (
        <header className="py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 transition-all">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to="/">
                        <Logo width="70px"/>
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {nav_items.map((item)=>( 
                            item.active && (<li key={item.name}> 
                            <button  className="inline-block px-6 py-2 duration-200 hover:bg-slate-100 text-slate-700 font-medium rounded-full " onClick={()=>{navigation(item.url)}}>{item.name}</button>
                            </li>)
                        ))}

                        {user_login && <li>
                            <Logout_btn/>
                            </li>}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
export default Header;