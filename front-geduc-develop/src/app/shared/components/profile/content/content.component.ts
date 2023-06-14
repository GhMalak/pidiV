import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ContentService } from 'src/app/shared/services/content.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tech } from 'src/app/models/tech.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent implements OnInit {
  userEmail: string;
  localRegistration: User;
  getRegistration: string;
  loggedUser: User;
  constructor(private authService: AuthService, private contentService: ContentService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.localRegistration = JSON.parse(sessionStorage.getItem('user'));
    this.getLoggedUserEndpoint(this.localRegistration);
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  techs: any[];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.techs.push(value);
    }

    event.input.value = "";

  }

  remove(tech: Tech): void {
    const index = this.techs.indexOf(tech);

    if (index >= 0) {
      this.techs.splice(index, 1);
    }
  }

  getLoggedUserEndpoint(localRegistration: User):void {
    
    this.authService.getLoggedUserEndpoint(localRegistration.registration).subscribe((response) =>{
      this.userEmail = response.email;
      this.techs = response.techs;
      this.getRegistration = response.registration;
    })
  }

  changeUserTechs(){
    const filtro = {
      techs: this.techs
    }
    this.contentService.changeUserTechs(this.getRegistration, filtro).subscribe((response) => {
      this.snackBar.open("Habilidades alteradas com Sucesso", 'X', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
    })
  }

}
