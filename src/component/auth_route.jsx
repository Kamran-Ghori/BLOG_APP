import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Protection({children,authenticated=true}){
    const auth=useSelector((state)=>state.Auth.status);
    const [loading,setloading]=useState(true);
    const navigation=useNavigate();

   useEffect(()=>{ 
    if(authenticated && !(auth)){
            navigation("/");
    }else if(!authenticated && auth){
        navigation("/");
    }
setloading(false);
},[auth,authenticated,navigation])

    return loading ? <h1>...loading</h1>:<>{children} </>
}