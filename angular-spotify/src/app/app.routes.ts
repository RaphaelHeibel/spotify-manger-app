import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'player',
        pathMatch: 'full'
    },
    {
        path: 'player',
        //configurando lazy loading
        loadChildren: () => import('./pages/player/player.module').then(m => m.PlayerModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'login',
        //configurando lazy loading
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    }
];
