import { client } from "../weaviate/client.js";
import fs from 'fs';

const uploadAllImagesFromDirectory = async (dir) => {

    const imgFiles = fs.readFileSync(dir);

    imgFiles.map(async (imgFile) => {
        const path = dir + imgFiles;
        const b64 = toBase64(path);

        await client.data.creator()
            .withClassName('Meme')
            .withProperties({
                image: b64,
                text: imgFile.split('.')[0].split('_').join(' ')
            })
            .do();
    });
}

export { uploadAllImagesFromDirectory }