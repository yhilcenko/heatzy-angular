import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor(private http: HttpClient) {
  }

  bindings() {
    const params = new HttpParams()
      .set('limit', '20')
      .set('skip', '0');

    return this.http.get('/bindings', { params });
  }

  scheduler(deviceId: string) {
    return this.http.get(`/devdata/${deviceId}/latest`);
  }
}
