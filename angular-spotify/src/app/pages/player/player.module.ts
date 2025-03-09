import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { LeftPanelComponent } from '../../components/left-panel/left-panel.component';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlayerComponent,
    FontAwesomeModule,
    LeftPanelComponent,
    MenuButtonComponent,
    RouterModule.forChild(PlayerRoutes),
  ]
})
export class PlayerModule { }
