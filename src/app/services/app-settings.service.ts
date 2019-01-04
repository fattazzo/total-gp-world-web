import { Injectable, EventEmitter } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

const SETTING_FILTER_VISIBLE = 'filtersVisible';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private _filterVisible: boolean;

  constructor(private deviceService: DeviceDetectorService) {}

  get filterVisible(): boolean {
    if (!this._filterVisible) {
      let storageValue = localStorage.getItem(SETTING_FILTER_VISIBLE);

      if (!storageValue) {
        storageValue = this.deviceService.isDesktop() ? '1' : '0';
        localStorage.setItem(SETTING_FILTER_VISIBLE, storageValue);
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
