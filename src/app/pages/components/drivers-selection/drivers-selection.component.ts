import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DriversService } from '../../../services/drivers.service';
import { Observable } from 'rxjs';
import { Driver } from '../../../domain/driver';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'drivers-selection',
  templateUrl: './drivers-selection.component.html',
  styleUrls: ['./drivers-selection.component.scss'],
})
export class DriversSelectionComponent implements OnInit {
  private season_ = '';

  private drivers: SelectItem[] = [];

  selectedDrivers: Driver[] = [];
  @Output() selectedDriversChange: EventEmitter<Driver[]> = new EventEmitter();

  constructor(private driversService: DriversService) {}

  ngOnInit() {}

  @Input('season')
  set season(value: string) {
    if (this.season_ !== value) {
      this.season_ = value;
      this.drivers = [];
      this.driversService.get(this.season_).subscribe(dr => {
        this.drivers = dr.map(d => ({
          label: `${d.givenName} ${d.familyName}`,
          value: d,
        }));
        const driversId = dr.map(d => d.driverId);
        this.selectedDrivers = this.selectedDrivers.filter(sdr =>
          driversId.includes(sdr.driverId),
        );
        this.selectedDriversChange.emit(this.selectedDrivers);
      });
    }
  }

  onSelectedDriversChange(event: Driver[]) {
    this.selectedDrivers = event;
    this.selectedDriversChange.emit(this.selectedDrivers);
  }
}
