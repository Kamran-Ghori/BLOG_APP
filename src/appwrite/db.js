import conf from "../config/config";
import { Client, ID, TablesDB, Storage,Query} from "appwrite";


class Data_Base{
    client=new Client();
    table;
    bucket;
     constructor(){
        this.client
        .setProject(conf.app_ID)
        .setEndpoint(conf.app_url);
        this.table=new TablesDB(this.client);
        this.bucket=new Storage(this.client);
    }


//     async to_choose_delete_function(File){
//         console.log(File);
//         if(!Array.isArray(File)){
//             console.log(`single image`);
//           return  await this.delete_images(File);
        
//         }else{
//             console.log(`MULTIPLE image`);
//           return  await this.delete_image(File);
//         }
//     }

    
//       async delete_image(file){
//           try{
//             console.log(File);
         
//                 const result=await this.Storage.deleteFile(
//                     conf.app_bucket_id,
//                     file
//                 );
//                 console.log(result);
//                 return result;
// }catch(error){
//             return false;
//         }
//     }


//       async delete_images(File){
//           try{
//             console.log(File);
//             console.log(typeof(File));
//           const results=await Promise.all(
//             Array.from(File).map(async (file)=>{
//                 const result=await this.Storage.deleteFile(
//                     conf.app_bucket_id,
//                     file,
//                 );
//                 console.log(result);
//                 return result;
//             })
//         )
//         return results;
// }catch(error){
//             return false;
//         }
//     }

async to_choose_delete_function(file) {
    console.log(file);

    if (Array.isArray(file)) {
        console.log("MULTIPLE images");
        return this.delete_images(file);
    } else {
        console.log("SINGLE image");
        return this.delete_image(file);
    }
}

async delete_image(file) {
    try {
        console.log(file);

        const result = await this.Storage.deleteFile(
            conf.app_bucket_id,
            file
        );

        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async delete_images(files) {
    try {
        console.log(files);
        console.log(typeof files);

        const results = await Promise.all(
            files.map(async (file) =>{
                console.log(file);
                console.log(typeof(file));
                 const result = await this.bucket.deleteFile(
                    conf.app_bucket_id,
                    file,
                )
                return result;
            }
            )
        );

        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
        return false;
    }
}

       async upload_image(File){
      try{
        const results = await Promise.all(
            Array.from(File).map(async (file)=>{
                const result=await this.bucket.createFile(
                    conf.app_bucket_id ,
                    ID.unique(),
                    file,
                );
                return result.$id;
            })
        )
        console.log("hui pic upload");
        console.log(results);
        return results;

      }catch(error){
        console.log(error);
        return false;
      }
    }


    async upload_blog({title, content, status, slug },userid,Image){
        
      try{
         const result=await this.table.createRow({
             databaseId: conf.app_database_id,
            tableId: conf.app_collection_id,
            rowId: ID.unique(),
            data:{
                title,
                content,
                status,
                slug,
                userid,
                image:Array.from(Image),
            }
        });
        console.log(result);
        return result;
    }catch(error){
        this.to_choose_delete_function(Image);
        return false;
    }
     }

    async update_post(id,{title, content, status, userid, slug },Image){
            
      try{ 
             const result=await this.table.updateRow({
             databaseId: conf.app_database_id,
            tableId: conf.app_collection_id,
            rowId: id,
            data:{
                title,
                slug,
                content,
                status,
                userid,
                image:Array.from(Image),
            }
        })
        console.log("post has been updated successfully");
        return true;
    }catch(error){
        this.to_choose_delete_function(Image);
        return false;
        
        }
    }

      async delete_post(file){
          try{
            const result=await this.table.deleteRow({
             databaseId: conf.app_database_id,
            tableId: conf.app_collection_id,
            rowId: file,
        })
    return result;
}catch(error){
            console.error(error);
            return null;
        }
    }

  
    async get_post(id){
         try{  
            const result=await this.table.getRow({
             databaseId: conf.app_database_id,
            tableId: conf.app_collection_id,
            rowId: id,
        })
        // console.log(`result aya: ${result}`);
        return result;

      }catch(error){
            console.error(error);
        }
    }

    async get_all_posts(){
        try{  
            const result=await this.table.listRows({
             databaseId: conf.app_database_id,
            tableId: conf.app_collection_id,
            queries:[
                Query.equal('status','active'),
                Query.limit(100),
            ]
        })
        return result;
    }catch(error){
            console.error(error);
        }
    }

    
async get_user_post(user_id){
    try{
        const result=this.table.listRows({
            databaseId: conf.app_database_id,
            tableId: conf.app_collection_id,
            queries:[
                Query.equal('userid',user_id),
                
            ]
        })
        console.log(result)
        return result;
    }catch(error){
        console.log("no post found");
    }
}

 

    //  get_image_preview(fileId){
    //         const result=   this.bucket.getFileView({
    //             bucketId:conf.app_bucket_id,
    //             fileId,
    //         })
    //         console.log(result);
    //         return result;
      
    // }

    get_image_preview(fileId){
    const temp= this.bucket.getFileView({
        bucketId: conf.app_bucket_id,
        fileId,
    });
    console.log(temp);
    return temp;
}



}

const data_base=new Data_Base();

export default data_base;
