import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        //configurando lazy loading
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    }
];
