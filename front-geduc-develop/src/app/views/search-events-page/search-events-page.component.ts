import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/shared/services/event.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Component({
  selector: 'app-search-events-page',
  templateUrl: './search-events-page.component.html',
  styleUrls: ['./search-events-page.component.sass']
})
export class SearchEventsPageComponent implements OnInit {
  localRegistration: User;
  eventTitle: string;
  events: EventModel[];
  hasEvents: boolean = false;
  isLoading: boolean = true;
  constructor(public spinnerService: SpinnerService, private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.localRegistration = JSON.parse(sessionStorage.getItem('user'));
    this.eventTitle = this.activatedRoute.snapshot.queryParamMap.get('eventTitle');
   }

  ngOnInit(): void {
    this.getEventsWithTitle(this.eventTitle);
    
  }

  getEventsWithTitle(title: string): any {
    const filter = {
      param: 'title='+title
    }
    this.eventService.getEvents(filter).subscribe((response) => {
      this.events = response;
      if(this.events.length > 0) {
        this.hasEvents = true;
        this.isLoading = false;
      } else {
        this.hasEvents = false;
        this.isLoading = false;
      }
    });
  }
}
