module.exports = async function productDb(route,cridentials,file,email,connect){
    console.log("products adding")
    connect()
    async function product_add() {
        console.log("login called")
        console.log(route)
        if(route == 0){
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
        else if(route == 1){
            console.log("updating")
            const pool = await connect();
            try {
                console.log(`update products set name = '${cridentials.product_name}', price = ${cridentials.product_price}, description = '${cridentials.product_info}', stock=${cridentials.product_stock}, picturename = '${file}' where product_id = ${cridentials.product_id}`)
                const result = await pool.request()
                .query(`update products set name = '${cridentials.product_name}', price = ${cridentials.product_price}, description = '${cridentials.product_info}', stock=${cridentials.product_stock}, picturename = '${file}' where product_id = ${cridentials.product_id}`)
                // console.log("result of read: " + JSON.stringify(result))
                return result;
            } catch (err) {
                console.log('Error executing query:', err);
                throw err; // optionally rethrow the error
            } finally {
                pool.close();
            }
        }
        else{
            console.log("deleting")
            const pool = await connect();
            try {
                console.log(`update products set stock=-1 where product_id = ${cridentials.id}`)
                const result = await pool.request()
                .query(`update products set stock= -1 where product_id = ${cridentials.id}`)
                // console.log("result of read: " + JSON.stringify(result))
                return result;
            } catch (err) {
                console.log('Error executing query:', err);
                throw err; // optionally rethrow the error
            } finally {
                pool.close();
            }
        }
    }
    

    const result = await product_add();
    return result;
    
    
}