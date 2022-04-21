import {Component, OnInit} from '@angular/core';
import {TransaktieService} from "./transaktie.service";
import {Transaktie} from "./Transaktie";
import {HttpClient} from "@angular/common/http";
import {TransaktieResult} from "./TransaktieResult";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  transaktieLijst: Transaktie[] = [];
  transaktiesForBudgeteren: TransaktieResult = <TransaktieResult>{};

  constructor(private readonly transaktieService: TransaktieService) {
  }

  ngOnInit() {
    this.transaktieService.leesTransakties().subscribe(trlist => this.transaktieLijst.push(...trlist));
  }

  findSimilar(transaktie: Transaktie) {
    this.transaktieService.findSimilar(transaktie.volgnr).subscribe(response => this.transaktiesForBudgeteren = response);

  }
}
