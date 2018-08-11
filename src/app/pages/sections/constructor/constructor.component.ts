import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Constructor } from '../../../domain/constructor';
import { ActivatedRoute } from '@angular/router';
import { ConstructorsService } from '../../../services/constructors.service';
import { SeasonsService } from '../../../services/seasons.service';

@Component({
  selector: 'constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent implements OnInit {

  @Input() constructorSelected: string;

  constructors: Observable<Constructor[]>;

  constructor(private route: ActivatedRoute,
    private constructorsService: ConstructorsService,
    private seasonsService: SeasonsService) { }

  ngOnInit() {
    this.constructorSelected = this.route.snapshot.paramMap.get('constructorId')
    this.seasonsService.getSeason().subscribe((newSeason) => {
      console.log('prova ' + newSeason);
      this.constructors = this.constructorsService.get(newSeason)
    });
  }
}