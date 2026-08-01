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

    async signup({email, password, name}) {
    try {
        const user = await this.account.create(ID.unique(), email, password, name);
        if (user) {
            return await this.login({email, password});
        }
        return false;
    } catch (e) {
        console.error("Signup failed:", e.message);
        throw e; 
    }
}


    async login({email, password}){
    try{
        const result = await this.account.createEmailPasswordSession(email, password);
        return result;
    }catch(error){
        console.error(error.message); 
        throw error; 
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