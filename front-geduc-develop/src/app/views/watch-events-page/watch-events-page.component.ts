import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { unescape } from 'querystring';
import { Observable } from 'rxjs';
import { EventModel } from 'src/app/models/event.model';
import { NotificationModel } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CertificateService } from 'src/app/shared/services/certificate.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-watch-events-page',
  templateUrl: './watch-events-page.component.html',
  styleUrls: ['./watch-events-page.component.sass']
})
export class WatchEventsPageComponent implements OnInit {
  event: any;
  files: Array<File> = [];
  fileCoded: Array<any> = [];
  video: HTMLVideoElement;
  loggedUser: User;
  notifications$: Observable<Array<NotificationModel>>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService,
    private authService: AuthService,
    private certificateService: CertificateService,
    public spinnerService: SpinnerService
  ) { }
  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.activatedRoute.queryParams.subscribe((params) => {
      this.event = params;
      this.getFilesOfEVent(this.event.filesId)
    })
  }
 
  getFilesOfEVent(filesId: string): void {
    this.storageService.getFiles(filesId).subscribe((response) => {
      response.files.forEach((file) => {
        this.b64toBlob(file.bytes, file.contentType, '',file.name)
      });
    })
  }

  b64toBlob(b64Data, contentType, sliceSize, name): Blob {
    var name = name.slice(0,name.length-4)
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
    
      var byteArray = new Uint8Array(byteNumbers);
    
      this.fileCoded.push(byteNumbers)
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    blob = blob.slice(0, blob.size, contentType)
    var file = new File([blob], name, {type: contentType} )
    var url = URL.createObjectURL(file);
    this.video = document.getElementsByTagName('video')[0];
    this.video.src = url;
    this.video.load();
    
    this.files.push(file);
    // this.files.reverse();
    this.files = this.files.sort((a, b) => (a.name < b.name) ? -1 : 1);
    
    return blob;
  }

  showSelectedVideo(file: any){
    var url = URL.createObjectURL(file);
    this.video = document.getElementsByTagName('video')[0];
    this.video.src = url;
    this.video.load();
  }

  generateCertificate(){
    this.certificateService.generateCertificate(this.event.eventNumber, this.loggedUser.registration).subscribe();
  }

}
