import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-artist-item-image',
  imports: [CommonModule],
  templateUrl: './artist-item-image.component.html',
  styleUrl: './artist-item-image.component.scss'
})
export class ArtistItemImageComponent {


  @Input()
  imageSrc = '';

  @Output()
  click = new EventEmitter<void>();

  constructor() { }


  onClick() {
  }


}
