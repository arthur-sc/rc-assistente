import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { NavController } from "@ionic/angular";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = ""
  senha: string = ""

  constructor(public afAuth: AngularFireAuth, public nav: NavController) {

  }

  ngOnInit() {
  }

  async onLogin(){

    const { usuario, senha } = this

    try{
      const res = await this.afAuth.auth.signInWithEmailAndPassword(usuario, senha)
      if(Object.keys(res).length > 0){
        this.nav.navigateForward('start');
        if(this.senha === '123456'){
          this.afAuth.auth.sendPasswordResetEmail(this.usuario);
        }
      }
    }
    catch(err){
      console.dir(err)
      if(err.code === 'auth/user-not-found'){
        console.dir('usuário inválido')
      }
    }
    
  }

}
