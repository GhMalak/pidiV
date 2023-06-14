import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.sass']
})
export class MyEventsComponent implements OnInit {

  events: EventModel[];
  eventsSubscribed: EventModel[];
  loggedUser: User;
  isLoading: boolean = true;
  constructor(private eventService: EventService,
    private authService: AuthService, public spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.listEvents();
  }
  
  listEvents(): void {
    const filter = {
      param: "creatorRegistration="+this.loggedUser.registration
    }
    this.eventService.getEvents(filter).subscribe((response) => {
      this.events = response;
    })
    this.eventService.getSubscribedEvents(this.loggedUser.registration, null).subscribe((response) => {
      this.eventsSubscribed = response;
    })
    this.isLoading = false;
  }

  callBackListEvents(listEvents: boolean) {
    if (listEvents) {
      this.listEvents();
    }
  }
}
