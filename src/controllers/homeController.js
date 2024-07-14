const Contato = require('../models/ContatoModel');

exports.homePag = async (req, res) => {
    const contatos = await Contato.searchContatos();
    res.render('index', { contatos });
};