// import validator from 'validator';

// export default class Login{
//     constructor(formClass){
//         this.form = document.querySelector(formClass);
//     }

//     start(){
//         this.events();
//     }

//     events(){
//         if(!this.form) return;
//         this.form.addEventListener('submit', e => {
//             e.preventDefault();
//             this.valida(e);
//         });
//     }

//     valida(e){
//         const el = e.target;
//         const emailInput = el.querySelector('input[name="email"]');
//         const passwordInput = el.querySelector('input[name="password"]');
//         let error = false;

//         if(!validator.isEmail(emailInput.value)){
//             alert('Email inválido');
//             error = true;
//         }

//         if(passwordInput.value.lenght < 3 || passwordInput.value.lenght > 50){
//             alert('Senha precisa ter entre 3 e 50 caracteres');
//             error = true;
//         }

//         if(!error) el.submit();
//     }
// }