import clipboardy from 'clipboardy';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import ansiColors from 'ansi-colors'

//attribuer des options a mon passeword 
yargs(hideBin(process.argv))
  .command('pwgen', 'generate password', () => {}, (argv) => {
    console.log(argv)
    console.info("longueur pwd :" + argv._[1])
    let pwdlength = argv._[1]
    let pwd = makePwd(pwdlength) 
    console.log(pwd);
    if (argv.c) {// placer mdp dans le pressp
      clipboardy.writeSync(pwd);
      console.log("je copie le mot de passe");
    } 
    //colorer les caracteres specieux en bleu
    let specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (argv.d){
      for(let i=0; i < pwd.length; i++){
        if (pwd[i].match("specialChar")){
          ansiColors.red(pwd[i]);
          //colorer les chiffres en bleu;  
          }else if (pwd[i].preg_match("/\d/")){
          ansiColors.blue(pwd[i]);
        } 
      }
    }
  })
  .demandCommand(1)
  .parse()

//fonction creer mot de passe
function makePwd(length) {

    let result  = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result
  } 

//pour creer un mot de passe avec des symbolles : 
//  creer une chaine de caractere spec a integrer 
// avec  str.insert(caractereSpec) inserer un caractere special aleatoire (chercher la methode) dans mon password;
// un shuffle()
