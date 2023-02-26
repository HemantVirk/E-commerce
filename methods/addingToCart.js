module.exports = async function addingToCart(user_id,product_id,connect){
    connect()
    async function add() {
        const pool = await connect();
        try {
            const result1 = await pool.request()
            .query("SELECT * FROM cart WHERE user_id = '" + user_id + "'");
            var count = 1
            for(var i=0 ; i<result1.recordset.length ; i++){
                if(result1.recordset[i].product_id == product_id){
                    count++;
                }
            }
            if(count > 1){
                const result2 = await pool.request()
                .query("update cart set quantity = '"+ count +"' where user_id = '" + user_id + "'");
                return result2;
            }
            else{
                const result3 = await pool.request()
                .query("insert into cart(user_id,product_id,quantity) values ('" + user_id + "','" + product_id + "','" + count + "')");
                return result3;
            }
        } catch (err) {
            console.log('Error executing query:', err);
            throw new Error('Error adding item to cart. Please try again later.');
            
            // throw err; // optionally rethrow the error
        } finally {
            pool.close();
        }
    }
    

    const result = await add();
    // console.log(result.recordset)
    // console.log(result.recordset[0] == null)
    return result;
    
    
}
