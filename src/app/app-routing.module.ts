import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from './services/auth-guard.service';
import { ContactComponent } from './home/contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WhoComponent } from './who/who.component';
import { WhyComponent } from './why/why.component';
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
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';
import { CareerComponent } from './career/career.component';
import { ViewCondidateComponent } from './view-condidate/view-condidate.component';
import { ModifyCondidateComponent } from './modify-condidate/modify-condidate.component';
import { DeclareFiscalityComponent } from './declare-fiscality/declare-fiscality.component';
import { ViewContactreqComponent } from './view-contactreq/view-contactreq.component';
import { ModifyContactreqComponent } from './modify-contactreq/modify-contactreq.component';
import { CompleteProfilComponent } from './complete-profil/complete-profil.component';
import { CalendarFiscalityComponent } from './calendar-fiscality/calendar-fiscality.component';
import { CollabUserCreateComponent } from './collab-user-create/collab-user-create.component';
import { AddEventComponent } from './calendar-fiscality/add-event/add-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { ModifyEventComponent } from './modify-event/modify-event.component';
import { SettingsComponent } from './settings/settings.component';
import { DeclareComptabiliteComponent } from './declare-comptabilite/declare-comptabilite.component';
import { ViewUserDeletedComponent } from './view-user-deleted/view-user-deleted.component';
import { ViewDecFiscMensComponent } from './view-dec-fisc-mens/view-dec-fisc-mens.component';
import { ModifyDecFiscMensComponent } from './modify-dec-fisc-mens/modify-dec-fisc-mens.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { ViewCarouselComponent } from './view-carousel/view-carousel.component';
import { ModifyCarouselComponent } from './modify-carousel/modify-carousel.component';
import { ModifyDeccomptabiliteComponent } from './modify-deccomptabilite/modify-deccomptabilite.component';
import { ViewDeccomptabiliteComponent } from './view-deccomptabilite/view-deccomptabilite.component';
import { CollabBoardComponent } from './collab-board/collab-board.component';

const routes: Routes = [
  
   
    
  { path: 'login', component: LoginComponent,
    
},
{ path: 'profil', component: ProfilComponent,
    
},
{ path: 'settings', component: SettingsComponent,
    
},
{ path: 'create-report', component: CreateReportComponent,
    
},
{ path: 'declare-fiscality', component:DeclareFiscalityComponent,canDeactivate: [CanDeactivateGuard]
    
},
{ path: 'declare-comptabilite', component:DeclareComptabiliteComponent,canDeactivate: [CanDeactivateGuard]
    
},
{ path: 'calendar-fiscality', component:CalendarFiscalityComponent,
    
},
{ path: 'settings/calendar-fiscality', component:CalendarFiscalityComponent,
    
},
{ path: 'home/calendar-fiscality', component:CalendarFiscalityComponent,
    
},
{ path: 'login/calendar-fiscality', component:CalendarFiscalityComponent,
    
},
{ path: 'add-event', component:AddEventComponent,
    
},
{ path: 'modify-user/:id', component: ModifyUserComponent,
    
},
{ path: 'complete-profil/:id', component: CompleteProfilComponent,
    
},
{ path: 'modify-condidate/:id', component: ModifyCondidateComponent,
    
},
{ path: 'modify-contactreq/:id', component: ModifyContactreqComponent,
    
},
{ path: 'modify-user-admin/:id', component: ModifyUserAdminComponent,
    
},
{ path: 'modify-event/:id', component: ModifyEventComponent,
    
},
{ path: 'modify-decfiscmens/:id', component: ModifyDecFiscMensComponent,canDeactivate: [CanDeactivateGuard]
    
},
{ path: 'admin-board/modify-decfiscmens/:id', component: ModifyDecFiscMensComponent
    
},
{ path: 'supervisor-board/modify-decfiscmens/:id', component: ModifyDecFiscMensComponent
    
},
{ path: 'modify-deccomptabilite/:id', component: ModifyDeccomptabiliteComponent,canDeactivate: [CanDeactivateGuard]
    
},
{ path: 'modify-carousel/:id', component: ModifyCarouselComponent
    
},
{ path: 'view-user/:id', component: ViewUserComponent},
{ path: 'view-user-deleted/:id', component: ViewUserDeletedComponent},
{ path: 'view-condidate/:id', component: ViewCondidateComponent},
{ path: 'view-contactreq/:id', component: ViewContactreqComponent},
{ path: 'view-decfiscmens/:id', component: ViewDecFiscMensComponent},
{ path: 'view-deccomptabilite/:id', component: ViewDeccomptabiliteComponent},

{ path: 'view-carousel/:id', component: ViewCarouselComponent},

{ path: 'view-event/:id', component: ViewEventComponent},
{ path: 'verify-email/:token', component: VerifyEmailComponent},
{ path: 'reset-password/:token', component: ResetPasswordComponent},
{ path: 'admin-board', component: AdminBoardComponent},
{ path: 'user-board', component: UserBoardComponent},
{ path: 'collab-board', component: CollabBoardComponent},

{ path: 'career', component: CareerComponent},
{ path: 'supervisor-board', component: SupervisorBoardComponent},

  {path: 'home/contact', component :ContactComponent},
  {path: 'home', component :HomeComponent},
    

{ path: 'signup', component: SignupComponent,
    
},
{ path: 'collab-create', component: CollabUserCreateComponent,
    
},
{ path: 'login/signup', component: SignupComponent,
    
},
{ path: 'login/forgot-password', component: ForgotPasswordComponent,
    
},
{ path: 'admin-board/profil', component: ProfilComponent,
    
},
{ path: 'why', component: WhyComponent,
    
},
{ path: 'who', component: WhoComponent,
    
},
{ path: 'coming-soon', component: ComingSoonPageComponent,
    
},
{ path: '', pathMatch: 'full', redirectTo: 'home' },
  
  { path: '**', redirectTo: '/coming-soon' },
  

]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule {}
