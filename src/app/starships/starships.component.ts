import {Component, OnInit, ViewChild} from '@angular/core';
import {StarshipService} from '../services/starship.service';
import {map, Observable, take} from 'rxjs';
import {Starship} from '../../interfaces/starship.interface';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-starships',
  imports: [MatTableModule, MatInput, MatIcon, RouterLinkActive, RouterLink],
  standalone: true,
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss'
})
export class StarshipsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  starshipData$: Observable<Starship[]>;
  starshipDataSource = new MatTableDataSource<Starship[]>();

  displayedColumns: string[];
  constructor(
    private starshipService: StarshipService,
  ) {
    this.displayedColumns = ['name', 'model', 'manufacturer', 'actions'];
  }

  ngOnInit(): void {
    // take(1) will unsubscribe after first emission
    this.starshipData$ = this.getStarships().pipe(
      take(1),
      map((res: any) => {
        this.starshipDataSource = new MatTableDataSource<Starship[]>(res.results);
      })
    ).subscribe();
  }

  applyFilter(event: Event, column: string) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.starshipDataSource.filterPredicate = (data: any, filter: string) => {
      return data[column].toLowerCase().includes(filter.toLowerCase());
    };
    this.starshipDataSource.filter = filterValue.trim().toLowerCase();
  }

  getStarships(): any {
    return this.starshipService.getStarships();
  }
}
