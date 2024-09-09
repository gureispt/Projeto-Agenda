require('dotenv').config(); //variáveis de ambiente configuradas no arquivo .env

const express = require('express'); //importando express
const app = express(); //iniciando express
const MongoStore = require('connect-mongo'); //importanto o mongoose


app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONSTRING, // Usando a mesma string de conexão do mongoose
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }).then(() => {
        app.emit('pronto')
    }).catch( error => console.error(error))
}));

// mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
 //conectando o mongoose a base de dados

const session = require('express-session'); //importando a session, salva os cookies 
const MongoStore = require('connect-mongo'); //salvar as sessões no BD ao invés do padrão que é na memória
const flash = require('connect-flash'); //manda mensagens de erro por exemplo, salva nas seções
const routes = require('./routes'); //rotas da aplicação
const path = require('path'); //caminhos, resolver e etc
const helmet = require('helmet'); //biblioteca para a segurança web
const csrf = require('csurf'); //um token para formulários
const { checkCsrfError, csrfMiddleware, MiddlewareGlobal } = require('./src/middlewares/middleware'); //funções executadas na rota

app.use(helmet());//usando o helmet
app.use(helmet.referrerPolicy({policy: ["origin", "unsafe-url"]}));
app.use(express.urlencoded({extended: true}));//permitindo postar formulários para dentro da aplicação
app.use(express.json());//postar arquivos tipo json
app.use(express.static(path.resolve(__dirname, 'public')));//permite acesso a arquivos estáticos

const sessionOptions = session({//configuração da seção
    secret: 'keyboard cat',
    //store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave:false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24 * 7, //tempo q vai durar o cookie (7dias)
        httpOnly:true
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING})
});
 
app.use(sessionOptions);//usando a função
app.use(flash());//usando as flash messages

app.set('views', path.resolve(__dirname, 'src', 'views'));//configuração da view
app.set('view engine', 'ejs');//engine para renderizar o html

app.use(csrf());//usando o csrf
app.use(MiddlewareGlobal);//usando os middlewares
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);//usando as rotas

app.on('pronto', () => {//quando a condição de conexão com o banco for verdadeira, o app irá escutar na porta 3000
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000');
        console.log('Servidor rodando!');
    });
});
