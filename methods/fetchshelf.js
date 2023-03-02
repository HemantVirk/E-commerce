


module.exports = async function fetchshelf(id,connect){
    console.log("fetchshelf called")
    connect()
    console.log(id)
    async function login() {
        console.log("fetchshelf called")
        const pool = await connect();
        try {
            const result = await pool.request()
            .query("SELECT * FROM products WHERE seller_id = '" + id + "'");
            console.log("result of read: " + JSON.stringify(result))
            return result;
        } catch (err) {
            console.log('Error executing query:', err);
            throw err; // optionally rethrow the error
        } finally {
            pool.close();
        }
    }
    

    const result = await login();
    return result;
    
    
}
