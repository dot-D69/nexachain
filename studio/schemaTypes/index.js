import {defineType, defineField} from 'sanity';
// Schema is how data is stored in Sanity
// Each Schema has  a data(what kind of data), type(eg Name, symbol, Price) and a field(eg. string, nummber, image).
// defineType: is used to define a new content type (e.g., "Coins").
// defineField: is used to define fields inside that type (e.g., Name, Symbol, logo).

//defineType({...}) creates a new schema type.
// export default means this schema can be used in other files.
export const schemaTypes = [
    defineType({
    name: 'coins', //This is the internal name of this schema.It will be used in queries and APIs (e.g., *[_type == "coins"]).
    title: 'Coins', // This is the display name inside Sanity Studio. It helps editors identify this schema.
    type: 'document', // This means that "Coins" is a collection of documents.Each document represents one cryptocurrency (e.g., Bitcoin, Ethereum, etc.).
    fields:
        [ // This is where we define what information each " Coin"  should have
        // Each Coin (e.g., Bitcoin, Ethereum) has some properties like name, price, and logo.
        defineField({
            name:'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name:'symbol',
            title: 'Symbol',
            type: 'string',
        }),
        defineField({
            name:'contractAddress',
            title: 'Contract Address',
            type: 'string',
        }),
        defineField({
            name:'usdPrice',
            title: 'USD Price',
            type: 'string',
        }),
        defineField({
            name:'logo',
            title: 'Logo',
            type: 'image',
        }),
    ],
}),
];
