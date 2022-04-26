import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Transaktie} from "./Transaktie";
import {BudgetregelMetTransakties} from "./BudgetregelMetTransakties";

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

  findTransakties(tegenrekening: string, naamTegenpartij: string, omschrijving: string) {
    let url = "http://localhost:9080/mp-finance/api/transakties";
    let queryParams = new HttpParams();
    if (tegenrekening != null) queryParams = queryParams.append("tegenrekening", tegenrekening);
    if (naamTegenpartij != null) queryParams = queryParams.append("naamTegenpartij", naamTegenpartij);
    if (omschrijving != null) queryParams = queryParams.append("omschrijving", omschrijving);
    return this.http.get<BudgetregelMetTransakties>(url, {params: queryParams});
  }

  findSimilar(volgnummer: string) {
    let url = "http://localhost:9080/mp-finance/api/transakties/" + volgnummer;
    return this.http.get<BudgetregelMetTransakties>(url, TransaktieService.HEADER);
  }

  budgeteer(transaktieResult: BudgetregelMetTransakties) {
    let url = "http://localhost:9080/mp-finance/api/transakties";
    return this.http.post(url, JSON.stringify(transaktieResult), TransaktieService.HEADER);
  }

}
