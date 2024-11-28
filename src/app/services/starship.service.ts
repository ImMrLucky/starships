import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Starship} from '../../interfaces/starship.interface';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  baseUrl = 'https://swapi.dev/api';
  constructor(
    private http: HttpClient
  ) { }

  getStarships(): Observable<Starship[]> {
    return this.http.get<Starship[]>(`${this.baseUrl}/starships/`).pipe(
      map((res: any) => {
        return res['results'];
      })
    );
  }
}
