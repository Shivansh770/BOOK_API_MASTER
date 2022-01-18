let books = [
    {
        ISBN: "12345ONE",
        title: "Getting started with MERN",
        authors: [1, 2],
        language: "en",
        pubDate: "2022-01-14",
        numOfPage: 225,
        category: ["fiction","programming","tech","web dev"],
        publication: 1,
    },
    {
        ISBN: "12345Two",
        title: "Getting started with Python",
        authors: [1, 2],
        language: "en",
        pubDate: "2022-03-14",
        numOfPage: 550,
        category: ["fiction","tech","web dev"],
        publication: 1,
    }
];

let authors = [
    {
        id: 1,
        name: "shivansh",
        books: ["12345ONE","12345Two"],
    },
    {
        
        id: 2,
        name: "akku",
        books: ["12345ONE","12345Two"],
    }
];

let publications = [
    {
        id: 1,
        name: "Gla Publications",
        books: ["12345ONE","12345Two"],
    },
    {
        id: 2,
        name: "Dosti Publications",
        books: [],
    }
];

module.exports = {books,authors,publications};