const Login = require('../models/LoginModel')

exports.index = (_req, res) => {
    res.render('login');
};

exports.register = async function (req, res) {
    try{
        const login = new Login(req.body);
    await login.register();

    if(this.errors.lenght > 0){//se tiver algum erro
        req.flash('ERRORS', login.errors);//exibe uma mensagem 
        req.session.save(function() {//salva a sessão
           return res.redirect('/login/index');//retorna para a página anterior
        });
        return;//return para sair do laço if
    }
    return res.send(login.errors);
    }catch(e){
        console.log(e);
        return res.render('erro');
    }
};