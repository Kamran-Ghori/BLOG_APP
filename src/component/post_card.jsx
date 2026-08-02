
import React, { useEffect, useState } from "react";
import data_base from "../appwrite/db";
import { Link } from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react"
import { useRef } from "react";
import "swiper/css";

export default function Post_Card({ $id, title, image }) {
  const [index,setindex]=useState(0);
      return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full">
                <div className="w-full mb-4 overflow-hidden rounded-xl bg-slate-50 aspect-video">
<div className="relative w-full mb-4 overflow-hidden rounded-xl aspect-video">

<Swiper
onSlideChange={(swiper)=> setindex(swiper.activeIndex)}>
    {image.map((img, i) => (
        <SwiperSlide key={i}>
          
            <img
                src={data_base.get_image_preview(img)}
                alt=""
                className="z-0"
            >
            </img>
           
        </SwiperSlide>
    ))}
    <div className="z-50 absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
        {index+1}/{image.length}
    </div>
</Swiper>
</div>
                </div>
                <h2 className="text-lg font-semibold text-slate-800 line-clamp-2 mt-auto">{title}</h2>
            </div>
        </Link>
    );
}


//            <img src={ data_base.get_image_preview(image)} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />