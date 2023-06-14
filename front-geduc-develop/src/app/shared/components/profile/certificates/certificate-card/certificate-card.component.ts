import { Component, Input, OnInit } from '@angular/core';
import { CertificateModel } from 'src/app/models/certificate.model';

@Component({
  selector: 'app-certificate-card',
  templateUrl: './certificate-card.component.html',
  styleUrls: ['./certificate-card.component.sass']
})
export class CertificateCardComponent implements OnInit {

  @Input()
  certificate: CertificateModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
