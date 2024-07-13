const Contato = require('../models/ContatoModel');

exports.index = (req,res) => {
    res.render('contato');
}
exports.register = async (req,res) => {
    try{
        const contato = new Contato(req.body);
        await contato.register();
        if(contato.errors.lenght > 0){
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/'));
            return;
        }
        req.flash('success', 'Contato salvo');
            req.session.save(() => res.redirect('/'));
            return;
    }catch(e){
        console.error(e);
        return res.render('404');
    }
}