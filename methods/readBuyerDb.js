

module.exports = async function readBuyerDb(email,connect){
    
    connect()
    async function getAvailability() {
        const pool = await connect();
        try {
            const result = await pool.request()
            .query("SELECT * FROM buyer WHERE email_id = '" + email + "'");
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
    
}

// module.exports = readBuyerDb