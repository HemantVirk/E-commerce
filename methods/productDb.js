module.exports = async function productDb(cridentials,file,email,connect){
    console.log("products adding")
    connect()
    async function product_add() {
        console.log("login called")
        const pool = await connect();
        try {
            const result = await pool.request()
            .query("select * from users where email = '" + email + "'")
            const result1 = await pool.request()
            // insert into users(name, email, phone, password, is_verified, role, mail_token) values ('" + cridentials.username + "','" + cridentials.email + "','" + cridentials.phone + "','" + cridentials.password + "','" + cridentials.isVerified + "','" + cridentials.role + "','" + cridentials.mailToken + "')");
            .query("insert into products(name,price,description,picturename,stock,seller_id) values ('" + cridentials.product_name + "','" + cridentials.product_price + "','" +cridentials.product_info + "','" + file + "','" + cridentials.product_stock  + "','" + result.recordset[0].user_id + "')")
            console.log("result of read: " + JSON.stringify(result))
            return result1;
        } catch (err) {
            console.log('Error executing query:', err);
            throw err; // optionally rethrow the error
        } finally {
            pool.close();
        }
    }
    

    const result = await product_add();
    // console.log(result.recordset)
    // console.log(result.recordset[0] == null)
    return result;
    
    
}