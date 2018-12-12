import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RacesService } from '../../../services/races.service';
import { Observable } from 'rxjs/Observable';
import { Race } from '../../../domain/race';
import { of } from 'rxjs';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'race-selection',
  templateUrl: './race-selection.component.html',
  styleUrls: ['./race-selection.component.scss'],
})
export class RaceSelectionComponent implements OnInit {
  private season_ = '';

  selectedRace: Race;
  @Output() selectedRaceChange: EventEmitter<Race> = new EventEmitter();

  races: SelectItem[] = [];

  constructor(private racesService: RacesService) {}

  ngOnInit() {}

  @Input('season')
  set season(value: string) {
    if (this.season_ !== value) {
      this.season_ = value;
      this.races = [];
      this.selectedRace = null;
      this.onSelectedRaceChange(null);
      this.racesService.getSchedule(this.season_).subscribe(rs => {
        this.races = rs.map(r => ({
          label: r.raceName,
          value: r,
        }));
      });
    }
  }

  onSelectedRaceChange(event: Race) {
    this.selectedRaceChange.emit(event);
  }
}
