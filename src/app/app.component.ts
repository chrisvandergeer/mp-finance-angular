import {Component, OnInit} from '@angular/core';
import {TransaktieService} from "./transaktie.service";
import {Transaktie} from "./Transaktie";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  transaktieLijst: Transaktie[] = [];

  constructor(private transaktieService: TransaktieService,
              private readonly http: HttpClient) {
  }

  ngOnInit() {
    this.transaktieService.leesTransakties().subscribe(trlist => this.transaktieLijst.push(...trlist));
  }


  findSimilar(transaktie: Transaktie) {
    alert("findSimilar: " + transaktie.tegenrekening);

  }
}
