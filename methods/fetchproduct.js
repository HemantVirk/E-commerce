module.exports = async function fetchproduct(load,connect){
    console.log("products fetching")
    connect()
    var load = load
    var productarr = []
    async function product_fetch() {
        console.log("starting fetching")
        const pool = await connect();
        try {
                const result = await pool.request()
                .query(`select * from products where stock > 0 order by product_id offset ${load} rows fetch next 5 rows only`)
            console.log(result)
            productarr.push(result.recordset[0])
            // console.log()
            return result.recordset
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