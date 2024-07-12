const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado')
    return res.render('login');
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
    req.session.user = login.user;
            req.session.save(function(){
                return res.redirect('/login/index');
            });

    }catch(e){
        console.error(e);
        return res.render('404');
    }
};

exports.access = async function(req, res) {
    try {
      const login = new Login(req.body);
      await login.access();
  
      if(login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function() {
          return res.redirect('/login/index');
        });
        return;
      }
  
      req.flash('success', 'Você entrou no sistema.');
      req.session.user = login.user;
      req.session.save(function() {
        return res.redirect('/login/index');
      });
    } catch(e) {
      console.log(e);
      return res.render('404');
    }
  };

  exports.logout = function(req, res){
    req.session.destroy();
    res.redirect('/');
  }