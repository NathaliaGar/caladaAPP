import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
})
export class InfoPage {

  constructor(private http: HttpClient, private geolocation: Geolocation) {


  }
  public logo = 'assets\\img\\logo2.png';


    
  

}
