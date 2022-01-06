import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Lotacao } from './../models/lotacao';
import { Onibus } from '../models/onibus';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseURL =
    'http://www.poatransporte.com.br/php/facades/process.php?';

  constructor(private http: HttpClient) {}

  getLinhasOnibus(): Observable<Onibus[]> {
    return this.http
      .get<Onibus[]>(`${this.baseURL}a=nc&p=%25&t=o`)
      .pipe(take(1));
  }

  getLinhasLotacao(): Observable<Lotacao[]> {
    return this.http
      .get<Lotacao[]>(`${this.baseURL}a=nc&p=%25&t=l`)
      .pipe(take(1));
  }

  getItinerarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}a=il&p=${id}`).pipe(take(1));
  }
}
