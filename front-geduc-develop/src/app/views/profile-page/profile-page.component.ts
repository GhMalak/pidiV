import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { MenuModel } from '../../models/menu.model';
import { ModalAvatarComponent } from './modal-avatar/modal-avatar.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.sass']
})
export class ProfilePageComponent implements OnInit {
  loggedUser: User;
  avatar: SafeUrl = "assets/foto-event.png";
  menuItems: Array<MenuModel> = [
    {
      name: 'Perfil',
      icon: 'person',
      path: 'personal'
    },
    {
      name: 'Certificados',
      icon: 'beenhere',
      path: 'certificates'
    },
    {
      name: 'Meus eventos',
      icon: 'videocam',
      path: 'my-events'
    },
    {
      name: 'Sair',
      icon: 'exit_to_app',
    },
  ];
  

  constructor(
    public spinnerService: SpinnerService,
    public authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.authService.getLoggedUserEndpoint(this.loggedUser.registration).subscribe(response => {
      this.authService.setStorage(response);
      this.loggedUser = this.authService.getLoggedUser();
      if (this.loggedUser.avatar) {
        this.b64toBlob(this.loggedUser.avatar.files[0].bytes, this.loggedUser.avatar.files[0].contentType, '', this.loggedUser.avatar.files[0].name);
      }
    });
  }

  executarOpcao(menu){
    if(menu.name === 'Sair') {
      const dialogRef = this.dialog.open(ModalConfirmComponent, {
        data: {
          title: 'Sair',
          message: 'Tem certeza que deseja sair?',
          buttonConfirmText: 'Sair',
          buttonCancelText: 'Fechar'
        },
        height: '180px',
        width: '400px'
      })
  
      dialogRef.afterClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.authService.logout();
          this.router.navigate(['../login'])
        }
      })
    }

  }

  openAvatarModal() {
    const dialogRef = this.dialog.open(ModalAvatarComponent, {})

    dialogRef.afterClosed().subscribe(() => {

    })
  }

  b64toBlob(b64Data, contentType, sliceSize, name) {
    contentType = contentType || 'video/*';
    sliceSize = sliceSize || 512;
  
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
    
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    var blob = new Blob(byteArrays, {type: contentType});
    blob = blob.slice(0, blob.size, contentType)
    var file = new File([blob], name, {type: contentType} )
    var url = URL.createObjectURL(file);

    this.avatar = this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  ngAfterContentChecked(){
    this.cd.detectChanges();
  }
}
