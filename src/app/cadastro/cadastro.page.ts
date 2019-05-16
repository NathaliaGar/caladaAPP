import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
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


  cadastrar() {

    this.submitAttempt = true;
    console.log(this.todo.get('senha'));

    
    if (!this.todo.valid) {
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
      else
        alert('Usuário já cadastrado');

    },
      (err) => {
        alert('Campos inválidos')
      });
    // .subscribe(data =>
    //   function (){
    //   // When observable resolves, result should match test data
    //   console.log("cadastroo", data)
    //   if(data != null && data != '')
    //     alert('Cadastro efetuado com sucesso');
    //   else
    //     alert('Usuário já cadastrado');
    //   }
    // )





  }
  cancelar() {
    window.location.href = "/login";
  }
  ngOnInit() {
    console.log(this.todo.get('senha'));
    // console.log( this.fooForm );
  }


  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
