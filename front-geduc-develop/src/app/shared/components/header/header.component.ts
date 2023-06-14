import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationModel } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { ModalNotificationComponent } from '../modal-notification/modal-notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  eventTitle: string;
  loggedUser: User;
  notifications$: Observable<Array<NotificationModel>>;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { this.loggedUser = this.authService.getLoggedUser();}

  ngOnInit(): void {
    this.notifications$ = this.notificationService.getNotification();
    if(this.loggedUser){
      this.notificationService.getNotifications(this.loggedUser.registration).subscribe();
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalNotificationComponent, {
      panelClass: ['modal-padding']
    });

    dialogRef.afterClosed().subscribe((response) => {
    });
  }

  enterSubmit(event: any): void {
    if(event.keyCode === 13){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/search-events'], {queryParams: {eventTitle: this.eventTitle}});
      }); 
    }
  }

}
