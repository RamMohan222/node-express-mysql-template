const mysql = require('mysql');
const util = require('util');
const assert = require('assert');
const debug = require('debug')('sql:');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysqlhost',
    user: 'bob',
    password: 'secret',
    database: 'my_db'
});

pool.query = util.promisify(pool.query);
pool.getConnection = util.promisify(pool.getConnection);
pool.acquireConnection = util.promisify(pool.acquireConnection);

const acquire = async (pool) => {
    const connection = await pool.getConnection();
    return await pool.acquireConnection(connection);
}

const begin = async (connection) => {
    connection.query = util.promisify(connection.query);
    connection.commit = util.promisify(connection.commit);
    connection.release = util.promisify(connection.release);
    connection.rollback = util.promisify(connection.rollback);
    connection.beginTransaction = util.promisify(connection.beginTransaction);
    await connection.beginTransaction();
}

exports.execute = async (fn) => {
    assert.equal(typeof fn, 'function');
    try {
        const connection = await pool.getConnection();
        connection.query = util.promisify(connection.query);
        return await fn(connection);
    } finally {
        // When done with the connection, release it.
        connection.release();
    }
};

exports.transaction = async (fn) => {
    assert.equal(typeof fn, 'function');
    const connection = await acquire(pool);
    debug('Acquired a connection.');
    try {
        await begin(connection);
        debug('Started the transaction.')
        try {
            const result = fu(connection);
            debug('Executed the query.');
            await connection.commit();
            debug('Committed the transaction.');
            return result;
        } catch (error) {
            await connection.rollback();
            debug('Rollback the transaction.');
            throw error;
        }
    } finally {
        // always should release connection.
        await connection.release();
        debug('Released the connection.');
    }
}
