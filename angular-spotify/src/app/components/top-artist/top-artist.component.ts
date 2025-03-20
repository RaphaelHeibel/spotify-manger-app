import { Component, OnInit } from '@angular/core';
import { IArtist } from '../../interfaces/IArtist';
import { newArtist } from '../../common/factories';
import { SpotifyService } from '../../pages/services/spotify.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-artist',
  imports: [CommonModule],
  templateUrl: './top-artist.component.html',
  styleUrl: './top-artist.component.scss'
})
export class TopArtistComponent implements OnInit {

  topArtist: IArtist = newArtist();

  constructor(readonly spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getTopArtist();
  }

  async getTopArtist() {
    const artists = await this.spotifyService.getTopArtists();

    if (artists && artists.length > 0) {
      this.topArtist = artists[0];
    }
  }
}
