import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WikipediaPage } from '../../../../domain/wikipedia-page';

@Component({
  selector: 'driver-wiki',
  templateUrl: './driver-wiki.component.html',
  styleUrls: ['./driver-wiki.component.scss']
})
export class DriverWikiComponent implements OnInit {

  @Input() wikiPage: WikipediaPage;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
