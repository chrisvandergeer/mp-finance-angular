import {Transaktie} from "./Transaktie";
import {Budgetregel} from "./Budgetregel";

export interface BudgetregelMetTransakties {
  transakties: Transaktie[];
  budgetregel: Budgetregel;
}
