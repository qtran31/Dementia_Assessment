import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Observation } from 'src/app/domain/observation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
    console.log("API url:", environment.apiUrl)
  }

  callCreatePatient(observation: Observation): Observable<Observation> {
    return this.http.post<Observation>(`${this.apiUrl}/createPatient`, observation);
  }

  callGetResults(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getResults`);
  }

  callVerifyCredentials(username: any): Observable<any> {
    const params = new HttpParams().set('username', username);
    return this.http.get<any>(`${this.apiUrl}/verifyCredentials`, {params});
  }

}