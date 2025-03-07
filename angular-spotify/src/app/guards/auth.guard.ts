import { SpotifyService } from './../pages/login/services/spotify.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router,
    private SpotifyService: SpotifyService) {

  }


  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');

    if (!token)
      return this.notAtuhenticated();

    return new Promise((res) => {
      const userCreated = this.SpotifyService.initializeUser();

      if (userCreated)
        return res(true);
      else
        return res(this.notAtuhenticated());

    });

  }

  notAtuhenticated() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }

}



