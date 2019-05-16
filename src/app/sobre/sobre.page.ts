import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-sobre',
  templateUrl: 'sobre.page.html',
  styleUrls: ['sobre.page.scss'],
})
export class SobrePage {

  constructor(private http: HttpClient, private geolocation: Geolocation) {


  }
  public logo = 'assets\\img\\logo2.png';


    
  

}
