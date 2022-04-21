export interface Transaktie {

  volgnr: string;
  datum: string;
  bedrag: number;
  saldoNaTrn: number;
  tegenrekening: string;
  naamTegenpartij: string;
  omschrijving: string;
  budget: string;
  soort: string;
}
