import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Season } from '../../domain/season';
import { SeasonsService } from '../../services/seasons.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-controls',
  templateUrl: './app-controls.component.html',
  styleUrls: ['./app-controls.component.scss']
})
export class AppControlsComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    //this.translate.currentLang
  }

}
