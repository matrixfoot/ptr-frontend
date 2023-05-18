import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { stringify } from 'querystring';
import { MustMatch } from '../_helpers/must-match.validator';
import { AlertService } from '../_helpers/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-collab-user-create',
  templateUrl: './collab-user-create.component.html',
  styleUrls: ['./collab-user-create.component.scss']
})
export class CollabUserCreateComponent implements OnInit {

 

  signupForm: FormGroup;
  loading = false;
  errorMessage: string;
  isSuccessful = false;
  isSignUpFailed = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private alertService: AlertService
              ) { }

  ngOnInit() {
    
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      confirmpassword: [null, Validators.required],
      firstname: [null, Validators.required],
      confirmemail: [null, Validators.required],
      mobile: [null, Validators.required],
      confirmmobile: [null, Validators.required],
      usertype: [null, Validators.required],
      lastname: [null, Validators.required],
      fonction: [null],
      secteur: [null],
      civilite: [null,Validators.required],
      nature: [null,Validators.required],
      raisonsociale: [null],
      nomsociete: [null],
      clientcode: [null, Validators.required],
      role: [ {value: "basic", disabled: true},Validators.required],
    },
    {
      validator: [MustMatch('email','confirmemail'),MustMatch('mobile','confirmmobile')]
    });
    this.signupForm.reset();
  }
  get f() { return this.signupForm.controls; }
  randomString() {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVW";
    var string_length = 1;
    var randomstring = '';
    var chars2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var string_length2 = 2;
    var randomstring2 = '';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    for (var j=0; j<string_length2; j++) {
      var rnum2= Math.floor(Math.random() * chars2.length);
      randomstring2 += chars2.substring(rnum2,rnum2+1);
    }
    this.signupForm.patchValue({clientcode: randomstring+randomstring2});
  }
  onSignup() {
    this.loading = true;
    this.submitted = true;
    if (this.signupForm.invalid) {
      
      return this.loading = false;
  }
    const email = this.signupForm.get('email').value;
    
    const mobile = this.signupForm.get('mobile').value;
    const usertype = this.signupForm.get('usertype').value;
    
    const password = this.signupForm.get('password').value;
    const confirmpassword = this.signupForm.get('confirmpassword').value;
    const firstname = this.signupForm.get('firstname').value;
    const lastname = this.signupForm.get('lastname').value;
    const fonction = this.signupForm.get('fonction').value;
    const secteur = this.signupForm.get('secteur').value;
    const civilite = this.signupForm.get('civilite').value;
    const nature = this.signupForm.get('nature').value;
    const raisonsociale = this.signupForm.get('raisonsociale').value;
    const nomsociete = this.signupForm.get('nomsociete').value;
    const clientcode = this.signupForm.get('clientcode').value;
    const role = this.signupForm.get('role').value;
    this.auth.register(email, password,confirmpassword,mobile,usertype,firstname,lastname,fonction,secteur,civilite,nature,raisonsociale,nomsociete,clientcode,role).subscribe({

      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'inscription réalisée avec succès, veuillez cliquer sur le lien de vérification envoyé à votre adresse Email pour pouvoir se connecter',
          showConfirmButton: false,
          timer: 10000
        });
        
        
        this.loading = false;
        this.router.navigate(['login']);
      },
      error: error => {
        this.loading=false;
          
      }
    });

  }
  onReset() {
    this.submitted = false;
    this.signupForm.reset();
}
}
