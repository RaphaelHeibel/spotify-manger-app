import { PlayerService } from './../services/player.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopArtistComponent } from '../../components/top-artist/top-artist.component';
import { RightPanelComponent } from "../../components/right-panel/right-panel.component";
import { IMusic } from '../../interfaces/IMusic';
import { SpotifyService } from '../services/spotify.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newMusic } from '../../common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TopArtistComponent, RightPanelComponent, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  musics: IMusic[] = [];
  currentMusic: IMusic = newMusic();

  subs: Subscription[] = [];

  //icons
  playIcon = faPlay

  constructor(
    readonly spotifyService: SpotifyService,
    readonly playerService: PlayerService) { }


  ngOnInit(): void {
    this.getMusics();
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async getMusics() {
    this.musics = await this.spotifyService.getMusics();
  }

  getArtist(music: IMusic) {
    return music.artists.map(artist => artist.name).join(', ');
  }

  getCurrentMusic() {
    const sub = this.playerService.currentSong.subscribe(music => {
      this.currentMusic = music;
    });

    this.subs.push(sub);
  }

  async playMusic(music: IMusic) {
    await this.spotifyService.playMusic(music.id);
    this.playerService.defineCurrentSong(music);
  }

}
