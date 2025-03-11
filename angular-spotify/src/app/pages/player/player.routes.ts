import { Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../../guards/auth.guard';

export const PlayerRoutes: Routes = [
    {
        path: '',
        component: PlayerComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent                
            }
        ],
        canLoad: [AuthGuard]
    }
]