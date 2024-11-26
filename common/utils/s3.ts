import { ApiConnection } from "@/interface/api";
// import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const options = {
  bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
};

const BASE_URL = `${process.env.NEXT_PUBLIC_SB_API_REST_URL}/storage/v1/object/public/${options.bucket}/`;

const generateFileName = (fileName: string) => {
  const hash = Math.random().toString(32).substring(2);
  const time = Date.now();
  const ext = fileName.split(".").pop();
  return `public/${time}_${hash}.${ext}`;
};

export const uploadFile = async (file: File, client: ApiConnection["client"]) => {
  if (!process.env.NEXT_PUBLIC_S3_BUCKET) return;
  const { data } = await client.storage
    .from(process.env.NEXT_PUBLIC_S3_BUCKET)
    .upload(generateFileName(file.name), file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (!data) return;

  return `${BASE_URL}${data?.path}`;
};

// export const deleteFile = async (url: string) => {
//   const command = new DeleteObjectCommand({
//     Bucket: options.bucket,
//     Key: url.replace(BASE_URL, ""),
//   });

//   try {
//     return await client.send(command);
//   } catch (err) {
//     console.error(err);
//   }
// };
