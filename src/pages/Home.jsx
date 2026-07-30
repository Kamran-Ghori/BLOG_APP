import React from "react";
import data_base from "../appwrite/db";
import { useState,useEffect } from "react";
import { Container } from "../component";
import {Post_Card} from "../component";

export default function Home(){

const [posts, setposts]=useState([]);
    useEffect(()=>{
        const temp= data_base.get_all_posts()
        .then((post_response)=>{ 
            setposts(post_response.rows);
    });
    },[])
   if (posts.length == 0) {

        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-slate-500 hover:text-slate-700 transition-colors">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
        
    }else{
          return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {posts.map((post) => { 
                
                return (
                    <div key={post.$id} className='w-full'>
                        <Post_Card {...post} />
                    </div>
                );
})} 
                </div>
            </Container>
        </div>
    )
    }
}
