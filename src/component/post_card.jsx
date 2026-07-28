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
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img src={ data_base.get_image_preview(image)} alt={title} className="rounded-xl" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}