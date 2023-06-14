import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tech } from 'src/app/models/tech.model';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.sass']
})
export class SignUpPageComponent implements OnInit {
  hide = true;
  registerForm: FormGroup;
  passwordsValidator: boolean  = false;
  isLoading: boolean =false;
  constructor(private fb: FormBuilder, private authService: AuthService, public spinnerService: SpinnerService, private snackBar: MatSnackBar, private router: Router) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordConfirmation: ['', [Validators.required, Validators.minLength(5)]],
        registration: ['', [Validators.required]],
        techs: []
        });
  }

  ngOnInit(): void {
    
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  techs: Tech[] = [{name: 'Java'}];


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.techs.push({name: value});
    }

    event.input.value = "";

  }

  remove(skill: Tech): void {
    const index = this.techs.indexOf(skill);

    if (index >= 0) {
      this.techs.splice(index, 1);
    }
  }

  submitRegister(){
    this.isLoading = true;
    let dataRegister = this.registerForm.getRawValue();
    dataRegister.techs = this.techs.map(a => a.name)
    if(this.registerForm.valid){
      if(dataRegister.password == dataRegister.passwordConfirmation){
        this.passwordsValidator = false;
        delete dataRegister.passwordConfirmation;
        this.authService.register(dataRegister).subscribe(() =>{
          this.isLoading = false;
          this.snackBar.open("Usuário Cadastrado com Sucesso", 'X', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          this.router.navigate(['/login']);
        },() => {this.isLoading = false;});
      } else {
        this.isLoading = false;
        this.passwordsValidator = true;
      }
    }
  }
}
