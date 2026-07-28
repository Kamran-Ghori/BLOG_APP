import React from "react";
import { Post_Form,Container } from "../component";
import data_base from "../appwrite/db";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Edit_Post(){
    const [post , setpost]=useState(null);
    const navigation=useNavigate();
    const {id}=useParams();
    
    useEffect(()=>{
      if(id) {
         data_base.get_post(id)
         .then((temp)=>{
            if(temp){
            setpost(temp);
        }
        return;
         })
       
    }else{
        navigation('/');
    }
    },[id,navigation])



    return post? (
        <div className='py-8'>
            <Container>
                <Post_Form post={post}></Post_Form>
            </Container>
        </div>
    ):null
}