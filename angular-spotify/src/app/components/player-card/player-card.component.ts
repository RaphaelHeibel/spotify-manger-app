import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMusic } from '../../interfaces/IMusic';
import { newMusic } from '../../common/factories';
import { PlayerService } from '../../pages/services/player.service';
import { faPause, faPlay, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-player-card',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent implements OnInit,OnDestroy{

  music: IMusic = newMusic()
  subs: Subscription[] = [];

  //Icons
  previousIcon = faStepBackward;
  nextIcon = faStepForward;
  playIcon = faPlay;
  pauseIcon = faPause;

  constructor(readonly playerService: PlayerService) {}



  ngOnInit(): void {
    this.getCurrentMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getCurrentMusic(){
    const sub = this.playerService.currentSong.subscribe(music => {
      this.music = music;
    })

    this.subs.push(sub);
  }

  previousSong(){
    this.playerService.previousSong();
  }

  nextSong(){
    this.playerService.nextSong();
  }

  pauseSong(){
    this.playerService.pauseSong();
  }

  resumeSong(){
    this.playerService.resumeSong();
  }

}
