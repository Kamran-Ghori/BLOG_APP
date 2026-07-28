import React from "react";
import { useState,useEffect } from "react";
import {  useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container} from "../component";
import Button from "../component/button";
import data_base from "../appwrite/db";
import parse from "html-react-parser"
import { Link } from "react-router-dom";

export default function Post(){
    const [post,setpost]=useState(null);
    const navigation =useNavigate();
    const {id} = useParams();

    // console.log(id);

const user_data_=useSelector((state)=>state.Auth);
   const temp=user_data_.user_data;
let isAuthor=false;

// console.log(`post: ${post}`);
// if(post){console.log(`post id: ${post.$id}`)}
// console.log(`id:  ${id}`);
// console.log(`user_data_.status ${user_data_.status}`);
// console.log(`temp: ${temp}`);
// console.log(`temp.$id: ${temp.$id} `)

    if(post && id && user_data_.status && (post.userid ===temp.$id))isAuthor=true;
// console.log(isAuthor);

    useEffect(()=>{
        if(id){
            data_base.get_post(id).then((post) => {
                if (post) setpost(post);
                else navigation ("/");
            });
         
        }else navigation("/");
    },[id,navigation])

    const deletepost=()=>{
        data_base.delete_image(post.image);
        data_base.delete_post(post.$id);
        navigation('/');
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={data_base.get_image_preview(post.image)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletepost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6"> 
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}