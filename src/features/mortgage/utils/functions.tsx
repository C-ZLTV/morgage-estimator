import type {
  MortgageSimulation,
  MortgageTerms,
} from "../types/mortgage.types";
import { RateTypeEnum } from "./variables";

function calculateMortgage(terms: MortgageTerms): MortgageSimulation {
  const { amount, rate, years, installments, rateType } = terms;

  let repayedAmount = 0;
  let payedInstallments = 0;
  let tan = rate / 100.0;

  const simulatedInstallments = Array.from({
    length: years * installments,
  }).map((_, index) => {
    const C = amount - repayedAmount;
    const n = years * installments - payedInstallments;
    const r = tan / installments;

    const installment = calculateInstallment(C, r, n);
    const interest = calculateInstallmentInterest(C, tan, installments);

    if (rateType === RateTypeEnum.VARIABLE) {
      tan = getRate(1.8, 4) / 100.0;
    }
    repayedAmount = repayedAmount + (installment - interest);
    payedInstallments++;

    console.log(repayedAmount, payedInstallments, {
      id: crypto.randomUUID(),
      installment: Number(installment.toFixed(2)),
      interest: Number(interest.toFixed(2)),
      rate: tan * 100.0,
    });

    return {
      id: crypto.randomUUID(),
      installment: Number(installment.toFixed(2)),
      interest: Number(interest.toFixed(2)),
      rate: Number((tan * 100).toFixed(2)),
    };
  });

  return { terms, installments: simulatedInstallments };

  //CALCOLO TASSO FISSO -  Ammortamento alla francese impiegata per il tasso fisso
  /* 
    R =  C*[(r*(1+r)^n)/((1+r)^n-1)]
    C =  Capitale 
    r =  Tasso di interesse periodico (TAN annuo in decimale / numero di rate in un anno)
    n =  Numero totale delle rate (anni del mutuo moltiplicati * numero di rate in un anno)
 */

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

function getRate(min: number, max: number) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function calculateInstallment(C: number, r: number, n: number) {
  return C * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

function calculateInstallmentInterest(
  C: number,
  tan: number,
  installments: number,
) {
  return (C * tan) / installments;
}

function formatInstallment(number: number) {
  const formatted = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(number);

  return formatted;
}

export { calculateMortgage, formatInstallment };
