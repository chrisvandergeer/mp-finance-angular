import {Component, OnInit} from '@angular/core';
import {TransaktieService} from "./transaktie.service";
import {Transaktie} from "./Transaktie";
import {BudgetregelMetTransakties} from "./BudgetregelMetTransakties";
import {Budgetregel} from "./Budgetregel";
import {BudgetGroep} from "./budget-groep";
import {Budget} from "./budget";
import {BudgetgroepMaandtotalen} from "./budgetgroep-maandtotalen";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  transaktiesForBudgeteren: BudgetregelMetTransakties = <BudgetregelMetTransakties>{};
  budgetGroepen: BudgetGroep[] = [];
  budget: Budget = <Budget>{};
  overzicht: BudgetgroepMaandtotalen[] = [];

  constructor(private readonly transaktieService: TransaktieService) {
  }

  ngOnInit() {
    this.leesTransakties();
    this.leesBudgetten();
    this.getBudgetOverzicht();
    this.transaktiesForBudgeteren.budgetregel = <Budgetregel>{};
    this.transaktiesForBudgeteren.budgetregel.alleenNietGebudgeteerde = false;
  }

  getBudgetmaanden() {
    return this.overzicht[0].budgetMaandTotaalDtoList;
  }

  findSimilar(transaktie: Transaktie) {
    this.transaktieService.findSimilar(transaktie.volgnr).subscribe(response => this.transaktiesForBudgeteren = response);
  }

  updateTransaktiesVoorBudgeteren() {
    this.transaktieService.findTransakties(
      this.transaktiesForBudgeteren.budgetregel.tegenrekening,
      this.transaktiesForBudgeteren.budgetregel.naamTegenpartij,
      this.transaktiesForBudgeteren.budgetregel.omschrijving,
      this.transaktiesForBudgeteren.budgetregel.alleenNietGebudgeteerde).subscribe(response => this.transaktiesForBudgeteren = response);
  }

  budgeteer() {
    this.transaktieService.budgeteer(this.transaktiesForBudgeteren).subscribe(response => this.leesTransakties());
  }

  clearForm() {
    this.leesTransakties();
    this.leesBudgetten();
    this.transaktiesForBudgeteren.budgetregel = <Budgetregel>{};
  }

  saveBudget() {
    this.transaktieService.saveBudget(this.budget).subscribe(response => {
      this.budget = <Budget>{};
      this.leesBudgetten()
    });
  }

  toggleWelNietGebudgeteerde() {
    this.transaktiesForBudgeteren.budgetregel.alleenNietGebudgeteerde = !this.transaktiesForBudgeteren.budgetregel.alleenNietGebudgeteerde;
    this.updateTransaktiesVoorBudgeteren();
  }

  private leesTransakties() {
    this.transaktieService.leesTransakties().subscribe(response => this.transaktiesForBudgeteren = response);
  }

  private leesBudgetten() {
    this.transaktieService.getBudgetten().subscribe(response => this.budgetGroepen = response);
  }

  private getBudgetOverzicht() {
    this.transaktieService.getOverzicht().subscribe(response => this.overzicht = response);
  }

}
