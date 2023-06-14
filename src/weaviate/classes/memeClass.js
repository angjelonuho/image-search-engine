import { client } from '../client.js';

const memeClass = async () => {

    // Hierarchical navigable small worlds schema
    const schemaConfig = {
        'class': 'Meme',
        'vectorizer': 'img2vec-neural',
        'vectorIndexType': 'hnsw',
        'moduleConfig': {
            'img2vec-neural': {
                'imageFields': ['image'],
            }
        },
        'properties': [
            {
                'name': 'image',
                'dataType': ['blob'],
            },
            {
                'name': 'text',
                'dataType': ['string'],
            },
        ],
    };


    return await client.schema
        .classCreator()
        .withClass(schemaConfig)
        .do();

}


const createMemeClassIfNotExists = async () => {
    try {
        const schemaRes = await client.schema.getter().do();
        const schemaClasses = schemaRes?.data?.classes || [];

        const memeClassExists = schemaClasses.some(
            (schemaClass) => schemaClass.class === 'Meme'
        );

        if (!memeClassExists) {
            await memeClass();
            console.log('Meme class created.');
        } else {
            console.log('Meme class already exists.');
        }
    } catch (error) {
        console.error('An error occurred while creating meme class:', error);
    }
}

export { createMemeClassIfNotExists }