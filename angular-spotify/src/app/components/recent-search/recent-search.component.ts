import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recent-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './recent-search.component.html',
  styleUrl: './recent-search.component.scss'
})
export class RecentSearchComponent implements OnInit {

  recentSeaches = ['Top Brasil', 'Top Global', 'Esquenta Sertanejo', 'Funk Hits', 'Pagodeira'];


  inputSearch = '';

  constructor() { }

  ngOnInit(): void {
  }

  setSearch(search: string) {
    this.inputSearch = search;
  }

  getSearch() {
  }

}
