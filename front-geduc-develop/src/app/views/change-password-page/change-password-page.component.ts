import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.sass']
})
export class ChangePasswordPageComponent implements OnInit {
  hide = true;
  changePasswordForm: FormGroup;
  passwordsValidator: boolean  = false;
  isLoading: boolean =false;
  constructor(private fb: FormBuilder, private authService: AuthService, public spinnerService: SpinnerService, private snackBar: MatSnackBar, private router: Router) {
    this.changePasswordForm = this.fb.group(
      {
        registration: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordConfirmation: ['', [Validators.required, Validators.minLength(5)]],
      });
   }

  ngOnInit(): void {
  }

  submitRegister(){
    this.isLoading = true;
    let dataRegister = this.changePasswordForm.getRawValue();
    if(this.changePasswordForm.valid){
      if(dataRegister.password == dataRegister.passwordConfirmation){
        this.passwordsValidator = false;
        delete dataRegister.passwordConfirmation;
        this.authService.changePassword(dataRegister).subscribe(() =>{
          this.isLoading = false;
          this.snackBar.open("Senha alterada com Sucesso", 'X', {
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
