const fs = require('fs');

const fileName = './models/data.json';

const data = JSON.parse(fs.readFileSync(fileName));

async function persist() {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, JSON.stringify(data), (err) => {
            if (err == null) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
}

function  getAll() {
    return data;
}

function  getByID(id) {
    return data.find( i => i.id == id);
}

module.exports = {
    getAll,
    getByID
};