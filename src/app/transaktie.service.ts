import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BudgetregelMetTransakties} from "./BudgetregelMetTransakties";
import {BudgetGroep} from "./budget-groep";
import {Budget} from "./budget";
import {BudgetgroepMaandtotalen} from "./budgetgroep-maandtotalen";

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

  leesTransakties(): Observable<BudgetregelMetTransakties> {
    let url = "http://localhost:9080/mp-finance/api/transakties";
    return this.http.get<BudgetregelMetTransakties>(url, TransaktieService.HEADER);
  }

  findTransakties(tegenrekening: string, naamTegenpartij: string, omschrijving: string, alleenNietGebudgeteerde: boolean) {
    let url = "http://localhost:9080/mp-finance/api/transakties";
    let queryParams = new HttpParams();
    if (tegenrekening != null) queryParams = queryParams.append("tegenrekening", tegenrekening);
    if (naamTegenpartij != null) queryParams = queryParams.append("naamTegenpartij", naamTegenpartij);
    if (omschrijving != null) queryParams = queryParams.append("omschrijving", omschrijving);
    queryParams = queryParams.append("alleenNietGebudgeteerde", alleenNietGebudgeteerde);
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

  getBudgetten() : Observable<BudgetGroep[]> {
    let url = "http://localhost:9080/mp-finance/api/budgetten";
    return this.http.get<BudgetGroep[]>(url, TransaktieService.HEADER);
  }

  saveBudget(budget: Budget) {
    let url = "http://localhost:9080/mp-finance/api/budgetten";
    return this.http.post(url, JSON.stringify(budget), TransaktieService.HEADER);
  }

  getOverzicht() {
    let url = "http://localhost:9080/mp-finance/api/budgetoverzicht";
    return this.http.get<BudgetgroepMaandtotalen[]>(url, TransaktieService.HEADER);

  }
}
