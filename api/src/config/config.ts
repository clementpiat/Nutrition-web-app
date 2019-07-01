export default {
    "port": parseInt(process.env.PORT) || 4200,
    "mongoUrl": process.env.MONGO_URL || "mongodb://yourdatabasepath"
}