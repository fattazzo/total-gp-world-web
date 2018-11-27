import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DriversService } from '../../../services/drivers.service';
import { Observable } from 'rxjs';
import { Driver } from '../../../domain/driver';

@Component({
  selector: 'drivers-selection',
  templateUrl: './drivers-selection.component.html',
  styleUrls: ['./drivers-selection.component.scss'],
})
export class DriversSelectionComponent implements OnInit {
  private season_ = '';

  private drivers: Driver[] = [];

  selectedDrivers: Driver[] = [];
  @Output() selectedDriversChange: EventEmitter<Driver[]> = new EventEmitter();

  filteredDrivers: Driver[] = [];

  constructor(private driversService: DriversService) {}

  ngOnInit() {}

  @Input('season')
  set season(value: string) {
    if (this.season_ !== value) {
      this.season_ = value;
      this.drivers = [];
      this.driversService.get(this.season_).subscribe(dr => {
        this.drivers = dr;
        const driversId = dr.map(d => d.driverId);
        this.selectedDrivers = this.selectedDrivers.filter(sdr =>
          driversId.includes(sdr.driverId),
        );
        this.selectedDriversChange.emit(this.selectedDrivers);
      });
    }
  }

  filterDrivers(event) {
    const query: string = event.query.toUpperCase();
    this.filteredDrivers = this.drivers.filter(
      dr =>
        query === '*' ||
        dr.familyName.toUpperCase().includes(query.replace('*', '')) ||
        dr.givenName.toUpperCase().includes(query.replace('*', '')),
    );
  }

  onSelectedDriversChange(event: Driver[]) {
    this.selectedDrivers = event;
    this.selectedDriversChange.emit(this.selectedDrivers);
  }
}
