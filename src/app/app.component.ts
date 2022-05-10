import {Component, OnInit} from '@angular/core';
import {TransaktieService} from "./transaktie.service";
import {Transaktie} from "./Transaktie";
import {BudgetregelMetTransakties} from "./BudgetregelMetTransakties";
import {Budgetregel} from "./Budgetregel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  transaktiesForBudgeteren: BudgetregelMetTransakties = <BudgetregelMetTransakties>{};

  constructor(private readonly transaktieService: TransaktieService) {
  }

  ngOnInit() {
    this.leesTransakties();
  }

  findSimilar(transaktie: Transaktie) {
    this.transaktieService.findSimilar(transaktie.volgnr).subscribe(response => this.transaktiesForBudgeteren = response);
  }

  updateTransaktiesVoorBudgeteren() {
    this.transaktieService.findTransakties(
      this.transaktiesForBudgeteren.budgetregel.tegenrekening,
      this.transaktiesForBudgeteren.budgetregel.naamTegenpartij,
      this.transaktiesForBudgeteren.budgetregel.omschrijving).subscribe(response => this.transaktiesForBudgeteren = response);
  }

  budgeteer() {
    this.transaktieService.budgeteer(this.transaktiesForBudgeteren).subscribe(response => this.leesTransakties());
  }

  clearForm() {
    this.transaktiesForBudgeteren.budgetregel = <Budgetregel>{};
    this.leesTransakties();
  }

  private leesTransakties() {
    this.transaktieService.leesTransakties().subscribe(response => this.transaktiesForBudgeteren = response);
  }
}
