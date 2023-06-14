import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationModel } from 'src/app/models/notification.model';
import { environment } from 'src/environments/environment';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class NotificationService {
    private notification = new ReplaySubject<Array<NotificationModel>>(1);
    constructor(private http: HttpClient) { }

    getNotifications(registration: string){
        return this.http.get<Array<NotificationModel>>(environment.GEDUC_API + `/v1/notification/${registration}`).pipe(tap((response) => {
            this.notification.next(response);
        }));
    }

    readNotifications(notificationId: string){
        return this.http.post<Array<void>>(environment.GEDUC_API + `/v1/notification/read/${notificationId}`, {})
    }

    getNotification(): Observable<Array<NotificationModel>>{
        return this.notification.asObservable();
    }
}