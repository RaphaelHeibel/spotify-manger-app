import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.verifyTokenUrlCallback();
  }

  verifyTokenUrlCallback() {
    const token = this.spotifyService.getTokenUrlCallback();
    
    //transforma em bool
    if (!!token) {
      this.spotifyService.setAccessToken(token);
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getLoginUrl();
  }

  

}
