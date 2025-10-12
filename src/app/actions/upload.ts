"use server";

import cloudinary from "@/lib/cloudinary";

export async function uploadToCloudinary(
  fileBytes: Uint8Array,
  folder = "smart-ride/children"
): Promise<string> {
  const buffer = Buffer.from(fileBytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        use_filename: true,
        unique_filename: false,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error(" Erreur Cloudinary :", error);
          return reject(error);
        }

        if (!result?.secure_url) {
          console.error(" Aucun URL retourné par Cloudinary");
          return reject(new Error("Échec de l'upload vers Cloudinary"));
        }

        console.log(" Upload Cloudinary réussi :", result.secure_url);
        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
}
