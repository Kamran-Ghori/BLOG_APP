import React from "react";
import {logout}  from '../../context/auth'
import authentication from "../../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'; 

export default function Logout_btn(){

  const dispatched = useDispatch();
  const navigation=useNavigate();
    const handler=()=>{
      //   if((  authentication.logout())){
      //   dispatched(logout());
      //   navigation('/');
      // }

      authentication.logout()
      .then((res)=>{
        if(res){
          dispatched(logout());
          navigation('/');
        }
      else{
        console.log("log out unsuccessfull from logout button");
      }
      })
      
    }

     return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={handler}
    >Logout</button>
  )
   

}