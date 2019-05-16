import { Component, OnInit, ViewChild } from '@angular/core';
import { Routes } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  constructor(private http: HttpClient) { 


  }

  ngOnInit() {
    this.usernameinput.setFocus()
  }

  signIn() {





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
   
          window.location.href = "/home";
        }
        else
          this.messageError = 'Login e senha inválidos';
        
    },
    (err) => {alert('Login inválido')});
      
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
