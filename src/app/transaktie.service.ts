import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Transaktie} from "./Transaktie";
import {TransaktieResult} from "./TransaktieResult";

@Injectable({
  providedIn: 'root'
})
export class TransaktieService {

  static readonly HEADER = {
    headers: new HttpHeaders({
      Accept: 'application/json; charset=UTF-8',
      'Content-Type': 'application/json; charset=UTF-8',
    })
  };

  private transaktielijst$ = new Subject<Transaktie[]>()

  constructor(private readonly http: HttpClient) { }

  haalTransakties(): Observable<Transaktie[]> {
    return this.http.get("http://localhost:9080/mp-finance/api/transakties", TransaktieService.HEADER).pipe(
      map((result: HttpResponse<Transaktie[]> | any) => {
        return result;
      })
    )
  }

  leesTransakties() : Subject<Transaktie[]> {
    this.http.get<Transaktie[]>("http://localhost:9080/mp-finance/api/transakties", TransaktieService.HEADER)
      .pipe(map(responseData => {
          const trArray : Transaktie[] = [];
          for (const tr in responseData) {
            trArray.push(responseData[tr]);
          }
          return trArray;
        })
      )
      .subscribe(trList => this.transaktielijst$.next(trList));
    return this.transaktielijst$;
  }


}
