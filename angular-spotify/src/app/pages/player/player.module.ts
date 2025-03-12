import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { LeftPanelComponent } from '../../components/left-panel/left-panel.component';
import { MenuButtonComponent } from '../../components/menu-button/menu-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFooterComponent } from '../../components/user-footer/user-footer.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistComponent } from '../../components/top-artist/top-artist.component';
import { RightPanelComponent } from '../../components/right-panel/right-panel.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeComponent,
    PlayerComponent,
    FontAwesomeModule,
    LeftPanelComponent,
    TopArtistComponent,
    UserFooterComponent,
    RightPanelComponent,
    MenuButtonComponent,
    RouterModule.forChild(PlayerRoutes),
  ]
})
export class PlayerModule { }
