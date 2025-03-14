import { Component } from '@angular/core';
import { RecentSearchComponent } from "../recent-search/recent-search.component";
import { TopArtistsComponent } from "../top-artists/top-artists.component";
import { PlayerCardComponent } from "../player-card/player-card.component";

@Component({
  selector: 'app-right-panel',
  imports: [RecentSearchComponent, TopArtistsComponent, PlayerCardComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.scss'
})
export class RightPanelComponent {

}
