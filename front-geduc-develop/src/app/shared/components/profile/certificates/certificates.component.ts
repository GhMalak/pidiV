import { Component, OnInit } from '@angular/core';
import { CertificateModel } from 'src/app/models/certificate.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CertificateService } from 'src/app/shared/services/certificate.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.sass']
})
export class CertificatesComponent implements OnInit {

  certificates: Array<CertificateModel> = [];
  loggedUser: User;

  constructor(public spinnerService: SpinnerService, private certificateService: CertificateService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.certificateService.getCertificates(this.loggedUser.registration).subscribe(response => {
      this.certificates = response;
    })
  }

}
