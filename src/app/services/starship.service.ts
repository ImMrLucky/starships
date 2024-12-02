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

  getStarships(pageIndex: number, pageSize: number): Observable<Starship[]> {
    return this.http.get<Starship[]>(`${this.baseUrl}/starships/?page=${pageIndex + 1}&pageSize=${pageSize}`);
  }

  getStarshipById(id: string): Observable<Starship> {
    return this.http.get<Starship>(`${this.baseUrl}/starships/${id}`);
  }

  getData(pageIndex: number, pageSize: number): Observable<Starship[]> {
    const url = `/api/your-endpoint?page=${pageIndex + 1}&pageSize=${pageSize}`; // Adjust the URL as needed
    return this.http.get<Starship[]>(url);
  }
}
