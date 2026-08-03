
const conf={
    app_url:String(import.meta.env.VITE_URL || "https://nyc.cloud.appwrite.io/v1"),
    app_ID:String(import.meta.env.VITE_PROJECT_ID || "6a5e8958000c2719a775"),
    app_database_id:String(import.meta.env.VITE_DATABASE_ID || "6a5e94440007d11b8edb"),
    app_collection_id:String(import.meta.env.VITE_COLLECTION_ID || "article"),
    app_bucket_id:String(import.meta.env.VITE_BUCKET_ID || "6a5e9f580008a3e02b78"),
    RTE_API:String(import.meta.env.VITE_RTE_API || "i37s98wwyx29hbtcwgrz95hkxcgbcob68dabl8qxzsw3n62d"),
}

export default conf