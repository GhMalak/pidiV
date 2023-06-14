import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventModel } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ModalConfirmComponent } from '../../../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-my-events-card',
  templateUrl: './my-events-card.component.html',
  styleUrls: ['./my-events-card.component.sass']
})
export class MyEventsCardComponent implements OnInit {

  @Input()
  event: EventModel;
  loggedUser: User;

  @Output()
  listEvents = new EventEmitter<boolean>(false);

  constructor(private router: Router, private dialog: MatDialog, private eventService: EventService, private snackBar: MatSnackBar, private authService: AuthService, public spinnerService: SpinnerService) {
    this.loggedUser = this.authService.getLoggedUser();
   }

  ngOnInit(): void {
  }
  
  callEditEvents(event: EventModel): void {
    this.router.navigate(['../create-event'], {
      queryParams: event
    })
  }

  cancelEvent(event: EventModel) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Cancelar evento',
        message: 'Tem certeza que quer cancelar este evento?',
        buttonConfirmText: 'Cancelar Evento',
        buttonCancelText: 'Fechar'
      },
      height: '180px'
    })

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.eventService.cancelEvent(event.eventNumber, this.loggedUser.registration).subscribe(response => {
          this.snackBar.open("Evento cancelado com sucesso.", 'X', {
            duration: 3000,
            panelClass: ['green-snackbar']
          });
          this.listEvents.emit(true);
        });
      }
    })
  }

  goToWatchEvent(event: EventModel): void {
    this.dialog.closeAll();
    this.router.navigate(['/watch-events'],{
      queryParams: event
    });
  }

}
