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

       async upload_image(file){
        try{
            const result=await this.bucket.createFile({
                bucketId: conf.app_bucket_id,
                fileId: ID.unique(),
                file,
            })
            console.log("hui pic upload");
            console.log(result);
            return result.$id;
        }catch(error){
            console.log("nahy hui pic upload");
            return null;
        }
    }


    async upload_blog({title, content, image, status, slug },userid){
        console.log(`upload blog is called`);
         let image_id=null
      try{ 
         image_id=(image)?await this.upload_image(image[0]):null;
        console.log(image_id);
        console.log(userid);
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
                image: image_id,
            }
        });
        console.log(result.$id);
        return result;
    }catch(error){

        console.log("agay error");

       if(image_id) await this.delete_image(image_id);
            
            return false;
        }

    }

    async update_post(id,{title, content, status, userid, slug },image){
            
      try{ 
        //  image_id=(image.length>0)?await this.upload_image(image[0]):null;
        //  console.log(image.length);
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
                image:image,
            }
        })
        return true;
    }catch(error){
            // if(image_id) await this.delete_image(image_id);
            return false;
        
        }
    }

    async delete_post(id){
          try{
            const result=await this.table.deleteRow({
             databaseId: conf.app_database_id,
            tableId: conf.app_collection_id,
            rowId: id,
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

 

    async delete_image(fileId){
        console.log(fileId);
        try{
            await this.bucket.deleteFile({
              bucketId: conf.app_bucket_id,
                fileId,
           })
           return true;
        }catch(error){
            console.log(error);
            return false;
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
