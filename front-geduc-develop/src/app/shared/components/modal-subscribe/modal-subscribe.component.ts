import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-modal-subscribe',
  templateUrl: './modal-subscribe.component.html',
  styleUrls: ['./modal-subscribe.component.sass']
})
export class ModalSubscribeComponent implements OnInit {
  event: EventModel;
  loggedUser: User;
  creatorOfEvent: string;
  alreadySubscribed: boolean = false;
  eventOwner: boolean = false;
  thumbnail: SafeUrl = "assets/foto-event.png";
  constructor(
    protected dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private eventService: EventService, 
    private snackBar: MatSnackBar, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.event = this.data.event;
    this.thumbnail = this.data.thumb;
    this.loggedUser = this.authService.getLoggedUser();
    this.authService.getLoggedUserEndpoint(this.event.creatorRegistration).subscribe((response) => {
      this.creatorOfEvent = response.name.split(/(\s).+\s/).join(""); // regular expression que separa o array e ignora os espaços em branco a mais
    });
    this.verifyIfUserAlteradySubscibed();
    this.verifyEventOwner();
  }

  verifyIfUserAlteradySubscibed() {
    this.eventService.getSubscribedEvents(this.loggedUser.registration, this.event.eventNumber).subscribe(response => {
      if (response.length > 0) {
        this.alreadySubscribed = true
      }
    })
  }

  verifyEventOwner() {
    if (this.loggedUser.registration == this.event.creatorRegistration) {
      this.eventOwner = true;
    }
  }

  close() {
    this.dialog.closeAll();
  }

  subscribeInEvent(): void {
    const filter = {
      eventNumber: this.event.eventNumber,
      registration: this.loggedUser.registration
    }
    this.eventService.subscribeEvents(filter).subscribe(() => {
      this.snackBar.open("Incrição feita no evento com sucesso", 'X', {
        duration: 3000,
        panelClass: ['green-snackbar']
      });
    })

    this.close();
  }

  goToWatchEvent(event: EventModel): void {
    this.dialog.closeAll();
    this.router.navigate(['/watch-events'],{
      queryParams: event
    });
  }
}
