

module.exports = async function getorder(user_id,connect){
    connect()
    async function add() {
        const pool = await connect();
        try {
            console.log("qwertyuiop")
            const result = await pool.request()
            .query(`SELECT orders.*, products.picturename, products.name 
            FROM orders 
            JOIN products ON orders.product_id = products.product_id 
            WHERE orders.user_id = ${user_id} 
            ORDER BY orders.order_date DESC`)
            return result
        } catch (err) {
            console.log('Error executing query:', err);
            throw new Error('Error adding item to cart. Please try again later.');
        } finally {
            pool.close();
        }
    }
    

    const result = await add();
    console.log(result)
    return result.recordset;
    
    
}
