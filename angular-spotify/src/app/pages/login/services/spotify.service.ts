import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../../../environments/environment.development';

import Spotify from 'spotify-web-api-js'
import { IUser } from '../../../interfaces/IUser';
import { SpotifyPlaylistToPlaylist, SpotifyUserToUser } from '../../../common/spotifyHelper';
import { IPlaylist } from '../../../interfaces/IPlaylist';

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
      await this.setAccessToken(token);
      await this.getSpotifyUser();
      return !!this.user;
    } catch (error) {
      return false;
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = await SpotifyUserToUser(userInfo);
  }

  getLoginUrl() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  async getTokenUrlCallback() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  async setAccessToken(token: string) {
    await this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async getUserPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
    await this.getSpotifyUser();
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit });
    if (!playlists?.items) {
      console.warn("Nenhuma playlist encontrada!");     
    }

    console.log(playlists);
    return playlists.items.map(SpotifyPlaylistToPlaylist);
  }
}