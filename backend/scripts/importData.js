const db = require('../database/db');
const fs = require('fs');
const csv = require('csv-parser');

const importData = () => {
    fs.createReadStream('data/transactions.csv')
        .pipe(csv())
        .on('data', (row) => {
            db.run(
                `INSERT INTO transactions (collect_id, school_id, gateway, order_amount, transaction_amount, status, custom_order_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    row.collect_id,
                    row.school_id,
                    row.gateway,
                    row.order_amount,
                    row.transaction_amount,
                    row.status,
                    row.custom_order_id,
                ]
            );
        })
        .on('end', () => {
            console.log('Data imported successfully.');
        });
};

importData();
