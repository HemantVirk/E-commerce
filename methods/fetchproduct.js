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
            // for(var i=0 ; i<5 ; i++){
            //     const result = await pool.request()
            //     .query(`select * from products where product_id =${load+1}`)
            //     console.log(result)
            //     if(result.recordset[0] && result.recordset[0].stock >= 0){
            //         // console.log("ye to hora")
            //         productarr[i] = result.recordset[0]
            //         load++;
            //         // console.log(productarr)
            //     }
            //     else if(result.recordset.length == 0){
            //         break;
            //     }
            //     else{
            //         load++;
            //         i--;
            //     }
            // }
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