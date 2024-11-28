import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {StarshipService} from '../services/starship.service';
import {map, Observable, take} from 'rxjs';
import {Starship} from '../../interfaces/starship.interface';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-starship-detail',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton,
    NgIf,
    AsyncPipe,
    NgForOf,
    DatePipe
  ],
  standalone: true,
  templateUrl: './starship-detail.component.html',
  styleUrl: './starship-detail.component.scss'
})
export class StarshipDetailComponent implements OnInit {

  starshipDetailData$: Observable<Starship>;
  starshipUrl: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private starshipService: StarshipService
    ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.starshipUrl = params['url'];

      const separateStarshipString = this.starshipUrl.split('/');

      // find the second to last item which is the starship id
      let starshipId = '';

      if (separateStarshipString.length > 1) {
        starshipId = separateStarshipString[separateStarshipString.length-2];
      }

      this.starshipDetailData$ = this.starshipService.getStarshipById(starshipId).pipe(
        take(1),
        map((data: Starship): Starship => {
          return data;
        })
      )
    });
  }
}
