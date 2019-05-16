import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CadastroPage } from './cadastro.page';
import { BrMaskerModule } from 'br-mask';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    BrMaskerModule,
    RouterModule.forChild([
      {
        path: '',
        component: CadastroPage
      }
    ])
  ],
  declarations: [
    CadastroPage
  ]
})
export class CadastroPageModule {}
