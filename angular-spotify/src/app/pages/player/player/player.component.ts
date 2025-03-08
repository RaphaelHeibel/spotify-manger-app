import { Component, OnInit } from '@angular/core';
import { LeftPanelComponent } from "../../../components/left-panel/left-panel.component";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  imports: [LeftPanelComponent]
})
export class PlayerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
