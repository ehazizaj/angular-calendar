import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

// declare routes for lazy loading modules, / route and unknown routes
const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
        canActivate: [ AuthGuard ],
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./core/components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**', pathMatch: 'full', redirectTo: '/home'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy',
    anchorScrolling: 'enabled'
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
