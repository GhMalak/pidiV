import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})

export class HomePageComponent implements OnInit {
  localRegistration: User;
  events: EventModel[];
  hasEvents: boolean = false;
  constructor(public authService: AuthService, public spinnerService: SpinnerService,private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
    this.localRegistration = JSON.parse(sessionStorage.getItem('user'))
    this.getLoggedUserEndpoint(this.localRegistration);
  }

  createEvent(): void {
    this.router.navigate(['create-event']);
  }

  getLoggedUserEndpoint(localRegistration: User):void {
    this.authService.getLoggedUserEndpoint(localRegistration.registration).subscribe((response) =>{
      this.getEventsWithTags(response);
    })
  }

  getEventsWithTags(loggedUser: User): any {
    var myString = '';
    let techsUser = loggedUser.techs
    techsUser.forEach((element, index) => {
      if(techsUser.length === 1){
        myString += 'techs=' + element
      } else {
        index === techsUser.length-1 ? myString += 'techs='+element : myString += 'techs='+element+'&'
      }
    })
    const filter = {
      param: myString
    }
    this.eventService.getEvents(filter).subscribe((response) => {
      this.events = response;
      if(this.events.length > 0) {
        this.hasEvents = true;
      }
    });
  }

}
