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
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css";

export default function Post(){
    
      const [index,setindex]=useState(0);
    const [post,setpost]=useState(null);
    const navigation =useNavigate();
    const {id} = useParams();

const user_data_=useSelector((state)=>state.Auth);
   const temp=user_data_.user_data;
let isAuthor=false;

    if(post && id && user_data_.status && (post.userid ===temp.$id))isAuthor=true;


    useEffect(()=>{
        if(id){
            data_base.get_post(id).then((post) => {
                if (post) setpost(post);
                else navigation ("/");
            });
         
        }else navigation("/");
    },[id,navigation])

    const deletepost=async ()=>{
        await data_base.delete_images(post.image);

        await data_base.delete_post(post.$id);
        navigation('/');
    }

    return post ? (
    <div className="px-2 py-6 sm:px-6 sm:py-10">
    <Container>
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

            <div className="relative bg-slate-100">

                <Swiper
                    onSlideChange={(swiper) => setindex(swiper.activeIndex)}
                >
                    {post.image.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div className="flex h-64 items-center justify-center sm:h-[500px]">
                                <img
                                    src={data_base.get_image_preview(img)}
                                    alt=""
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Counter */}
                <div className="absolute top-4 right-4 z-20 rounded-full bg-black/60 backdrop-blur-md text-white px-3 py-1 text-sm font-medium">
                    {index + 1}/{post.image.length}
                </div>

                {isAuthor && (
                    <div className="absolute left-3 top-3 z-20 flex gap-2 sm:left-4 sm:top-4 sm:gap-3">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className="rounded-full bg-green-600 px-3 py-2 text-sm hover:bg-green-700 sm:px-6 sm:text-base">
                                Edit
                            </Button>
                        </Link>

                        <Button
                            onClick={deletepost}
                            className="rounded-full bg-red-600 px-3 py-2 text-sm hover:bg-red-700 sm:px-6 sm:text-base"
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-8">
                <h1 className="mb-6 text-2xl font-bold text-slate-800 sm:text-4xl">
                    {post.title}
                </h1>

                <div className="prose prose-lg max-w-none">
                    {parse(post.content)}
                </div>
            </div>

        </div>
    </Container>
</div>
    ) : null;
}