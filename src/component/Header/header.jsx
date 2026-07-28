import React from "react";
import Container from "../container/container";
import Logout_btn from "./logout_btn";
import Logo from "../logo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header(){

    const user_login=useSelector((state)=>state.Auth.status);
    
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
            name:"All Post",
            url:"/all-posts",
            active:user_login,
        },
        {
            name:"Add Post",
            url:"/add-post",
            active:user_login,
        },
    ]


    return (
        <header className="py-3 shadow bg-gray-500">
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
                            <button  className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full " onClick={()=>{navigation(item.url)}}>{item.name}</button>
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