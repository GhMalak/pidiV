import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CertificateModel } from 'src/app/models/certificate.model';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CertificateService {
    message: string = '';
    constructor(private http: HttpClient, private notificationService: NotificationService, private snackBar: MatSnackBar, private router: Router) { }

    getCertificates(registration: string){
        return this.http.get<Array<CertificateModel>>(environment.GEDUC_API + `/v1/certificate/${registration}`)
    }

    generateCertificate(eventNumber: string, registration: string){
        return this.http.post<void>(environment.GEDUC_API + `/v1/certificate/${eventNumber}/${registration}`, {}).pipe(tap(() => {
            this.notificationService.getNotifications(registration).subscribe(() => {
                this.message = "Certificado gerado com Sucesso. "
                this.showMessages(this.message);
            });
        }));
    }

    showMessages(message: string): void {
        this.snackBar.open(message, 'X', {
          duration: 5000,
          panelClass: ['green-snackbar']
        });
        this.router.navigate(['home'])
      }

}