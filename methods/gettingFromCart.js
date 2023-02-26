module.exports = async function gettingFromCart(user_id,connect){
    connect()
    async function add() {
        const pool = await connect();
        try {
            const result1 = await pool.request()
            .query("SELECT products.*, cart.user_id, cart.quantity FROM cart left join products ON cart.product_id = products.product_id WHERE user_id = '" + user_id + "'")
            // .query("SELECT * FROM cart WHERE user_id = '" + user_id + "'");
            return result1
            // const result2 = await pool.request()
            // .query("SELECT * FROM cart WHERE user_id = '" + user_id + "'");
        } catch (err) {
            console.log('Error executing query:', err);
            throw err; // optionally rethrow the error
        } finally {
            pool.close();
        }
    }
    

    const result = await add();
    return result;
    
    
}
