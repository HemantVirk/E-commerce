function checkAuth(req,res,next){

    if(req.session.is_logged_in && req.session.acc.isVerified){
        next()
        return
    }
    else if(req.session.is_logged_in && !req.session.acc.isVerified){
        console.log(req.session.is_logged_in)
        console.log(req.session.acc.isVerified)
        res.render("notVerified")
        return
    }
    else
        res.render('buyer',{name: "Account"})
}
module.exports = checkAuth  