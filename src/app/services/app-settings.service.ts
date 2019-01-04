import { Injectable, EventEmitter } from '@angular/core';

const SETTING_FILTER_VISIBLE = 'filtersVisible';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private _filterVisible: boolean;

  constructor() {}

  get filterVisible(): boolean {
    if (!this._filterVisible) {
      let storageValue = localStorage.getItem(SETTING_FILTER_VISIBLE);

      if (!storageValue) {
        storageValue = '0';
      }

      this._filterVisible = storageValue === '1';
    }
    return this._filterVisible;
  }

  set filterVisible(value: boolean) {
    localStorage.setItem(SETTING_FILTER_VISIBLE, value ? '1' : '0');
    this._filterVisible = value;
  }
}
