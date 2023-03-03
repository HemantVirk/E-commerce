module.exports = async function addtoorder(address,user_id,connect){
    connect()
    async function add() {
        const pool = await connect();
        try {
            console.log("qwertyuiop")
            const result = await pool.request()
            .query(`select product_id,quantity from cart where user_id = ${user_id}`)
            // console.log(result)

            const tran = await pool.request()
            .query("begin transaction")

            try{
                const mangeorderid = await pool.request()
                        .query(`select order_id from orders order by order_id desc  offset 0 rows fetch next 1 rows only`)
                for(var i=0 ; i<result.recordset.length ; i++){
                    // console.log(`update products set stock = stock-${result.recordset[i].quantity} where product_id = ${result.recordset[i].product_id}`)
                    const result2 = await pool.request()
                    .query(`update products set stock = stock-${result.recordset[i].quantity} where product_id = ${result.recordset[i].product_id}`)
                    // console.log(result2)
                    const result3 = await pool.request()
                    .query(`select stock,price from products where product_id = ${result.recordset[i].product_id}`)
                    if(result3.recordset[0].price < 0){
                        const stock_error = await pool.request()
                        .query("rollback transaction")
                    }
                    else{
                        
                        // console.log(mangeorderid)
                        if(mangeorderid.recordset.length == 0){
                            // console.log(`insert into orders(user_id,product_id,product_quantity,product_amount,status,address,order_id) values(${user_id}, ${result.recordset[i].product_id},${result.recordset[i].quantity},${result3.recordset[0].price} * ${result.recordset[i].quantity},0,'${address}',1)`)
                            const result4 = await pool.request()
                            .query(`insert into orders(user_id,product_id,product_quantity,product_amount,status,address,order_id) values(${user_id}, ${result.recordset[i].product_id},${result.recordset[i].quantity},${result3.recordset[0].price} * ${result.recordset[i].quantity},0,'${address}',1)`)
                        }
                        else{
                            const result5 = await pool.request()
                            .query(`insert into orders(user_id,product_id,product_quantity,product_amount,status,address,order_id) values(${user_id}, ${result.recordset[i].product_id},${result.recordset[i].quantity},${result3.recordset[0].price} * ${result.recordset[i].quantity},0,'${address}', ${mangeorderid.recordset[0].order_id + 1})`)
                        }
                        const clearcart = await pool.request()
                        .query(`truncate table cart`)
                    }
                }
                
                const trans = await pool.request()
                .query("commit transaction")
                return "200"
            }
            catch(err){
                console.log("ennlksdnvlkjdsnvlkjn")
                console.log(err)
                const error = await pool.request()
                .query("rollback transaction")
                return "404"
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
    return result; 
}
