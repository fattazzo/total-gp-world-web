import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Configuration implements OnInit {
  public season: string;

  public githubUserName = 'fattazzo';

  ngOnInit() {}
}
