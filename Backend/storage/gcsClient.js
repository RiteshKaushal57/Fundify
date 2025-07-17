import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucketName = "fundify-app";
const bucket = storage.bucket(bucketName);

export default bucket;
