// import React from "react";
// import data_base from '../appwrite/db'
// import { Link } from 'react-router-dom'

// export default function Post_Card({
//     $id,
//     title,
//     image
// }){
  

//     return (
//         <Link to={`/post/${$id}`}>
//             <div className="w-full bg-gray-100 rounded-xl p-4 ">
//                 <div className="w-full justify-center mb-4 ">
//                     <img src={data_base.get_image_preview(image)} alt={title} className="rounded-xl"></img>
//                 </div>
//                 <h2 className="text-xl font-bold" >{title} </h2>
//             </div>
//         </Link>
//     )
// }

import React from "react";
import data_base from "../appwrite/db";
import { Link } from "react-router-dom";

export default function Post_Card({ $id, title, image }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full">
                <div className="w-full mb-4 overflow-hidden rounded-xl bg-slate-50 aspect-video">
                    <img src={ data_base.get_image_preview(image)} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800 line-clamp-2 mt-auto">{title}</h2>
            </div>
        </Link>
    );
}