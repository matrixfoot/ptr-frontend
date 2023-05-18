import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from './app-routing.module';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {CustomDatePipe} from './_helpers/custom.datepipe'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { WhoComponent } from './who/who.component';
import { WhyComponent } from './why/why.component';
import { ContactComponent } from './home/contact/contact.component';
import { ProfilComponent } from './profil/profil.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { UserBoardComponent } from './user-board/user-board.component';
import { SupervisorBoardComponent } from './supervisor-board/supervisor-board.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ModifyUserAdminComponent } from './modify-user-admin/modify-user-admin.component';

import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CareerComponent } from './career/career.component';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';
import { ViewCondidateComponent } from './view-condidate/view-condidate.component';
import { ModifyCondidateComponent } from './modify-condidate/modify-condidate.component';
import { DeclareFiscalityComponent } from './declare-fiscality/declare-fiscality.component';
import { AlertComponent } from './alert/alert.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DueDateTimelineComponent } from './due-date-timeline/due-date-timeline.component';
import { ViewContactreqComponent } from './view-contactreq/view-contactreq.component';
import { ModifyContactreqComponent } from './modify-contactreq/modify-contactreq.component';
import { CompleteProfilComponent } from './complete-profil/complete-profil.component';
import { CalendarFiscalityComponent } from './calendar-fiscality/calendar-fiscality.component';
import { CollabUserCreateComponent } from './collab-user-create/collab-user-create.component';
import { SortDirective } from './directive/sort.directive';
import { TwoDigitDecimaNumberDirective } from './directive/TwoDigitDecimaNumber.directive';
import { RemoveCommaPipe } from './pipes/pipe-number';

import { AddEventComponent } from './calendar-fiscality/add-event/add-event.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { ViewEventComponent } from './view-event/view-event.component';
import { ModifyEventComponent } from './modify-event/modify-event.component';
import { SettingsComponent } from './settings/settings.component';
import { HttpErrorInterceptor } from './interceptors/error-interceptor';
import { ExcelService } from './services/excel.service';
import { DeclareComptabiliteComponent } from './declare-comptabilite/declare-comptabilite.component';
import { ViewUserDeletedComponent } from './view-user-deleted/view-user-deleted.component';
import { ViewDecFiscMensComponent } from './view-dec-fisc-mens/view-dec-fisc-mens.component';
import { ModifyDecFiscMensComponent } from './modify-dec-fisc-mens/modify-dec-fisc-mens.component';
import { CanDeactivateGuard } from './services/auth-guard.service';
import { CreateReportComponent } from './create-report/create-report.component';
import { ViewCarouselComponent } from './view-carousel/view-carousel.component';
import { ModifyCarouselComponent } from './modify-carousel/modify-carousel.component';
import { ModifyDeccomptabiliteComponent } from './modify-deccomptabilite/modify-deccomptabilite.component';
import { ViewDeccomptabiliteComponent } from './view-deccomptabilite/view-deccomptabilite.component';
import { CollabBoardComponent } from './collab-board/collab-board.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    
    
    
    HeaderComponent,
   
    LoginComponent,
    SignupComponent,
   
    FooterComponent,
    HomeComponent,
    WhoComponent,
    WhyComponent,
    ContactComponent,
    ProfilComponent,
    AdminBoardComponent,
    UserBoardComponent,
    SupervisorBoardComponent,
    ModifyUserComponent,
    ViewUserComponent,
    ModifyUserAdminComponent,
    CustomDatePipe,
    RemoveCommaPipe,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CareerComponent,
    ComingSoonPageComponent,
    ViewCondidateComponent,
    ModifyCondidateComponent,
    DeclareFiscalityComponent,
    AlertComponent,
    SearchBarComponent,
    DueDateTimelineComponent,
    ViewContactreqComponent,
    ModifyContactreqComponent,
    CompleteProfilComponent,
    CalendarFiscalityComponent,
    CollabUserCreateComponent,
    SortDirective,
    TwoDigitDecimaNumberDirective,
    AddEventComponent,
    ViewEventComponent,
    ModifyEventComponent,
    SettingsComponent,
    DeclareComptabiliteComponent,
    ViewUserDeletedComponent,
    ViewDecFiscMensComponent,
    ModifyDecFiscMensComponent,
    CreateReportComponent,
    ViewCarouselComponent,
    ModifyCarouselComponent,
    ModifyDeccomptabiliteComponent,
    ViewDeccomptabiliteComponent,
    CollabBoardComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTabsModule,
    FullCalendarModule,
    CarouselModule,
    ModalModule.forRoot(),

    
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },ExcelService,CanDeactivateGuard,RemoveCommaPipe,BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
