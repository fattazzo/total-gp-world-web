import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'driver-results-header',
  templateUrl: './driver-results-header.component.html',
  styleUrls: ['./driver-results-header.component.scss']
})
export class DriverResultsHeaderComponent implements OnDestroy {

  private alive = true;

  @Output() typeChange = new EventEmitter<string>();

  @Input() type = 'Points';
  types = ['Points', 'Grid', 'Position'];

  @Input() showTypesControl = false

  currentTheme: string;

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  changeType(typeParam: string): void {
    this.type = typeParam;
    this.typeChange.emit(typeParam);
  }

}
