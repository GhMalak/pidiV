import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetFiles } from 'src/app/models/getFiles.model';
import { UploadFileResponse } from 'src/app/models/storage.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class StorageService {

    constructor(private http: HttpClient) { }

    sendFiles(files: FormData){
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data')
        return this.http.post<UploadFileResponse>(environment.GEDUC_API + '/v1/storage',  files, {
            headers: headers
        });
      }


    getFiles(filesId: string){
      return this.http.get<GetFiles>(environment.GEDUC_API + `/v1/storage/${filesId}`)
    }

    uploadThumbnail(thumbnail: FormData, eventNumber: string){
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data')
      return this.http.post<UploadFileResponse>(environment.GEDUC_API + `/v1/storage/thumb/${eventNumber}`,  thumbnail, {
          headers: headers
      });
    }

    uploadAvatar(thumbnail: FormData, registration: string){
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data')
      return this.http.post<void>(environment.GEDUC_API + `/v1/storage/avatar/${registration}`,  thumbnail, {
          headers: headers
      });
    }
}