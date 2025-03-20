import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from '../../../environments/environment.development';

import Spotify from 'spotify-web-api-js'
import { IUser } from '../../interfaces/IUser';
import { SpotifyArtistToArtist, SpotifyPlaylistToPlaylist, SpotifySinglePlaylistToPlaylist, SpotifyTrackToMusic, SpotifyUserToUser } from '../../common/spotifyHelper';
import { IPlaylist } from '../../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtist } from '../../interfaces/IArtist';
import { IMusic } from '../../interfaces/IMusic';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  spotifyApi: Spotify.SpotifyWebApiJs;
  user: IUser;

  constructor(private router: Router) {
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

    return playlists.items.map(SpotifyPlaylistToPlaylist);
  }

  async getMusicListFromPlaylist(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId, { offset, limit });

    if (!playlistSpotify)
      return null;

    const playlist = SpotifySinglePlaylistToPlaylist(playlistSpotify);
    const musicList = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });

    playlist.musics = musicList.items.map(music => SpotifyTrackToMusic(music.track as SpotifyApi.TrackObjectFull));

    return playlist;
  }



  async getTopArtists(limit = 10): Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtistToArtist);
  }

  async getMusics(offset = 0, limit = 50): Promise<IMusic[]> {
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musics.items.map(music => SpotifyTrackToMusic(music.track));
  }

  async playMusic(musicId: string) {
    await this.spotifyApi.queue(musicId);
    await this.spotifyApi.skipToNext();
  }

  async getCurrentMusic(): Promise<IMusic> {
    const spotifyMusic = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackToMusic(spotifyMusic.item);
  }

  async previousSong() {
    await this.spotifyApi.skipToPrevious();
  }

  async pauseSong() {
    await this.spotifyApi.pause();
  }

  async resumeSong() {
    await this.spotifyApi.play();
  }

  async nextSong() {
    await this.spotifyApi.skipToNext();
  }

  async isPlaying() {
    return await this.spotifyApi.getMyCurrentPlaybackState();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}