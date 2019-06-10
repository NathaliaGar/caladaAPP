import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: 'cadastro.page.html',
  styleUrls: ['cadastro.page.scss']
})


export class CadastroPage implements OnInit {
  // @ViewChild('fooForm') fooForm;
  private todo: FormGroup;
  public submitAttempt = false;

  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];

  public usuario = null;

  validation_messages = {
    'login': [
      { type: 'required', message: 'Login obrigatório.' }
    ],
    'senha': [
      { type: 'required', message: 'Senha obrigatória.' }
    ],
    'nome': [
      { type: 'required', message: 'Nome obrigatório.' }
    ],
    'email': [
      { type: 'required', message: 'E-mail obrigatório.' },
      { type: 'email', message: 'E-mail inválido.' }
    ],
    'telefone': [
      { type: 'required', message: 'Telefone obrigatório.' }
    ],
    'endereco': [
      { type: 'required', message: 'Endereço obrigatório.' }
    ],
    'cpf': [
      { type: 'required', message: 'CPF obrigatório.' }
    ],

  }

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public loadingController: LoadingController) {
    this.todo = this.formBuilder.group({

      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }


  async cadastrar() {

    const loading = await this.loadingController.create({
      message: 'Aguarde'
    });
    loading.present();

    this.submitAttempt = true;
    console.log(this.todo.get('senha'));


    if (!this.todo.valid) {

      loading.dismiss();
      return;
    }


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post("http://caladanuncamais.azurewebsites.net/api/usuario", {

      "Nome": this.todo.value.nome,
      "Endereco": this.todo.value.endereco,
      "Telefone": this.todo.value.telefone,
      "CPF": this.todo.value.cpf,
      "Email": this.todo.value.email,
      "Login": this.todo.value.login,
      "Senha": this.todo.value.senha

    }, httpOptions).subscribe((res) => {
      console.log("cadastroo", res)
      if (res != null && res != '') {

        loading.dismiss();
        alert('Cadastro efetuado com sucesso');
        this.submitAttempt = false;

        this.todo = this.formBuilder.group({

          nome: ['', Validators.required],
          endereco: ['', Validators.required],
          email: ['', Validators.compose([Validators.required, Validators.email])],
          cpf: ['', Validators.required],
          telefone: ['', Validators.required],
          login: ['', Validators.required],
          senha: ['', Validators.required],
        });

      }
      else {
        loading.dismiss();
        alert('Usuário já cadastrado');
      }
    },
      (err) => {
            
        loading.dismiss();
        alert('Campos inválidos')
      });

    
  

  }
  cancelar() {
    window.location.href = "/login";
  }
  ngOnInit() {
  }


}
