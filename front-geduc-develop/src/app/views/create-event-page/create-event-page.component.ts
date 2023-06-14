import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { Files } from 'src/app/models/files.model';
import { Tech } from 'src/app/models/tech.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.sass']
})

export class CreateEventPageComponent implements OnInit {
  files: Array<File> = [];
  thumbnail: File = null;
  techs: any[] = [];
  eventForm: FormGroup;
  tempForm: FormGroup;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  loggedUser: User;
  isUpdate: boolean;
  eventReceived: EventModel;
  eventNumber: string;
  sendingEvent: boolean = false;
  hasChangeOn: boolean = false;
  message: string = '';
  isLoading: boolean = false;
  
  constructor(
    public spinnerService: SpinnerService,
    private authService: AuthService, 
    private storageService: StorageService, 
    private eventService: EventService, 
    private fb: FormBuilder, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {

  }
  
  ngOnInit(): void {
    this.eventNumber = this.activatedRoute.snapshot.queryParamMap.get('eventNumber');
    this.isUpdate = this.eventNumber !== null ? true : false;
    if(this.isUpdate){
      const filter = {
        param: 'eventNumber='+this.eventNumber
      }
      this.eventService.getEvents(filter).subscribe((response) => {
        this.eventReceived = response[0];
        this.eventReceived.techs.forEach((tag ) => this.techs.push(tag))
        this.thumbnail = response[0].thumbnail ? this.convertThumbFile(response[0].thumbnail.files[0]) : null;
        this.loadForm();
        this.getFilesOfEVent(this.eventReceived.filesId);
        
      });
    } else {
      this.loadForm();
    }
    this.loggedUser = this.authService.getLoggedUser();
  }
  
  loadForm(): void {
    
    this.eventForm = this.fb.group(
      {
        eventTitle: [this.isUpdate?this.eventReceived.title:'', [Validators.required]],
        eventDescription: [this.isUpdate?this.eventReceived.description:'', [Validators.required]],
        duration: [this.isUpdate?this.eventReceived.duration:'', [Validators.required]],
        techs: [this.techs, [Validators.required]],
        file: [this.files, [Validators.required]],
        thumbnail: [this.isUpdate ? this.thumbnail : '', [Validators.required]]
      }
    );
    this.onCreateGroupFormValueChange();
  }

  inputFileChange(event) {
    if (event.target.files.length > 1){
      for(let i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
        
      }
      this.eventForm.get('file').setValue(this.files);
    } 
    else if (event.target.files && event.target.files[0]) {
      this.files.push(event.target.files[0]);
      this.eventForm.get('file').setValue(this.files);
    }
    this.hasChangeOn = true;
  }

  inputThumbChange(event) {
    this.thumbnail = event.target.files[0];
    this.eventForm.get('thumbnail').setValue(this.thumbnail);
    this.hasChangeOn = true;
  }

  deleteFileOnList(file: File) {
    const index = this.files.indexOf(file)
    if(index >= 0) {
      this.files.splice(index,1);

    }
    this.eventForm.get('file').setValue(this.files);
    this.hasChangeOn = true;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.techs.push(value);
      this.eventForm.get('techs').setValue(this.techs);
    }

    event.input.value = "";
    this.hasChangeOn = true;
  }

  remove(tech: Tech): void {
    const index = this.techs.indexOf(tech);

    if (index >= 0) {
      this.techs.splice(index, 1);
      this.eventForm.get('techs').setValue(this.techs);
    }
    this.hasChangeOn = true;
  }

  createEvent(origin: string) {
    this.isLoading = true;
    this.sendingEvent = true;
    const formData = new FormData();
    const formDataThumb = new FormData();
    formDataThumb.append('thumbnail', this.thumbnail);
    this.files.forEach(file => {
      formData.append('files', file);
    })
    this.storageService.sendFiles(formData).subscribe(response => {
      const eventRequest: EventModel = {
        creatorRegistration: this.loggedUser.registration,
        description: this.eventForm.get('eventDescription').value,
        title: this.eventForm.get('eventTitle').value,
        duration: this.eventForm.get('duration').value,
        filesId: response.filesId,
        techs: this.eventForm.get('techs').value,
      }
      
      if(origin === 'create'){
        this.eventService.createEvent(eventRequest).subscribe((response) => {
          this.storageService.uploadThumbnail(formDataThumb, response.eventNumber).subscribe(() => {
            this.message = "Evento criado com Sucesso. "
            this.isLoading = false;
            this.showMessages(this.message);
          });
        },
        () => {
          this.sendingEvent = false;
        });
      } else {
        //chama o alterar
        this.eventService.editEvents(eventRequest, this.eventNumber).subscribe(()=>{
          this.storageService.uploadThumbnail(formDataThumb, this.eventNumber).subscribe(() => {
            this.message = "Evento alterado com Sucesso. "
            this.showMessages(this.message);
          })
        },
        () => {
          this.sendingEvent = false;
        });
      }
    }, 
    () => {
      this.sendingEvent = false;
    });
    
  }

  onCreateGroupFormValueChange(){
    if(this.isUpdate){
      const initialValue = this.eventForm.value
      const TempForm = this.eventForm;
      TempForm.valueChanges.subscribe(value => {
        delete initialValue.techs;
        delete initialValue.file;
        delete value.techs;
        delete value.file;
        if (JSON.stringify(initialValue) === JSON.stringify(value)) {
          this.hasChangeOn = false
        } else {
          this.hasChangeOn = true
        }
      });
    }
  }

  voltar(): void{
    window.history.back();
  }

  getFilesOfEVent(filesId: string): void {
    this.storageService.getFiles(filesId).subscribe((response) => {
      response.files.forEach((file) => {
        this.b64toBlob(file.bytes, file.contentType, '',file.name)
      })
      
      this.loadForm();
      this.eventForm.get('file').setValue(this.files);
    })
  }

  convertThumbFile(file: Files): File {
    let blob = this.b64toBlobThumb(file.bytes, file.contentType, '',file.name)
    return new File([blob], file.name);
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
    
      var byteArray = new Uint8Array(byteNumbers);
    
      byteArrays.push(byteArray);
    }
  
    var blob = new Blob(byteArrays, {type: contentType});
    blob = blob.slice(0, blob.size, contentType)
    var file = new File([blob], name, {type: contentType} )
    this.files.push(file)
    return blob;
  }

  b64toBlobThumb(b64Data, contentType, sliceSize, name): Blob {
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
    
      byteArrays.push(byteArray);
    }
  
    var blob = new Blob(byteArrays, {type: contentType});
    blob = blob.slice(0, blob.size, contentType)
    return blob;
  }

  showMessages(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: ['green-snackbar']
    });
    this.router.navigate(['home'])
  }
}
