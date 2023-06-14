import { Component, OnInit, Inject } from '@angular/core';
import { NotificationModel } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrls: ['./modal-notification.component.sass']
})
export class ModalNotificationComponent implements OnInit {

  loggedUser: User;
  notifications$: Observable<Array<NotificationModel>>;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
    ) {
  }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.notifications$ = this.notificationService.getNotification();
  }


  readNotification(notificationId: string): void {
    this.notificationService.readNotifications(notificationId).subscribe(response => {
      this.notificationService.getNotifications(this.loggedUser.registration).subscribe();
    });
  }

}
