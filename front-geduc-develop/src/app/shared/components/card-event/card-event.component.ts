import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EventModel } from 'src/app/models/event.model';
import { AuthService } from '../../services/auth.service';
import { ModalSubscribeComponent } from '../modal-subscribe/modal-subscribe.component';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.sass']
})
export class CardEventComponent implements OnInit {
  @Input()
  event: EventModel;

  showCard: boolean = false;

  thumbnail: SafeUrl = "assets/foto-event.png";

  constructor(public dialog: MatDialog, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.event.thumbnail) {
      this.b64toBlob(this.event.thumbnail?.files[0].bytes, this.event.thumbnail?.files[0].contentType, '', this.event.thumbnail?.files[0].name)
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalSubscribeComponent, {
      data : {
        event: this.event,
        thumb: this.thumbnail
      },
      panelClass: ['modal-padding']
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  b64toBlob(b64Data, contentType, sliceSize, name): Blob {
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

    this.thumbnail = this.domSanitizer.bypassSecurityTrustUrl(url);
    
    return blob;
  }

}
