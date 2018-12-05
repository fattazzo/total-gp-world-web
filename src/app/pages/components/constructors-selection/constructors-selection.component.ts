import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Constructor } from '../../../domain/constructor';
import { ConstructorsService } from '../../../services/constructors.service';

@Component({
  selector: 'constructors-selection',
  templateUrl: './constructors-selection.component.html',
  styleUrls: ['./constructors-selection.component.scss'],
})
export class ConstructorsSelectionComponent implements OnInit {
  private season_ = '';

  private constructors: Constructor[] = [];

  selectedConstructors: Constructor[] = [];
  @Output() selectedConstructorsChange: EventEmitter<
    Constructor[]
  > = new EventEmitter();

  constructor(private constructorsService: ConstructorsService) {}

  ngOnInit() {}

  @Input('season')
  set season(value: string) {
    if (this.season_ !== value) {
      this.season_ = value;
      this.constructors = [];
      this.constructorsService.get(this.season_).subscribe(ct => {
        this.constructors = ct;
        const constructorsId = ct.map(c => c.constructorId);
        this.selectedConstructors = this.selectedConstructors.filter(sct =>
          constructorsId.includes(sct.constructorId),
        );
        this.selectedConstructorsChange.emit(this.selectedConstructors);
      });
    }
  }

  onSelectedConstructorsChange(event: Constructor[]) {
    this.selectedConstructors = event;
    this.selectedConstructorsChange.emit(this.selectedConstructors);
  }
}
