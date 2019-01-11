import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../Models/job';

const ApiUrl = "https://localhost:44311/api"

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private _http: HttpClient) { }

  getJobs() {
    return this._http.get(`${ApiUrl}/Job`, {headers: this.getHeaders() });
  }

  createJob(job: Job) {
    return this._http.post(`${ApiUrl}/Job`, job, { headers:  this.getHeaders()});
   }

  private getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer $(localStorage.getItem('id_token')}`)
  }
}
