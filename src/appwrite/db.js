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


async delete_images(files) {
    try {

        const results = await Promise.all(
            files.map(async (file) =>{
               
                 const result = await this.bucket.deleteFile(
                    conf.app_bucket_id,
                    file,
                )
                return result;
            }
            )
        );

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
        return true;
    }catch(error){
        this.delete_images(Image);
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
        return result;
    }catch(error){
        console.log("no post found");
    }
}

 

    get_image_preview(fileId){
    const temp= this.bucket.getFileView({
        bucketId: conf.app_bucket_id,
        fileId,
    });
    return temp;
}



}

const data_base=new Data_Base();

export default data_base;
