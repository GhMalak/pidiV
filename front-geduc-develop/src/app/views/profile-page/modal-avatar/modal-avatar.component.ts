import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
    selector: 'app-modal-avatar',
    templateUrl: './modal-avatar.component.html',
    styleUrls: ['./modal-avatar.component.sass']
})
export class ModalAvatarComponent implements OnInit {

    hasChange: boolean = false;
    avatar: File;
    loggedUser: User;
    isLoading: boolean = false;

    constructor(
        protected dialogRef: MatDialogRef<ModalAvatarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ModalAvatarComponent,
        private authService: AuthService,
        private storageService: StorageService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
        this.loggedUser = this.authService.getLoggedUser();
    }

    onConfirm(): void {
        this.isLoading = true;
        const formData = new FormData();
        formData.append('avatar', this.avatar);
        this.storageService.uploadAvatar(formData, this.loggedUser.registration).subscribe(() => {
            this.isLoading = false;
            this.showMessages("Foto alterada com sucesso.");
            this.dialogRef.close();
        });
    }

    onDismiss(): void {
        this.dialogRef.close();
    }

    inputFileChange(event) {
        this.avatar = event.target.files[0];
        this.hasChange = true;
    }

    showMessages(message: string): void {
        this.snackBar.open(message, 'X', {
          duration: 3000,
          panelClass: ['green-snackbar']
        });
        this.router.navigate(['home'])
      }

}