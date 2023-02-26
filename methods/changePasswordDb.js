module.exports = async function fetchproduct(cridentials,connect){
    console.log("pass change")
    connect()

    async function product_fetch() {
        // console.log("starting fetching")
        const pool = await connect();
        try {
            
                const result = await pool.request()
                .query("SELECT * FROM users WHERE email = '" + cridentials.email + "'");
                console.log(result)
                if(result.recordset[0] != null){
                    const result2 = await pool.request()
                    .query(`update users set password = '${cridentials.newpassword}' where email ='${cridentials.email}'`)
                    return result2
                }
                else   
                    return {Error: "404"}
        } catch (err) {
            console.log('Error executing query:', err);
            throw err; // optionally rethrow the error
        } finally {
            pool.close();
        }
    }
    

    const result = await product_fetch();
    // console.log(result)
    // console.log(result.recordset[0] == null)
    return result;
    
    
}