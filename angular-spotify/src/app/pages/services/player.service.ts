import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMusic } from '../../interfaces/IMusic';
import { newMusic } from '../../common/factories';
import { SpotifyService } from './spotify.service';

@Injectable({
    providedIn: 'root'
})
export class PlayerService {

    currentSong = new BehaviorSubject<IMusic>(newMusic());
    timerId: any = null;

    constructor(readonly spotifyService: SpotifyService) {
        this.getCurrentSong();
    }

    async getCurrentSong() {
        clearTimeout(this.timerId);

        const music = await this.spotifyService.getCurrentMusic();
        this.defineCurrentSong(music);

        this.timerId = setInterval(async () => {
            await this.getCurrentSong();
        }, 3000);
    }

    defineCurrentSong(music: IMusic) {
        this.currentSong.next(music);
    }

    async previousSong() {
        await this.spotifyService.previousSong();
    }

    async nextSong() {
       await this.spotifyService.nextSong();
    }

    async pauseSong() {
        await this.spotifyService.pauseSong();
     }

     async resumeSong() {
        await this.spotifyService.resumeSong();
     }

}
