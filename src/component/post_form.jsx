import React, { useCallback, useEffect } from "react";
import data_base from "../appwrite/db";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import Input from "./input"
import RTE from "./RTE"
import Select from "./select"
import Button from "./button";
import { Databases } from "appwrite";
import { useState } from "react";

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css";
export default function Post_Form({post}){
    const {register,handleSubmit,control,watch,setValue,getValues}=useForm({
        defaultValues:{
            title:post?.title||'',
            content:post?.content||'',
            slug:post?.slug||'',
            status:post?.status||'active',
        }
    })
    const navigation=useNavigate();
    const user_data=useSelector((state)=>state.Auth.user_data);
    const [index,setindex]=useState(0);

const submit = async (data) => {

if(post){

    let image_id=post.image;

    if (data.image.length > 0) {
        try {
            const response = await data_base.upload_image(data.image);
            console.log("new images uploaded");
            await data_base.delete_images(image_id);
            console.log("prev image got deleted");
            image_id = response;
        } catch (error) {
            console.log("image handling failed", error);
        }
    }

    try {
        const res = await data_base.update_post(post.$id,{...data},image_id);
        console.log(res);
        navigation(`/post/${res.$id}`);
    } catch (error) {
        console.log("post has not been updated");
    }
}

    else {

        data_base.upload_image(data.image)
        .then((res)=>{
            data_base.upload_blog({...data},user_data.$id,res)
            .then((res)=>{
                navigation(`/post/${res.$id}`);   
            })
            .catch((error) => {
            })
        }).catch((error) => {
             })

    }

};

    const slug_transformation = useCallback((value)=>{
        if(value && typeof(value) === "string")return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        return "";

    },[])

    useEffect(()=>{ 
        const subscription=watch((value, {name,type})=>{
           
            if(name === "title"){
                    setValue("slug",slug_transformation(value.title),{shouldValidate:true})
            }
            return;
        })

        return ()=>subscription.unsubscribe(); 
     },[watch()])



    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
            <Input  label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title",{requiredt:true})} />


<Input label="slug"
placeholder="Slug"
className='mb-4'
{...register("slug",{required:true})} 
 onInput={(e) => {
                        setValue("slug", slug_transformation(e.currentTarget.value), { shouldValidate: true });
                    }}
/>

<RTE label="Content: " name="content" control={control} default_value={getValues("content")} />
            </div>
                        <div className="w-1/3 px-2">
<Input  label="Featured Image :"
                    type="file"
                    className="mb-4"
                    multiple
                   accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
 />
 
 {post && (
   
    <div className="relative w-full mb-4 overflow-hidden rounded-xl aspect-video">

<Swiper
onSlideChange={(swiper)=> setindex(swiper.activeIndex)}>
    {post.image.map((img, i) => (
        <SwiperSlide key={i}>
          
            <img
                src={data_base.get_image_preview(img)}
                alt=""
                className="z-0"
            >
            </img>
           
        </SwiperSlide>
    ))}
    <div className="z-40 absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
        {index+1}/{post.image.length}
    </div>
</Swiper>
</div>
 )}

 <Select 
    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                     {...register("status", { required: true })}
                     />
                     <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>

                        </div>
        </form>
    )


}