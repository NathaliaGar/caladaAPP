import { Component, OnInit, ViewChild } from '@angular/core';
import { Routes } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  @ViewChild('usernameinput') usernameinput;
 
  public logo = 'assets\\img\\logo1.png';
  public username;
  public password;
  public messageError = '';
  constructor(private storage: Storage, private http: HttpClient, public loadingController: LoadingController) { 

    this.storage.get("logado").then(function (value) {
      if (value != null) {
        
        window.localStorage.setItem("logado", value);

        document.location.href = "/home"
      }
      else {
        
        window.localStorage.removeItem("logado");

      }
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde',
      duration: 10000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }


  ngOnInit() {
    this.usernameinput.setFocus()
  }

  async signIn() {

    const loading = await this.loadingController.create({
      message: 'Aguarde'
    });
    loading.present();
    
      this.messageError = '';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };  
      this.http.post("http://caladanuncamais.azurewebsites.net/api/login", {    
            "Usuario" : this.username,
            "Senha" : this.password
      }, httpOptions).subscribe((res)=>{

        
        console.log("loginn", res)
        if(res != null && res != '')
        {          
          window.localStorage.setItem("logado", JSON.stringify(res));
          
          this.storage.set('logado', JSON.stringify(res));

          window.location.href = "/home";
        }
        else
          this.messageError = 'Login e senha inválidos';

          loading.dismiss();
        
    },
    (err) => {
    
      loading.dismiss();
      alert('Login inválido')
    
    });
      
    }
  signUp() {

    window.location.href = "/cadastro";
    // Parse.User.signUp(this.username, this.password).then((resp) => {
    //   console.log('Logged in successfully', resp);

    //   // Clears up the form
    //   this.username = '';
    //   this.password = '';

    //   this.toastCtrl.create({
    //     message: 'Account created successfully',
    //     duration: 2000
    //   }).present();
    // }, err => {
    //   console.log('Error signing in', err);

    //   this.toastCtrl.create({
    //     message: err.message,
    //     duration: 2000
    //   }).present();
    // });
  }

}
