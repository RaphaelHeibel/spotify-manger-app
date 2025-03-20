import { Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../../guards/auth.guard';
import { MusicListComponent } from '../music-list/music-list.component';

export const PlayerRoutes: Routes = [
    {
        path: '',
        component: PlayerComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent                
            },
            {
                path: 'list/:type/:id',
                component: MusicListComponent
            }
        ],
        canLoad: [AuthGuard]
    }
]