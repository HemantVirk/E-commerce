module.exports = async function fetchproduct(id,connect){
    
    connect()
    async function product_fetch() {
        console.log("starting fetching")
        const pool = await connect();
        try {
                const result = await pool.request()
                .query(`select stock from products where product_id = ${id}`)
        
            return result.recordset[0].stock
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