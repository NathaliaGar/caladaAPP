import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private http: HttpClient, private geolocation: Geolocation, private storage: Storage, public loadingController: LoadingController) {


  }
  public logo = 'assets\\img\\logo2.png';
  logOut() {

    window.localStorage.removeItem("logado");

    this.storage.remove("logado");

    window.location.href = "/login";
    // Parse.User.logOut().then((resp) => {
    //   console.log('Logged out successfully', resp);

    //   this.navCtrl.setRoot('LoginPage');
    // }, err => {
    //   console.log('Error logging out', err);

    //   this.toastCtrl.create({
    //     message: 'Error logging out',
    //     duration: 2000
    //   }).present();
    // })
  }
  async gritar() {


    const loading = await this.loadingController.create({
      message: 'Gritando...'
    });
    loading.present();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true, timeout: 5000,
      maximumAge: 0
    }).then((resp) => {


      console.log(resp.coords.latitude);

      const obj = window.localStorage.getItem("logado")

      if (obj != null) {
        var objt = JSON.parse(obj);
        console.log(objt);
        this.http.post("http://caladanuncamais.azurewebsites.net/api/alertas", {
          "Nome": objt.nome,
          "Endereco": objt.endereco,
          "Latitude": resp.coords.latitude,
          "Longitude": resp.coords.longitude
        }, httpOptions)
          .subscribe((data) => {
    
              loading.dismiss();
              alert('Enviado com sucesso');
              // When observable resolves, result should match test data
              
              console.log(data)
            },
            (err) => {
              loading.dismiss();
              alert('ERRO Subs ' + JSON.stringify(err))
            }
          )
      }
      else {

        this.http.post("http://caladanuncamais.azurewebsites.net/api/alertas", {
          "Nome": "Nathalia Garcia 2",
          "Endereco": "Rua dona gertrudes jordão, 257",
          "Latitude": resp.coords.latitude,
          "Longitude": resp.coords.longitude
        }, httpOptions)
          .subscribe(data =>
            function () {
              loading.dismiss();
              // When observable resolves, result should match test data
              alert('Enviado com sucesso')
              console.log(data)
              alert('Data ' + JSON.stringify(data))
            },
            (err) => {
              loading.dismiss();
              alert('ERRO Subs ' + JSON.stringify(err))
            }
          )
      }



    }).catch((error) => {
      loading.dismiss();
      alert('Tente novamente, código: ' + error.code)
      alert('Tente novamente, mensagem: ' + error.message)
      console.log('Error getting location', error);
    });



  }

}
