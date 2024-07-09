import fs from 'fs';
import fsPromises from 'fs/promises';
export const deleteFile = async (filePath: string) => {
    try {
        if (fs.existsSync(filePath)) {
            await fsPromises.unlink(filePath);
            return true;
        } else {
            console.error(`You are trying to delete non-exist file "${filePath}"`);
            return false;
        }
    } catch (error) {
        console.error(`Error deleting file "${filePath}":`, { error });
        return false;
    }
};

export const isFileExist = (filePath: string, compareSize: number = 0): boolean | number => {
    try {
        if (!fs.existsSync(filePath)) {
            return false; // File does not exist
        }

        const stats = fs.statSync(filePath);
        const fileSizeInBytes: number = stats && stats.size ? stats.size : 0;

        return (compareSize || compareSize === 0) && fileSizeInBytes > compareSize;
    } catch (e) {
        return false;
    }
};