

async function verificationUser(token,connect){
    // console.log("isver : " + cridential)
    connect()
    async function getVerified() {
        const pool = await connect();
        try {
            const result = await pool.request()
            .query("update users set is_verified = '" + 1 + "'where mail_token = '" + token + "'");
            // console.log("error:" +result);
            const role = await pool.request()
            .query("select role from users where mail_token = '" + token + "'")
            const result2 = await pool.request()
            .query("select * from users where mail_token = '" + token + "'");
            return {result:result2, role:role.recordset[0].role}
        } catch (err) {
            console.log('Error executing query:', err);
            throw err; // optionally rethrow the error
        } finally {
            pool.close();
        }
    }

    const result = await getVerified();
    return result;
    // return getAvailability();
}

module.exports = verificationUser