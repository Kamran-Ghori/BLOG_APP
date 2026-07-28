import React, { useCallback, useEffect } from "react";
import data_base from "../appwrite/db";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import Input from "./input"
import RTE from "./RTE"
import Select from "./select"
import Button from "./button";
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

    const submit = (data) => {


if(post){

    let image_id=post.image;
    if(data.image.length>0){

        data_base.upload_image(data.image[0])
       .then((newid)=>{
        data_base.update_post(post.$id,{...data},newid)
        .then((status)=>{
            if(!status){
                data_base.delete_image(newid)
                navigation(`/post/${temp.$id}`);
            }

            data_base.delete_image(post.image);

                navigation(`/post/${post.$id}`);
        })
       })
        .catch(console.error);
    }

      
else{
    data_base.update_post(post.$id,{...data},image_id)
    .then((status)=>{
        if(status){
         navigation(`/post/${post.$id}`);
        }else{
            console.log("phase");
        }
    }).catch((error)=>(console.log(error)));}
    
}
    
    else {
        data_base.upload_blog({ ...data }, user_data.$id)
            .then((temp) => {
                if (temp) {
                    navigation(`/post/${temp.$id}`);
                } else {
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

};

    const slug_transformation = useCallback((value)=>{
        if(value && typeof(value) === "string")return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        return "";

    },[])

    useEffect(()=>{ 
        const subscription=watch((value, {name,type})=>{
            console.log(`name: ${name}`);
            console.log(`value: ${value}`);
            if(name === "title"){
                console.log(`helo`)
                console.log(slug_transformation(value.title));
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
                   accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
 />
 
 {post && (
    <div className="w-full mb-4">
        <img
        src={data_base.get_image_preview(post.image)}
        alt={post.title}
        className="rounded-lg"
        />
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