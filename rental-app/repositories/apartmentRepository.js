const pool = require('../db');

async function getAllApartments() {
    const result = await pool.query('SELECT * FROM apartments');
    return result.rows;
}

async function insertApartment(ap) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(`
            INSERT INTO apartments (owner, description, rooms, price, location, size)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [ap.owner, ap.description, ap.rooms, ap.price, ap.location, ap.size]);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

async function getApartmentById(id) {
    const result = await pool.query('SELECT * FROM apartments WHERE id = $1', [id]);
    return result.rows[0];
}

async function updateApartment(id, ap) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(`
            UPDATE apartments SET
                owner = $1,
                description = $2,
                rooms = $3,
                price = $4,
                location = $5,
                size = $6
            WHERE id = $7
        `, [ap.owner, ap.description, ap.rooms, ap.price, ap.location, ap.size, id]);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

async function deleteApartment(id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('DELETE FROM apartments WHERE id = $1', [id]);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

async function duplicateApartment(id) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM apartments WHERE id = $1', [id]);
        const original = result.rows[0];

        if (!original) {
            throw new Error('not found');
        }

        await client.query(`
            INSERT INTO apartments (owner, description, rooms, price, location, size)
            VALUES ($1, $2, $3, $4, $5, $6)
        `, [
            original.owner,
            original.description + ' (копія)',
            original.rooms,
            original.price,
            original.location,
            original.size
        ]);

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

module.exports = {
    getAllApartments,
    insertApartment,
    getApartmentById,
    updateApartment,
    deleteApartment,
    duplicateApartment
};
