import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome-slides',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login-register',
    loadChildren: () => import('./login-register/login-register.module').then( m => m.LoginRegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },
  {
    path: 'live-classes',
    loadChildren: () => import('./live-classes/live-classes.module').then( m => m.LiveClassesPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'recorded-classes',
    loadChildren: () => import('./recorded-classes/recorded-classes.module').then( m => m.RecordedClassesPageModule)
  },
  {
    path: 'assignments',
    loadChildren: () => import('./assignments/assignments.module').then( m => m.AssignmentsPageModule)
  },
  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.module').then( m => m.NotesPageModule)
  },
  {
    path: 'parents-space',
    loadChildren: () => import('./parents-space/parents-space.module').then( m => m.ParentsSpacePageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'exams-mcq',
    loadChildren: () => import('./exams-mcq/exams-mcq.module').then( m => m.ExamsMcqPageModule)
  },
  {
    path: 'welcome-slides',
    loadChildren: () => import('./welcome-slides/welcome-slides.module').then( m => m.WelcomeSlidesPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
