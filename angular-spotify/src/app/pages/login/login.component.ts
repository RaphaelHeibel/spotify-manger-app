import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  constructor(
    private spotifyService: SpotifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.verifyTokenUrlCallback();
  }

  async verifyTokenUrlCallback() {
    const token = await this.spotifyService.getTokenUrlCallback();

    if (!!token) {
      await this.spotifyService.setAccessToken(token);
      this.router.navigate(['/player']);
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getLoginUrl();
  }



}
