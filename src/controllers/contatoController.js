const Contato = require('../models/ContatoModel');

exports.index = (req, res) => {
    res.render('contato', {
        contato: {}
    });
}
exports.register = async (req, res) => {
    try{
        const contato = new Contato(req.body);
        await contato.register();
        if(contato.errors.lenght > 0){
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/'));
            return;
        }
        req.flash('success', 'Contato salvo');
            req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
            return;
    }catch(e){
        console.error(e);
        return res.render('404');
    }
}

exports.edit = async (req, res) => {
    if(!req.params.id) return res.render('404');
    const contato = await Contato.searchId(req.params.id);

    if(!contato) return res.render('404');

    res.render('contato', { contato });
}

exports.editContato = async (req, res) => {
    try{
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.editContato(req.params.id);
        if(contato.errors.lenght > 0){
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('/'));
            return;
        }
        req.flash('success', 'Contato editado com sucesso');
            req.session.save(() => res.redirect(`/contato/index/${req.params._id}`));
            return;
    }catch(e){
        console.error(e)
        return res.render('404');
    }
}

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404'); //verifica se existe o id
    const contato = await Contato.delete(req.params.id); 
    if(!contato) return res.render('404'); //retorna a página de erro caso não exista contato

    req.flash('success', 'Contato excluído com sucesso');
    req.session.save(() => res.redirect('/'));
    return;
}