const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/apartments.json');

// 1. Синхронний ввід-вивід
function getApartmentsSync() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

// 2. Callback
function getApartmentsCallback(callback) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return callback(err);
        callback(null, JSON.parse(data));
    });
}

// 3. Promise
function getApartmentsPromise() {
    return fs.promises.readFile(filePath, 'utf-8').then(data => JSON.parse(data));
}

// 4. Async/Await
async function getApartmentsAsync() {
    const data = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

module.exports = {
    getApartmentsSync,
    getApartmentsCallback,
    getApartmentsPromise,
    getApartmentsAsync
};
