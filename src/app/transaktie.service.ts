import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Transaktie} from "./Transaktie";
import {TransaktieResult} from "./TransaktieResult";

@Injectable({
  providedIn: 'root'
})
export class TransaktieService {

  static readonly HEADER = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor(private readonly http: HttpClient) {
  }

  leesTransakties(): Observable<Transaktie[]> {
    let url = "http://localhost:9080/mp-finance/api/transakties";
    return this.http.get<Transaktie[]>(url, TransaktieService.HEADER);
  }

  findSimilar(volgnummer: string) {
    let url = "http://localhost:9080/mp-finance/api/transakties/" + volgnummer;
    return this.http.get<TransaktieResult>(url, TransaktieService.HEADER);
  }

  budgeteer(transaktieResult: TransaktieResult) {
    let url = "http://localhost:9080/mp-finance/api/transakties";
    return this.http.post(url, JSON.stringify(transaktieResult), TransaktieService.HEADER).subscribe(result => console.log(result));
  }

}
