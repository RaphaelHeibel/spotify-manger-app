import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusic } from '../../interfaces/IMusic';
import { newMusic } from '../../common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { BannerComponent } from "../../components/banner/banner.component";
import { RightPanelComponent } from "../../components/right-panel/right-panel.component";
import { PlayerService } from '../services/player.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-list',
  imports: [BannerComponent, RightPanelComponent, FontAwesomeModule, CommonModule],
  templateUrl: './music-list.component.html',
  styleUrl: './music-list.component.scss'
})
export class MusicListComponent implements OnInit, OnDestroy {

  bannerImageUrl = '';
  bannerText = '';
  subs: Subscription[] = [];

  musicList: IMusic[] = [];
  currentMusic: IMusic = newMusic();

  playIcon = faPlay;
  title='';

  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly spotifyService: SpotifyService,
    readonly playerService: PlayerService) { }


  ngOnInit(): void {
    this.getMusicList();
    this.getCurrentSong();

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getMusicList() {

    const sub = this.activatedRoute.paramMap.subscribe(async params => {
      const type = params.get('type');
      const id = params.get('id');

      await this.getPageData(type, id);
    });

    this.subs.push(sub);

  }

  async getPageData(type: string, id: string) {

    if (type === 'playlist')
      await this.getPlaylist(id);
    else
      await this.getArtistData(id);


  }

  async getPlaylist(id: string) {
    const playlistMusic = await this.spotifyService.getMusicListFromPlaylist(id);
    this.setPageData(playlistMusic.name, playlistMusic.imageUrl, playlistMusic.musics);
    this.title = 'Playlist: ' + playlistMusic.name;
  }

  async getArtistData(artistId: string) { }

  getArtist(music: IMusic) {
    return music.artists.map(artist => artist.name).join(', ');
  }

  getCurrentSong(){
    const sub = this.playerService.currentSong.subscribe(music => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  setPageData(bannerText: string, bannerImage: string, musicList: IMusic[]) {

    this.bannerImageUrl = bannerImage;
    this.bannerText = bannerText;
    this.musicList = musicList;
  }

  async playMusic(music: IMusic) {
    await this.spotifyService.playMusic(music.id);
    this.playerService.defineCurrentSong(music);
  }


}
