import { uploadAllImagesFromDirectory } from './src/utils/uploadImages.js';
import { createMemeClassIfNotExists } from './src/weaviate/classes/memeClass.js';
import { client } from './src/weaviate/client.js';


// Create meme class if it doesn't exist
await createMemeClassIfNotExists();

// upload all images from directory
const directory = './img/';
await Promise.all([uploadAllImagesFromDirectory(directory)]);


const test = Buffer.from(readFIleSync('./img/meme.jpg')).toString('base64');
const resImage = await client.graphql.get()
    .withClassName('Meme')
    .withFields(['image'])
    .withNearImage({ image: test })
    .withLimit(1)
    .do();

const result = resImage.data.Get.Meme[0].image;
writeFileSync('./imgResults/result.jpg', result, 'base64');