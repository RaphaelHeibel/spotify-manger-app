import { Component, OnInit } from '@angular/core';
import { MenuButtonComponent } from "../menu-button/menu-button.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons'
import { IPlaylist } from '../../interfaces/IPlaylist';
import { SpotifyService } from '../../pages/login/services/spotify.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-panel',
  imports: [MenuButtonComponent, FontAwesomeModule, CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss'
})
export class LeftPanelComponent implements OnInit {


  selectedMenuItem = "Home"

  playlists: IPlaylist[] = [];


  //Icons
  homeIcon = faHome
  searchIcon = faSearch
  artistIcon = faGuitar
  playlistIcon = faMusic

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  onMenuItemClick(button: string) {
    this.selectedMenuItem = button;
  }

  async getPlaylists() {
    this.playlists = await this.spotifyService.getUserPlaylists();
  }


}
