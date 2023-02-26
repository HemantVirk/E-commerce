// const sendEmail = require("./sendEmail");


module.exports = async function userSignup(cridentials, connect, sendEmail) {
    console.log("usersignup called")

    connect()
    async function getAvailability() {
        console.log("getAvail called")
        const pool = await connect();
        try {
            const result = await pool.request()
                .query("SELECT * FROM users WHERE email = '" + cridentials.email + "'");
            console.log("result of read: " + JSON.stringify(result))
            return result;
        } catch (err) {
            console.log('Error executing query:', err);
            throw err; // optionally rethrow the error
        } finally {
            pool.close();
        }
    }

    
    async function writeDb(forBoth) {
        if (forBoth) {
            const pool = await connect();
            try {
                var passwordcheck = await pool.request()
                    .query("select * from users where email = '" + cridentials.email + "'");
                console.log(passwordcheck)
            } catch (err) {
                console.log('Error executing query:', err);
                throw err; // optionally rethrow the error
            } finally {
                pool.close();
            }

            console.log(passwordcheck.recordset[0].role)
            console.log(cridentials.password)
            if (passwordcheck.recordset[0].password == cridentials.password) {

                console.log("writeDb called")
                const pool = await connect();
                try {
                    const result = await pool.request()
                        .query("update users set role = '" + 2 + "' where email = '" + cridentials.email + "'");
                    console.log(result)
                    return {result: result,isVerified: 1}
                } catch (err) {
                    console.log('Error executing query:', err);
                    throw err; // optionally rethrow the error
                } finally {
                    pool.close();
                }
            }
            else {
                console.log("hn ye to chlna chahiye")
                console.log(passwordcheck.recordset[0].role)
                if (passwordcheck.recordset[0].role == 0) {
                    console.log("Choose same password as of your Buyer Account")
                    return { result: "choose_buyer", isVerified: 0 };
                }
                else if (passwordcheck.recordset[0].role == 1) {
                    console.log("Choose same password as of your Vendor Account")
                    return { result: "choose_vendor", isVerified: 0 };
                }
            }
        }
        else {
            console.log("writeDb called")
            const pool = await connect();
            try {
                const result = await pool.request()
                    .query("insert into users(name, email, phone, password, is_verified, role, mail_token) values ('" + cridentials.username + "','" + cridentials.email + "','" + cridentials.phone + "','" + cridentials.password + "','" + cridentials.isVerified + "','" + cridentials.role + "','" + cridentials.mailToken + "')");
                console.log(result)
                return result;
            } catch (err) {
                console.log('Error executing query:', err);
                throw err; // optionally rethrow the error
            } finally {
                pool.close();
            }
        }
    }


    const result = await getAvailability();
    if (JSON.stringify(result.recordset) == "[]") {

        var subject = "Verify Account"
        var text = "Click to verify your account"
        const resemail = await sendEmail(cridentials.email, cridentials.mailToken, subject, text)
        try {
            if (resemail.Messages[0].Status == 'success') {
                // console.log(resemail)

                const result2 = await writeDb(false)
                return { result: result2, isVerified: result.recordset[0].is_verified }
            }
            else {
                console.log("Email no found!!")
                return { result: "Email no found!!", isVerified: 0 };
            }
        } catch (err) {
            console.log(err);
            return err
        }

    }
    else if (result.recordset[0].role == cridentials.role || result.recordset[0].role == 2) {
        return { result: "Already Signedup", isVerified: result.recordset[0].is_verified };
    }
    else {
        const result2 = await writeDb(true)
        return result2
    }


}
