import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { LeftPanelComponent } from '../../components/left-panel/left-panel.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlayerComponent,
    RouterModule.forChild(PlayerRoutes),
    LeftPanelComponent
  ]
})
export class PlayerModule { }
