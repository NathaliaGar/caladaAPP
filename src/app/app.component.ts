import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public logado = false;

  public appPages = [
    {
      title: 'Gritar!!!',
      url: '/home',
      icon: 'md-megaphone',
      click: '',
      isVisible: this.verificaLogado()
    },
    {
      title: 'Sobre Nós',
      url: '/sobre',
      icon: 'md-female',
      click: '',
      isVisible: this.verificaLogado()
    },
    {
      title: 'Infos',
      url: '/info',
      icon: 'md-information-circle',
      click: '',
      isVisible: this.verificaLogado()
    },
    {
      title: 'Sair',
      url: '',
      icon: 'exit',
      isVisible: this.verificaLogado()
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage) {
    this.initializeApp();
  }

  efetuarLogout() {

    this.storage.remove("logado");

    window.localStorage.removeItem("logado");

    window.location.href = "/login";


  }
  initializeApp() {

 
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


  }
  verificaLogado() {
    return window.localStorage.getItem("logado");
  }

}
