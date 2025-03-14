import { Component, OnInit } from '@angular/core';
import { ArtistItemImageComponent } from "../artist-item-image/artist-item-image.component";
import { SpotifyService } from '../../pages/services/spotify.service';
import { IArtist } from '../../interfaces/IArtist';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-artists',
  imports: [ArtistItemImageComponent, CommonModule],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.scss'
})
export class TopArtistsComponent implements OnInit {

  artists: IArtist[] = [];

  constructor(readonly spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getTopArtists();
  }

  async getTopArtists() {
    this.artists = await this.spotifyService.getTopArtists(5);
  }

}
