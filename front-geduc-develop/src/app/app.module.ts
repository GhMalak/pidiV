import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { CardEventComponent } from './shared/components/card-event/card-event.component';
import { ModalSubscribeComponent } from './shared/components/modal-subscribe/modal-subscribe.component';
import { ProfilePageComponent } from './views/profile-page/profile-page.component';
import { SignUpPageComponent } from './views/sign-up-page/sign-up-page.component';
import { LoginPage } from './views/login-page/login-page.component';
import { CertificatesComponent } from './shared/components/profile/certificates/certificates.component';
import { ContentComponent } from './shared/components/profile/content/content.component';
import { CertificateCardComponent } from './shared/components/profile/certificates/certificate-card/certificate-card.component';
import { ModalAvatarComponent } from './views/profile-page/modal-avatar/modal-avatar.component';
import { CreateEventPageComponent } from './views/create-event-page/create-event-page.component';

//service
import { AuthService } from './shared/services/auth.service';
import { ContentService } from './shared/services/content.service';
import { StorageService } from './shared/services/storage.service';
import { EventService } from './shared/services/event.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


// Dependências do ngx-mask
import { NgxMaskModule } from 'ngx-mask';
import { MyEventsComponent } from './shared/components/profile/my-events/my-events.component';
import { MyEventsCardComponent } from './shared/components/profile/my-events/my-events-card/my-events-card.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { MySubscribedEventsCardComponent } from './shared/components/profile/my-events/my-subscribed-events-card/my-subscribed-events-card.component';
import { SearchEventsPageComponent } from './views/search-events-page/search-events-page.component';
import { ModalNotificationComponent } from './shared/components/modal-notification/modal-notification.component';
import { NotificationService } from './shared/services/notification.service';
import { ModalConfirmComponent } from './shared/components/modal-confirm/modal-confirm.component';
import { WatchEventsPageComponent } from './views/watch-events-page/watch-events-page.component';
import { CertificateService } from './shared/services/certificate.service';
import { SpinnerOverlayComponent } from './shared/components/spinner-overlay/spinner-overlay.component';
import { CustomHttpInterceptor } from './interceptors/http-interceptor';
import { ChangePasswordPageComponent } from './views/change-password-page/change-password-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    CardEventComponent,
    ModalSubscribeComponent,
    ProfilePageComponent,
    SignUpPageComponent,
    LoginPage,
    ContentComponent,
    CertificatesComponent,
    CertificateCardComponent,
    CreateEventPageComponent,
    MyEventsComponent,
    MyEventsCardComponent,
    MySubscribedEventsCardComponent,
    SearchEventsPageComponent,
    ModalNotificationComponent,
    ModalConfirmComponent,
    ModalAvatarComponent,
    WatchEventsPageComponent,
    SpinnerOverlayComponent,
    ChangePasswordPageComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    NgxMaskModule.forRoot({dropSpecialCharacters: false})
  ],
  providers: [AuthService, ContentService, StorageService, EventService, NotificationService, CertificateService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
