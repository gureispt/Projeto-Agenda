const mongoose = require('mongoose');
const validator = require('validator');

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

    async register(){
        this.valida();
        if(this.errors.length > 0) return;
        try{
            this.user = await LoginModel.create(this.body);
        }catch(e){
            console.error(e);
        }
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