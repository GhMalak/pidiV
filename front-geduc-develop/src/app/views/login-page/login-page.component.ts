import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPage implements OnInit{
  hide = true;
  loginForm: FormGroup;
  mostraWarningCredencial: boolean;

  constructor(private fb: FormBuilder, public authService: AuthService, private snackBar: MatSnackBar, private router: Router, public spinnerService: SpinnerService) {
    this.loginForm = this.fb.group(
      {
        registration: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }
  ngOnInit(): void {
    this.mostraWarningCredencial = false;
  }

  submit(){
    let dataLogin = this.loginForm.getRawValue();
    if(this.loginForm.valid){
      this.authService.login(dataLogin).subscribe(
        () => {
          this.snackBar.open("Usuário Logado com Sucesso", 'X', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          this.router.navigate(['/home']);
          this.mostraWarningCredencial = false;   
        }, 
        (error) => {
          if(error.status === 422){
            this.mostraWarningCredencial = true;
          } else {
            this.mostraWarningCredencial = false;
          }
        }
      );
    }
  }
}
