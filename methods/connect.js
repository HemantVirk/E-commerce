const sql = require('mssql/msnodesqlv8');
var config = {
    database: 'antiquites_db',
    server: 'DESKTOP-0KG1NTU',
    driver: 'msnodesqlv8',
    options:{
        trustedConnection:true
    }
    
};

module.exports = async function connect() {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to database!');
        return pool;
    } catch (err) {
        console.log('Error connecting to database:', err);
    }
}