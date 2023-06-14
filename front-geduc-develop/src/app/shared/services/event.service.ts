import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { EventSubscribe } from 'src/app/models/eventSubscribe.model';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class EventService {

    constructor(private http: HttpClient, private notificationService: NotificationService) { }

    createEvent(event: EventModel){
      return this.http.post<EventModel>(environment.GEDUC_API + '/v1/event', event).pipe(tap(() => {
        this.notificationService.getNotifications(event.creatorRegistration).subscribe();
      }));
    }

    getEvents(filter: any){
      return this.http.get<Array<EventModel>>(environment.GEDUC_API + `/v1/event?${filter.param}`)
    }

    editEvents(event: EventModel, eventNumber: string){
      return this.http.put<EventModel>(environment.GEDUC_API + `/v1/event/${eventNumber}`, event);
    }

    subscribeEvents(eventSubscribe: EventSubscribe){
      return this.http.post<EventSubscribe>(environment.GEDUC_API + '/v1/event/subscribe', eventSubscribe).pipe(tap(() => {
        this.notificationService.getNotifications(eventSubscribe.registration).subscribe();

      }));
    }

    getSubscribedEvents(registration: string, eventNumber: string){
      return this.http.get<Array<EventModel>>(environment.GEDUC_API + `/v1/event/subscribed/${registration}`, {
        params: eventNumber === null ? {} : {eventNumber}
      })
    }

    unsubscribeEvents(eventNumber: string, registration: string){
      return this.http.post<void>(environment.GEDUC_API + `/v1/event/unsubscribe/${eventNumber}/${registration}`, {}).pipe(tap(() => {
        this.notificationService.getNotifications(registration).subscribe();
      }));
    }

    cancelEvent(eventNumber: string, registration: string) {
      return this.http.post<void>(environment.GEDUC_API + `/v1/event/cancel/${eventNumber}`, {}).pipe(tap(() => {
        this.notificationService.getNotifications(registration).subscribe();
      }));
    }
}