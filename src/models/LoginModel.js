const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async access(){
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({email: this.body.email });

        if(!this.user) {
            this.errors.push('Usuário não existe');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }

    async register(){
        this.valida();//checa os dados enviados pelo formulário
        if(this.errors.length > 0) return; //se ocorrer algum erro é parado aqui

        await this.usersExists();//verifica se o usuário já existe

        if(this.errors.length > 0) return;//retorna se tiver algum erro de novo

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async usersExists(){
        this.user = await LoginModel.findOne({email: this.body.email });
        if(this.user) this.errors.push('Usuário já existe');
    }

    valida(){
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');//valida o email
        }
        if(this.body.password.lenght < 3 || this.body.password.lenght > 50) {//valida a senha
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres');
        } 
    }

    cleanUp(){
        for(const key in this.body){//limpa os campos
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {//garante q só é mandado para o banco de dados o e-mail e senha.
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;