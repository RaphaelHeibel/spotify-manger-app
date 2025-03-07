import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../../../environments/environment.development';

import Spotify from 'spotify-web-api-js'
import { IUser } from '../../../interfaces/IUser';
import { SpotifyUserToUser } from '../../../common/spotifyHelper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs;
  user: IUser;

  constructor() {
    this.spotifyApi = new Spotify();
  }


  async initializeUser() {
    if (!!this.user) return true;

    const token = localStorage.getItem('token');

    if (!token) return false;

    try {
      this.setAccessToken(token);
      await this.getSpotifyUser();
      return !!this.user;
    } catch (error) {
      return false;
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = SpotifyUserToUser(userInfo);
    console.log(this.user);
  }

  getLoginUrl() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenUrlCallback() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }
}