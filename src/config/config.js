
const conf={
    app_url:String(import.meta.env.VITE_URL),
    app_ID:String(import.meta.env.VITE_PROJECT_ID),
    app_database_id:String(import.meta.env.VITE_DATABASE_ID),
    app_collection_id:String(import.meta.env.VITE_COLLECTION_ID),
    app_bucket_id:String(import.meta.env.VITE_BUCKET_ID),
}

export default conf