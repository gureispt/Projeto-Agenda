exports.myMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    next();
};

exports.checkCsrfError = (err, _req, res, next) => {
    if(err){
        return res.render('erro');
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};