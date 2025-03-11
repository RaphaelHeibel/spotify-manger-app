import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUser } from '../../interfaces/IUser';
import { SpotifyService } from '../../pages/login/services/spotify.service';

@Component({
  selector: 'app-user-footer',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './user-footer.component.html',
  styleUrl: './user-footer.component.scss'
})
export class UserFooterComponent implements OnInit {

  signOutIcon = faSignOutAlt;
  user: IUser = null;

  constructor(private spotifyService: SpotifyService) {
  }
  ngOnInit(): void {
    this.getFooterSpotifyUser();
  }

  async getFooterSpotifyUser() {
    await this.spotifyService.getSpotifyUser();
    this.user = this.spotifyService.user;
  }

  logout(){
    this.spotifyService.logout();
  }
}
