const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async function (req, res) {
    try{
        const login = new Login(req.body);
        await login.register();

        if(login.errors.lenght > 0){//se tiver algum erro
            req.flash('errors', login.errors);//exibe uma mensagem 
            req.session.save(function() {//salva a sessão
            return res.redirect('/login/index');//retorna para a página anterior
        });
        return;//return para sair do laço if
    }

    req.flash('success', 'Seu usuário foi criado com sucesso');
            req.session.save(function(){
                return res.redirect('/login/index');
            });

    }catch(e){
        console.error(e);
        return res.render('404');
    }
};