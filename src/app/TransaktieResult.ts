import {Transaktie} from "./Transaktie";
import {Budgetregel} from "./Budgetregel";

export interface TransaktieResult {
  transakties: Transaktie[];
  budgetregel: Budgetregel;
}
