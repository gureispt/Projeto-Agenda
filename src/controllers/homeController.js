exports.homePag = (req, res) => {
    console.log(req.flash('info'));
    res.render('index', {
        title: 'Título da página',
        numbers: [0, 2, 4, 6, 8, 10]
    });
    return;
};

exports.form = (req, res) => {
    res.send(req.body);
    return;
}