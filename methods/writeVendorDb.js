// const sql = require('mssql/msnodesqlv8');

// var config = {
//     database: 'antiquites',
//     server: 'DESKTOP-0KG1NTU',
//     driver: 'msnodesqlv8',
//     options:{
//         trustedConnection:true
//     }
    
// };

async function writeVendorDb(cridentials,connect){
    console.log("isver : " + cridentials.number)
    // async function connect() {
    //     try {
    //         const pool = await sql.connect(config);
    //         console.log('Connected to database!');
    //         return pool;
    //     } catch (err) {
    //         console.log('Error connecting to database:', err);
    //     }
    // }
    connect()
    async function getAvailability() {
        const pool = await connect();
        try {
            const result = await pool.request()
            .query("insert into vendor values ('" + cridentials.email + "','" + cridentials.username + "','" + cridentials.password + "','"+ cridentials.isVerified +"','"+cridentials.phone+"','" +cridentials.mailToken + "')");
            console.log("error:" +result);
            return result;
        } catch (err) {
            console.log('Error executing query:', err);
            throw err; // optionally rethrow the error
        } finally {
            pool.close();
        }
    }

    const result = await getAvailability();
    return result;
    // return getAvailability();
}

module.exports = writeVendorDb