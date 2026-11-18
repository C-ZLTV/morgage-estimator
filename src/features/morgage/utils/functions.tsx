import type { MortgageTerms } from "../types/morgage.types";

function calculateMorgage(terms: MortgageTerms) {
  const { amount, rate, years, installments, rateType } = terms;

  //CALCOLO TASSO FISSO -  Ammortamento alla francese impiegata per il tasso fisso
  /* 
    R =  C*[(r*(1+r)^n)/((1+r)^n-1)]
    C =  Capitale 
    r =  Tasso di interesse periodico (TAN annuo in decimale / numero di rate in un anno)
    n =  Numero totale delle rate (anni del mutuo moltiplicati * numero di rate in un anno)
 */

  const C = amount;
  const r = rate / 100.0 / installments;
  const n = years * installments;

  const R = C * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  return R.toFixed(2);

  //TODO
  //CALCOLO TASSO VARIABILE

  /* 
  Stessa formula dell'ammortamento alla francese per il tasso fisso, ma il tasso d'interesse viene aggiornato periodicamente l'Euribor  (mediamente 3M o 6M) a cui si somma lo spread. 
  
    1. TAN iniziale in input
    2. Simulazione delle variazioni: con variazioni del TAN esemplificate
    3. Ricalcolo della rata:
      a.nuovo TAN
      b.il capitale residuo (gli interessi della prima rata sono calcolati in questo modo: 100.000 euro × 3%/12 = 250 euro)
      c.la durata residua

    R= C*[(r*(1+r)^n)/((1+r)^n-1)]
    C =  Capitale rimasto
    r =  Tasso di interesse periodico (si ottiene TAN annuo in decimale / numero di rate in un anno)
    n =  Numero totale delle rate residue (anni del mutuo * numero di rate in un anno - rate già saldate)

  https://www.mutuionline.it/guide-mutui/domande-frequenti/qual-e-la-formula-per-il-calcolo-della-rata-del-mutuo.asp
  https://www.mutuisupermarket.it/calcolo-mutuo/simulazione-rata-mutuo-tasso-variabile/
  https://www.immobiliare.it/news/mutui/tipologie-di-mutuo/mutuo-a-tasso-variabile-tutto-quello-che-devi-sapere-362285/
  https://share.google/XuJ0EI7AoqxPWh7Dp

   */
}

export { calculateMorgage };
