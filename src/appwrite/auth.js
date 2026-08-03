import conf from "../config/config";
import {Client, Account, ID, OAuthProvider} from   "appwrite"

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

async login_google(){
    console.log(`thaaaaaaaaaaaaaaaaaa`);
    try{
        return this.account.createOAuth2Session({
            provider: OAuthProvider.Google,
            success:'https://blog-app-rlva.vercel.app/',
            failure:'https://blog-app-rlva.vercel.app/signup',
            scopes:['openid','email','profile'],
        })
    }catch(error){
        console.log(`sign up wiht google fails`);
    }
}
    async get_curr_user(){
        console.log(`get info called`);
        try{
            return await this.account.get();
        }catch(error){
        return null;
        }
    }

     async get_auth_user(){
        try{
            return await this.account.getSession(
                {
                    seessionId:'current'
                }
            );
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