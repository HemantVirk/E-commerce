


module.exports = async function userLogin(cridentials,connect){
    console.log("userlogin called")
    connect()
    async function login() {
        console.log("login called")
        const pool = await connect();
        try {
            const result = await pool.request()
            .query("SELECT * FROM users WHERE email = '" + cridentials.email + "'");
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
