import { Component, OnInit } from '@angular/core';
import { TopArtistComponent } from '../../components/top-artist/top-artist.component';
import { RightPanelComponent } from "../../components/right-panel/right-panel.component";
import { IMusic } from '../../interfaces/IMusic';
import { SpotifyService } from '../login/services/spotify.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TopArtistComponent, RightPanelComponent, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  musics: IMusic[] = [];

  //icons
  playIcon = faPlay

  constructor(readonly spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getMusics();
  }

  async getMusics() {
    this.musics = await this.spotifyService.getMusics();
    console.log(this.musics);
  }

  getArtist(music: IMusic) {
    return music.artists.map(artist => artist.name).join(', ');
  }

  async playMusic(music: IMusic) {
    await this.spotifyService.playMusic(music.id);
  }


}
