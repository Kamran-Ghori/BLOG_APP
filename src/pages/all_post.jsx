import React from "react";
import { useState,useEffect } from "react";
import data_base from "../appwrite/db";
import { Post_Card } from "../component";
import {Container} from "../component";
import { useSelector } from "react-redux";

export default function My_Posts(){

    const [posts, setposts]=useState([]);
    const data=useSelector((state)=>state.Auth.user_data);
    useEffect(()=>{
        const temp= data_base.get_user_post(data.$id)
        .then((post)=>{
            (setposts(post.rows))
        });
    },[])

    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post)=>(
                        <div key={post.$id} className="p-2 w-1/4">
                            <Post_Card {...post} />
                        </div>
                    ))}
                </div>
            </Container>

        </div>
    )
}