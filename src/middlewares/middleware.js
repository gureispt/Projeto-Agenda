exports.myMiddleware = (_req, res, next) => {
    res.locals.localVariable = 'está é uma variável local'
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