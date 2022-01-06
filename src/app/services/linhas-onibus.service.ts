import { Onibus } from './../models/onibus';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinhasOnibusService {

  private readonly baseURL = "http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%25&t=o";

  constructor(private http: HttpClient) { }

  getLinhasOnibus(): Observable<Onibus[]> {
    return this.http.get<Onibus[]>(this.baseURL).pipe(take(1));
  }
}
