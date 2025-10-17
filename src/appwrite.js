import { Client, Databases, Query, ID } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('68ee376f00165f569525')

// ...existing code...
const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    console.log("updateSearchCount called with:", searchTerm);
    console.log("DATABASE_ID:", DATABASE_ID);
    console.log("COLLECTION_ID:", COLLECTION_ID);

    if (!DATABASE_ID || !COLLECTION_ID) {
        console.error("Database or Collection ID is missing. Check your .env.local file.");
        return;
    }

    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal('searchTerm', searchTerm)])
        console.log("Appwrite listDocuments result:", result);

        if(result.documents.length > 0){
            const doc = result.documents[0]
            console.log("Found existing document, updating:", doc.$id);
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            })
            console.log("Update successful.");
        }

        else{
            console.log("No existing document, creating new one.");
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
            console.log("Create successful.");
        }

    } catch(error){
        console.error("Appwrite operation failed:", error)
    }
}

export const getTrendingMovies = async () => {
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ])
        return result.documents;
    } catch(error){
        console.log(error);
    }
}
