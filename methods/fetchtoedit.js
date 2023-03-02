
module.exports = async function userLogin(id,connect){
    // console.log("")
    connect()
    async function login() {
        // console.log("login called")
        const pool = await connect();
        try {
            const result = await pool.request()
            .query("SELECT * FROM products WHERE product_id = '" + id + "'");
            // console.log("result of read: " + JSON.stringify(result))
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
