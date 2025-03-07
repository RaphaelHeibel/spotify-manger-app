import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlayerComponent,
    RouterModule.forChild(PlayerRoutes)
  ]
})
export class PlayerModule { }
