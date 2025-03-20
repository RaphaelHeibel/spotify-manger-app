import { Component, OnInit } from '@angular/core';
import { MenuButtonComponent } from "../menu-button/menu-button.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons'
import { IPlaylist } from '../../interfaces/IPlaylist';
import { SpotifyService } from '../../pages/services/spotify.service';
import { CommonModule } from '@angular/common';
import { UserFooterComponent } from "../user-footer/user-footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-panel',
  imports: [MenuButtonComponent, FontAwesomeModule, CommonModule, UserFooterComponent],
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

  constructor(
    private router: Router,
    private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  onMenuItemClick(button: string) {
    this.selectedMenuItem = button;
    this.router.navigateByUrl(`player/${button.toLowerCase()}`);
  }

  async getPlaylists() {
    this.playlists = await this.spotifyService.getUserPlaylists();
  }

  openPlaylist(playlistid:string){
    this.selectedMenuItem = playlistid;
    this.router.navigateByUrl(`player/list/playlist/${playlistid}`);
  }


}
