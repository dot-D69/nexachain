import { createClient } from '@sanity/client';
// createClient: A function from Sanity that helps us create a connection with the database.
// @sanity/client: This is the package (library) we installed to interact with Sanity.

import dotenv from 'dotenv';
dotenv.config(); // Load .env variables


export const client =  createClient({
    projectId: 'okyxh4w5',
    dataset: 'production',
    apiversion: '2024-02-11',
    useCdn: false, //false ensures fresh data, true improves performance
    token:process.env.SANITY_API_TOKEN,
})