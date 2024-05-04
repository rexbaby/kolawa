import { Route } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { authGuard } from './components/auth.guard';
import { ErrorPageComponent } from './components/error-page.component';
import { TableContainerComponent } from './table/table-container.component';
import { CoreComponent } from './components/core.component';

export const ROUTES: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: CoreComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'region',
        component: TableContainerComponent,
        data: { breadcrumb: '區域' },
      },
      {
        path: 'addressBook',
        component: TableContainerComponent,
        data: { breadcrumb: '通訊錄' },
      },
      {
        path: 'fieldStaff',
        component: TableContainerComponent,
        data: { breadcrumb: '外勤人員' },
      },
      { path: '', pathMatch: 'full', redirectTo: 'addressBook' },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'home/addressBook' },
  {
    path: '404',
    component: ErrorPageComponent,
  },
];
