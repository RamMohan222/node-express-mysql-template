const db = require('./db');

exports.save = async (book) => {
    return await db.execute(async connection => {
        const result = await connection.query();
        return result;
    })
}

exports.saveAuthorAndBook = async (author, book) => {
    const { authorResult, bookResult } = await db.transaction(async connect => {
        const authorResult = await connect.query('SQL save author', author);
        const bookResult = await connect.query('SQL save book', book);
        return { authorResult, bookResult };
    });
    return { authorResult, bookResult };
}