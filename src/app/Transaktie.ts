export interface Transaktie {

  volgnr: string;
  datum: Date;
  bedrag: number;
  saldoNaTrn: number;
  tegenrekening: string;
  naamTegenpartij: string;
  omschrijving: string;
  budget: string;
  soort: string;
}
