import conf from "../config/config";
import {Client, Account, ID} from   "appwrite"

class Authentication{
    client = new Client;
    account;
    
    constructor(){
        this.client
        .setProject(conf.app_ID)
        .setEndpoint(conf.app_url);

        this.account=new Account(this.client);
    }

    //  async  signup({email, password,name}) {
    //         try {
    //     const user = await this.account.create(
    //         ID.unique(),
    //         email,
    //         password,
    //         name,
            
    //     );
    
    //     if(user){
    //         console.log("account bangaya hai login karwado");
    //         const login_status=await this.login({email,password})
    //        if(login_status){
            
    //         // console.log(" login karwado");
    //         return user;
    //        }
    //        else return false;
    //     }else{
    //         return false;
    //     }
    // } catch (e){
       
    //     return false;
    // }
    // }
    async signup({email, password, name}) {
    try {
        const user = await this.account.create(ID.unique(), email, password, name);
        if (user) {
            return await this.login({email, password});
        }
        return false;
    } catch (e) {
        console.error("Signup failed:", e.message);
        throw e; // propagate so the UI can show the real reason
    }
}

    // async login({email,password}){
    //     try{
    //         console.log(email,password);
    //         const result = await this.account.createEmailPasswordSession(
    // email,
    // password,
    //         );
    //         return true;
    //     }catch(error){
    //         // console.log("account bady sale mera");
       
    //     return false;
    //     }
    // }

    async login({email, password}){
    try{
        const result = await this.account.createEmailPasswordSession(email, password);
        return result;
    }catch(error){
        console.error(error.message); // don't log raw password/email in prod
        throw error; // let the caller decide what to show
    }
}

    async get_curr_user(){
        try{
            return await this.account.get();
        }catch(error){
        return null;
        }
    }

    async logout(){
       try{ 
        const result = await this.account.deleteSessions();
        return true;
    }catch(error){
          return false;
    }

    }

}

const authentication= new Authentication();

export default authentication;