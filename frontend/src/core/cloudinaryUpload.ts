import fs from "fs";
import cloudinary from "./cloudinary";

export const uploadMultipleImages = async (
    filePaths: string[],
    folder: string = "products"
): Promise<string[]> => {
    const uploadPromises = filePaths.map(async (filePath) => {
        try {
            const result = await cloudinary.uploader.upload(filePath, { folder });
            fs.unlinkSync(filePath);
            return result.secure_url;
        } catch (error) {
            console.error(`Error uploading ${filePath}:`, error);
            try {
                fs.unlinkSync(filePath);
            } catch { }
            return null;
        }
    });

    const results = await Promise.all(uploadPromises);
    return results.filter((url): url is string => url !== null);
};

export const deleteMultipleImages = async (imageUrls: string[]): Promise<void> => {
    const deletePromises = imageUrls.map(async (imageUrl) => {
        if (!imageUrl || typeof imageUrl !== "string") return;

        try {
            const urlParts = imageUrl.split("/");
            const filename = urlParts[urlParts.length - 1];
            const publicId = `products/${filename.split(".")[0]}`;
            await cloudinary.uploader.destroy(publicId);
        } catch (error) {
            console.error(`Error deleting ${imageUrl}:`, error);
        }
    });

    await Promise.all(deletePromises);
};
