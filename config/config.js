const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kalleanka9!',
  database: 'dbthornior'
});

try {
  db.connect();
  module.exports = { db };

} catch (error) {
  console.log(error.message);
}
