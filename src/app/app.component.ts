import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      isVisible: this.verificaLogado()
    },
    {
      title: 'Sobre Nós',
      url: '/sobre',
      icon: 'md-female',
      isVisible: this.verificaLogado()
    },
    {
      title: 'Infos',
      url: '/info',
      icon: 'md-information-circle',
      isVisible: this.verificaLogado()
    },
    {
      title: 'Sair',
      url: '/login',
      icon: 'exit',
      isVisible: this.verificaLogado()
    }
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

     
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

     
  }
  verificaLogado()
  {
    return window.localStorage.getItem("logado");
  }

}
