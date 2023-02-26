module.exports = async function plusMinus(id, task, connect) {
    connect()
    async function plus() {
        if (task == "plus") {
            const pool = await connect();
            try {
                const result1 = await pool.request()
                    .query("UPDATE cart SET quantity = quantity + 1 WHERE product_id = '" + id + "'");
                return result1
            } catch (err) {
                console.log('Error executing query:', err);
                throw err; // optionally rethrow the error
            } finally {
                pool.close();
            }
        }
        else if(task == "minus"){

            const pool = await connect();
            try {
                const result1 = await pool.request()
                    .query("UPDATE cart SET quantity = quantity - 1 WHERE product_id = '" + id + "'");
                return result1
            } catch (err) {
                console.log('Error executing query:', err);
                throw err; // optionally rethrow the error
            } finally {
                pool.close();
            }

        }
        else{
            const pool = await connect();
            try {
                const result1 = await pool.request()
                    .query("DELETE FROM cart WHERE product_id = '" + id + "'");
                return result1
            } catch (err) {
                console.log('Error executing query:', err);
                throw err; // optionally rethrow the error
            } finally {
                pool.close();
            }

        }
    }


    const result = await plus();
    return result;


}
