import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import CardSection  from "@/components/ui/CardSection";


function App() {
 // Objectifs
 const [plusValue, setPlusValue] = useState(0);
 const [rentaBrute, setRentaBrute] = useState(0);
 const [cashflowNet, setCashflowNet] = useState(0);

  // Le bien
  const [ville, setVille] = useState("");
  const [surface, setSurface] = useState(0);
  const [nbChambres, setNbChambres] = useState(0);
  const [typeBien, setTypeBien] = useState("");
  const [prixAffiche, setPrixAffiche] = useState(0);
  const [travauxEstime, setTravauxEstime] = useState(0);
  const fraisNotaire = prixAffiche * 0.08;
  const [prixReno, setPrixReno] = useState(0);

  // Charges globales
  const [taxeFonciere, setTaxeFonciere] = useState(0);
  const [assurancePNO, setAssurancePNO] = useState(0);
  const [assuranceGLI, setAssuranceGLI] = useState(0);

  // Financement
  const [apport, setApport] = useState(0);
  const [tauxCredit, setTauxCredit] = useState(0);
  const [dureeCredit, setDureeCredit] = useState(0);
  const [assuranceCredit, setAssuranceCredit] = useState(0);
  const [autresFrais, setAutresFrais] = useState(0);
  const montantTotalEmprunte = prixAffiche + fraisNotaire + travauxEstime - apport;
  
  // Calcul des mensualités crédit avec assurance
  const tauxMensuel = tauxCredit / 100 / 12;
  const mensualiteHorsAssurance = (montantTotalEmprunte * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -dureeCredit * 12));
  const coutAssurance = (montantTotalEmprunte * (assuranceCredit / 100)) / 12;
  const mensualiteCredit = Math.round(mensualiteHorsAssurance + coutAssurance);

  // Type d'exploitation
  // LCD
  const [prixNuite, setPrixNuite] = useState(0);
  const [electricite, setElectricite] = useState(0);
  const [eau, setEau] = useState(0);
  const [tvInternet, setTvInternet] = useState(0);
  const [commissionConciergerie, setCommissionConciergerie] = useState(0);
  const [vacancesLocativesLCD, setVacancesLocativesLCD] = useState(0);
  const [chargesCoproLCD, setChargesCoproLCD] = useState(0);
  const [autresChargesLCD, setAutresChargesLCD] = useState(0);
  
  // LLD
  const [loyerMensuelLLD, setLoyerMensuelLLD] = useState(0);
  const [vacancesLocativesAnLLD, setVacancesLocativesAnLLD] = useState(0);
  const [chargesCoproLLD, setChargesCoproLLD] = useState(0);
  const [autresChargesLLD, setAutresChargesLLD] = useState(0);
  
  // Colocation
  const [loyerMensuelColoc, setLoyerMensuelColoc] = useState(0);
  const [vacancesLocativesAnColoc, setVacancesLocativesAnColoc] = useState(0);
  const [chargesCoproColoc, setChargesCoproColoc] = useState(0);
  const [autresChargesColoc, setAutresChargesColoc] = useState(0);
  
  // Commercial
  const [loyerMensuelCom, setLoyerMensuelCom] = useState(0);
  const [vacancesLocativesAnCom, setVacancesLocativesAnCom] = useState(0);
  const [chargesCoproCom, setChargesCoproCom] = useState(0);
  const [autresChargesCom, setAutresChargesCom] = useState(0);

  // Calculs

  const loyersAnnuelsLCD = (prixNuite*365)*(vacancesLocativesLCD/100);
  const prixAchatMaxRentaBruteLCD = Math.round(((loyersAnnuelsLCD/(rentaBrute/100))-travauxEstime)*0.92);
  const chargesAnnuellesLCD = (((electricite+eau+tvInternet+chargesCoproLCD+autresChargesLCD+assuranceGLI+assurancePNO)*12)+taxeFonciere+(loyersAnnuelsLCD*(commissionConciergerie/100)));

  const loyersAnnuelsLLD =(loyerMensuelLLD*(12-vacancesLocativesAnLLD));
  const prixAchatMaxRentaBruteLLD = Math.round(((loyersAnnuelsLLD)/(rentaBrute/100)-travauxEstime)*0.92);
  const chargesAnnuellesLLD = ((chargesCoproLLD+autresChargesLLD+assuranceGLI+assurancePNO)*12+taxeFonciere);

  const loyersAnnuelsColoc = ((nbChambres*loyerMensuelColoc)*(12-vacancesLocativesAnColoc));
  const prixAchatMaxRentaBruteColoc = Math.round((((loyersAnnuelsColoc)/(rentaBrute/100))-travauxEstime)*0.92);
  const chargesAnnuellesColoc = ((chargesCoproColoc+autresChargesColoc+assuranceGLI+assurancePNO)*12+taxeFonciere);

  const loyersAnnuelsCom =(loyerMensuelCom*(12-vacancesLocativesAnCom));
  const prixAchatMaxRentaBruteCom = Math.round((((loyersAnnuelsCom)/(rentaBrute/100))-travauxEstime)*0.92);
  const chargesAnnuellesCom = ((chargesCoproCom+autresChargesCom+assuranceGLI+assurancePNO)*12);

  const prixAchatMaxPV = Math.round(((prixReno-plusValue-travauxEstime)/1.08));

  // Vérifier si l'objectif renta brute LCD est atteint
  const isGoalRentaLCDReached = prixAchatMaxRentaBruteLCD > prixAffiche;
  
  // Définir la couleur de la bordure en fonction de la condition
  const borderColorLCD = isGoalRentaLCDReached ? "border-green-500" : "border-red-500";
  const textColorLCD = isGoalRentaLCDReached ? "text-green-600" : "text-red-600";

  // Message à afficher en fonction de la comparaison
  const messageLCD = isGoalRentaLCDReached
    ? "Objectif de  Rentabilité Brute atteint !"
    : `Pour atteindre votre objectif de rentabilité, négociez le prix du bien à ${(prixAffiche + (prixAchatMaxRentaBruteLCD - prixAffiche)).toFixed(2)} € soit ${(((prixAchatMaxRentaBruteLCD/prixAffiche)-1)*100).toFixed(2)} % du prix affiché`;

  // Vérifier si l'objectif renta brute LLD est atteint
  const isGoalRentaLLDReached = prixAchatMaxRentaBruteLLD > prixAffiche;
  
  // Définir la couleur de la bordure en fonction de la condition
  const borderColorLLD = isGoalRentaLLDReached ? "border-green-500" : "border-red-500";
  const textColorLLD = isGoalRentaLLDReached ? "text-green-600" : "text-red-600";

  // Message à afficher en fonction de la comparaison
  const messageLLD = isGoalRentaLLDReached
    ? "Objectif de Rentabilité Brute atteint !"
    : `Pour atteindre votre objectif de rentabilité, négociez le prix du bien à ${(prixAffiche + (prixAchatMaxRentaBruteLLD - prixAffiche)).toFixed(2)} € soit ${(((prixAchatMaxRentaBruteLLD/prixAffiche)-1)*100).toFixed(2)} % du prix affiché`;

   // Vérifier si l'objectif renta brute Coloc est atteint
  const isGoalRentaColocReached = prixAchatMaxRentaBruteColoc > prixAffiche;
  
  // Définir la couleur de la bordure en fonction de la condition
  const borderColorColoc = isGoalRentaColocReached ? "border-green-500" : "border-red-500";
  const textColorColoc = isGoalRentaColocReached ? "text-green-600" : "text-red-600";

  // Message à afficher en fonction de la comparaison
  const messageColoc = isGoalRentaColocReached
    ? "Objectif de Rentabilité Brute atteint !"
    : `Pour atteindre votre objectif de rentabilité, négociez le prix du bien à ${(prixAffiche + (prixAchatMaxRentaBruteColoc - prixAffiche)).toFixed(2)} € soit ${(((prixAchatMaxRentaBruteColoc/prixAffiche)-1)*100).toFixed(2)} % du prix affiché`;

  // Vérifier si l'objectif renta brute Commercial est atteint
  const isGoalRentaComReached = prixAchatMaxRentaBruteCom > prixAffiche;
  
  // Définir la couleur de la bordure en fonction de la condition
  const borderColorCom = isGoalRentaComReached ? "border-green-500" : "border-red-500";
  const textColorCom = isGoalRentaComReached ? "text-green-600" : "text-red-600";

  // Message à afficher en fonction de la comparaison
  const messageCom = isGoalRentaComReached
    ? "Objectif de Rentabilité Brute atteint !"
    : `Pour atteindre votre objectif de rentabilité, négociez le prix du bien à ${(prixAffiche + (prixAchatMaxRentaBruteCom - prixAffiche)).toFixed(2)} € soit ${(((prixAchatMaxRentaBruteCom/prixAffiche)-1)*100).toFixed(2)} % du prix affiché`;

  // Vérifier si l'objectif de plus-value est atteint
  const isGoalPVReached = prixAchatMaxPV > prixAffiche;
  
  // Définir la couleur de la bordure en fonction de la condition
  const borderColorPV = isGoalPVReached ? "border-green-500" : "border-red-500";
  const textColorPV = isGoalPVReached ? "text-green-600" : "text-red-600";

  // Message à afficher en fonction de la comparaison
  const messagePV = isGoalPVReached
    ? "Objectif de Plus Value atteint !"
    : `Pour atteindre votre objectif de plus value, négociez le prix du bien à ${(prixAffiche + (prixAchatMaxPV - prixAffiche)).toFixed(2)} € soit ${(((prixAchatMaxPV/prixAffiche)-1)*100).toFixed(2)} % du prix affiché`;



  return (
    <div className="p-6 grid grid-cols-2 gap-6">

<CardSection
  title="Vos Objectifs"
  inputs={[
    { label: "Plus value", value: plusValue, setValue: setPlusValue, symbol:"€" },
    { label: "Renta brute", value: rentaBrute, setValue: setRentaBrute, symbol:"%"  },
    { label: "Cashflow net", value: cashflowNet, setValue: setCashflowNet, symbol:"€"  },
  ]}
/>
      
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Les Charges Globales</h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1">
              <Label>Taxe foncière</Label>
              <Input type="number" value={taxeFonciere} onChange={(e) => setTaxeFonciere(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Assurance PNO</Label>
              <Input type="number" value={assurancePNO} onChange={(e) => setAssurancePNO(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Assurance GLI</Label>
              <Input type="number" value={assuranceGLI} onChange={(e) => setAssuranceGLI(Number(e.target.value))} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="col-span-2 grid grid-cols-1 gap-6 mt-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Le Bien</h2>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1">
              <Label>Ville</Label>
              <Input value={ville} onChange={(e) => setVille(e.target.value)} />
            </div>
            <div className="flex-1">
              <Label>M2</Label>
              <Input type="number" value={surface} onChange={(e) => setSurface(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Nombre de chambres</Label>
              <Input type="number" value={nbChambres} onChange={(e) => setNbChambres(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Maison ou Appartement</Label>
              <Input value={typeBien} onChange={(e) => setTypeBien(e.target.value)} />
            </div>
            <div className="flex-1">
              <Label>Prix affiché</Label>
              <Input type="number" value={prixAffiche} onChange={(e) => setPrixAffiche(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Travaux estimé</Label>
              <Input type="number" value={travauxEstime} onChange={(e) => setTravauxEstime(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Frais de notaire 8%</Label>
              <Input type="number" value={fraisNotaire.toFixed(2)} readOnly />
            </div>
            <div className="flex-1">
              <Label>Prix une fois rénové</Label>
              <Input type="number" value={prixReno} onChange={(e) => setPrixReno(Number(e.target.value))} />
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      <div className="col-span-2 grid grid-cols-1 gap-6 mt-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Le Financement</h2>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1">
          <Label>Apport</Label>
          <Input type="number" value={apport} onChange={(e) => setApport(Number(e.target.value))} />
              </div>
            <div className="flex-1">
          <Label>Taux</Label>
          <Input type="number" value={tauxCredit} onChange={(e) => setTauxCredit(Number(e.target.value))} />
              </div>
            <div className="flex-1">
          <Label>Durée</Label>
          <Input type="number" value={dureeCredit} onChange={(e) => setDureeCredit(Number(e.target.value))} />
              </div>
            <div className="flex-1">
          <Label>Assurance crédit</Label>
          <Input type="number" value={assuranceCredit} onChange={(e) => setAssuranceCredit(Number(e.target.value))} />
              </div>
            <div className="flex-1">
          <Label>Autres frais</Label>
          <Input type="number" value={autresFrais} onChange={(e) => setAutresFrais(Number(e.target.value))} />
              </div>
              <div className="flex-1">
          <Label>Montant total emprunté</Label>
          <Input type="number" value={montantTotalEmprunte.toFixed(2)} readOnly />
              </div>
            <div className="flex-1">
          <Label>Mensualités crédit</Label>
          <Input type="number" value={mensualiteCredit.toFixed(2)} readOnly />
              </div>
            </div>
        </CardContent>
      </Card>
      </div>
      
      <div className="col-span-2 grid grid-cols-1 gap-6 mt-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Type d'exploitation</h2>
          <h3 className="font-semibold">LCD</h3>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex-1">
              <Label>Prix nuité</Label>
              <Input type="number" value={prixNuite} onChange={(e) => setPrixNuite(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Electricité (mois)</Label>
              <Input type="number" value={electricite} onChange={(e) => setElectricite(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Eau (mois)</Label>
              <Input type="number" value={eau} onChange={(e) => setEau(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>TV/Internet (mois)</Label>
              <Input type="number" value={tvInternet} onChange={(e) => setTvInternet(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Commission conciergerie (%)</Label>
              <Input type="number" value={commissionConciergerie} onChange={(e) => setCommissionConciergerie(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Vacances locatives par mois (%)</Label>
              <Input type="number" value={vacancesLocativesLCD} onChange={(e) => setVacancesLocativesLCD(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Charges copro (mois)</Label>
              <Input type="number" value={chargesCoproLCD} onChange={(e) => setChargesCoproLCD(Number(e.target.value))} />
            </div>
            <div className="flex-1">
              <Label>Autres charges (mois)</Label>
              <Input type="number" value={autresChargesLCD} onChange={(e) => setAutresChargesLCD(Number(e.target.value))} />
            </div>
          </div>
        </CardContent>
      </Card>
        </div>
        
      <div className="col-span-2 grid grid-cols-3 gap-6 mt-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Type d'exploitation</h2>
          <h3 className="font-semibold">LLD</h3>
              <Label>Loyer mensuel</Label>
              <Input type="number" value={loyerMensuelLLD} onChange={(e) => setLoyerMensuelLLD(Number(e.target.value))} />
              <Label>Vacances locatives par an en nombre de mois</Label>
              <Input type="number" value={vacancesLocativesAnLLD} onChange={(e) => setVacancesLocativesAnLLD(Number(e.target.value))} />
              <Label>Charges copro (mois)</Label>
              <Input type="number" value={chargesCoproLLD} onChange={(e) => setChargesCoproLLD(Number(e.target.value))} />
              <Label>Autres charges (mois)</Label>
              <Input type="number" value={autresChargesLLD} onChange={(e) => setAutresChargesLLD(Number(e.target.value))} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Type d'exploitation</h2>
          <h3 className="font-semibold">Colocation</h3>
              <Label>Loyer mensuel</Label>
              <Input type="number" value={loyerMensuelColoc} onChange={(e) => setLoyerMensuelColoc(Number(e.target.value))} />
              <Label>Vacances locatives par an en nombre de mois</Label>
              <Input type="number" value={vacancesLocativesAnColoc} onChange={(e) => setVacancesLocativesAnColoc(Number(e.target.value))} />
              <Label>Charges copro (mois)</Label>
              <Input type="number" value={chargesCoproColoc} onChange={(e) => setChargesCoproColoc(Number(e.target.value))} />
              <Label>Autres charges (mois)</Label>
              <Input type="number" value={autresChargesColoc} onChange={(e) => setAutresChargesColoc(Number(e.target.value))} />
        </CardContent>
      </Card>


      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">Type d'exploitation</h2>
          <h3 className="font-semibold">Commercial</h3>
              <Label>Loyer mensuel</Label>
              <Input type="number" value={loyerMensuelCom} onChange={(e) => setLoyerMensuelCom(Number(e.target.value))} />
              <Label>Vacances locatives par an en nombre de mois</Label>
              <Input type="number" value={vacancesLocativesAnCom} onChange={(e) => setVacancesLocativesAnCom(Number(e.target.value))} />
              <Label>Charges copro (mois)</Label>
              <Input type="number" value={chargesCoproCom} onChange={(e) => setChargesCoproCom(Number(e.target.value))} />
              <Label>Autres charges (mois)</Label>
              <Input type="number" value={autresChargesCom} onChange={(e) => setAutresChargesCom(Number(e.target.value))} />
        </CardContent>
      </Card>
</div>
<div className="col-span-2 grid grid-cols-1 gap-6 mt-6"><h1 className="text-xl"><center>Résultats</center></h1></div>
      <div className="col-span-2 grid grid-cols-4 gap-6 mt-6">
                <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">LCD</h2>
            <Label>Total des charges annuelles</Label>
            <Input type="number" value={chargesAnnuellesLCD} readOnly />
            <Label>Total des loyers annuels</Label>
            <Input type="number" value={loyersAnnuelsLCD} readOnly />
            <Label>Rendement brut</Label>
            <Input type="number" value={parseFloat(((loyersAnnuelsLCD*100)/(prixAffiche+fraisNotaire+travauxEstime+autresFrais)).toFixed(2))} readOnly />
            <Label>Rendement Net</Label>
            <Input type="number" value={parseFloat((((loyersAnnuelsLCD-chargesAnnuellesLCD)*100)/(prixAffiche+fraisNotaire+travauxEstime+autresFrais)).toFixed(2))} readOnly />
            <Label>Cashflow mensuel avant impôts</Label>
            <Input type="number" value={Math.round((loyersAnnuelsLCD-(chargesAnnuellesLCD+(mensualiteCredit*12)))/12)} readOnly />
            
            <Label>Prix d'achat max Objectif rentabilité</Label>
            <Input type="number" value={prixAchatMaxRentaBruteLCD}  className={`border-2 rounded-lg p-2 ${borderColorLCD}`} readOnly />
            {/* Affichage du message conditionnel RLCD*/}
            <center><p className={`${textColorLCD} text-sm font-semibold`}>{messageLCD}</p></center>
            
            <Label>Prix d'achat max Objectif de Plus Value</Label>
            <Input type="number" value={prixAchatMaxPV} className={`border-2 rounded-lg p-2 ${borderColorPV}`} readOnly />
            {/* Affichage du message conditionnel PV*/}
            <center><p className={`${textColorPV} text-sm font-semibold`}>{messagePV}</p></center>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">LDD</h2>
            <Label>Total des charges annuelles</Label>
            <Input type="number" value={chargesAnnuellesLLD} readOnly />
            <Label>Total des loyers annuels</Label>
            <Input type="number" value={loyersAnnuelsLLD} readOnly />
            <Label>Rendement brut</Label>
            <Input type="number" value={parseFloat(((loyersAnnuelsLLD*100)/(prixAffiche+fraisNotaire+travauxEstime+autresFrais)).toFixed(2))} readOnly />
            <Label>Rendement Net</Label>
            <Input type="number" value={parseFloat((((loyersAnnuelsLLD-chargesAnnuellesLLD)*100)/(prixAffiche+fraisNotaire+travauxEstime+autresFrais)).toFixed(2))} readOnly />
            <Label>Cashflow mensuel avant impôts</Label>
            <Input type="number" value={Math.round((loyersAnnuelsLLD-(chargesAnnuellesLLD+(mensualiteCredit*12)))/12)} readOnly />
            
            <Label>Prix d'achat max Objectif rentabilité</Label>
            <Input type="number" value={prixAchatMaxRentaBruteLLD} className={`border-2 rounded-lg p-2 ${borderColorLLD}`} readOnly />
            {/* Affichage du message conditionnel RLLD*/}
            <center><p className={`${textColorLLD} text-sm font-semibold`}>{messageLLD}</p></center>
            
            <Label>Prix d'achat max Objectif de Plus Value</Label>
            <Input type="number" value={prixAchatMaxPV} className={`border-2 rounded-lg p-2 ${borderColorPV}`} readOnly />
            {/* Affichage du message conditionnel PV */}
            <center><p className={`${textColorPV} text-sm font-semibold`}>{messagePV}</p></center>

          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Coloc</h2>
            <Label>Total des charges annuelles</Label>
            <Input type="number" value={chargesAnnuellesColoc} readOnly />
            <Label>Total des loyers annuels</Label>
            <Input type="number" value={loyersAnnuelsColoc} readOnly />
            <Label>Rendement brut</Label>
            <Input type="number" value={parseFloat(((loyersAnnuelsColoc*100)/(prixAffiche+fraisNotaire+travauxEstime+autresFrais)).toFixed(2))} readOnly />
            <Label>Rendement Net</Label>
            <Input type="number" value={parseFloat((((loyersAnnuelsColoc-chargesAnnuellesColoc)*100)/(prixAffiche+fraisNotaire+travauxEstime+autresFrais)).toFixed(2))} readOnly />
            <Label>Cashflow mensuel avant impôts</Label>
            <Input type="number" value={Math.round((loyersAnnuelsColoc-(chargesAnnuellesColoc+(mensualiteCredit*12)))/12)} readOnly />
            
            <Label>Prix d'achat max Objectif rentabilité</Label>
            <Input type="number" value={prixAchatMaxRentaBruteColoc} className={`border-2 rounded-lg p-2 ${borderColorColoc}`} readOnly />
            {/* Affichage du message conditionnel RColoc*/}
            <center><p className={`${textColorColoc} text-sm font-semibold`}>{messageColoc}</p></center>
            
            <Label>Prix d'achat max Objectif de Plus Value</Label>
            <Input type="number" value={prixAchatMaxPV} className={`border-2 rounded-lg p-2 ${borderColorPV}`} readOnly />
            {/* Affichage du message conditionnel PV */}
            <center><p className={`${textColorPV} text-sm font-semibold`}>{messagePV}</p></center>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Commercial</h2>
            <Label>Total des charges annuelles</Label>
            <Input type="number" value={chargesAnnuellesCom} readOnly />
            <Label>Total des loyers annuels</Label>
            <Input type="number" value={loyersAnnuelsCom} readOnly />
            <Label>Rendement brut</Label>
            <Input type="number" value={parseFloat(((loyersAnnuelsCom*100)/(prixAffiche+fraisNotaire+travauxEstime+autresFrais)).toFixed(2))} readOnly />
            <Label>Rendement Net</Label>
            <Input type="number" value={parseFloat((((loyersAnnuelsCom-chargesAnnuellesCom)*100)/(prixAffiche+fraisNotaire+travauxEstime+autresFrais)).toFixed(2))} readOnly />
            <Label>Cashflow mensuel avant impôts</Label>
            <Input type="number" value={Math.round((loyersAnnuelsCom-(chargesAnnuellesCom+(mensualiteCredit*12)))/12)} readOnly />
            
            <Label>Prix d'achat max Objectif rentabilité</Label>
            <Input type="number" value={prixAchatMaxRentaBruteCom} className={`border-2 rounded-lg p-2 ${borderColorCom}`} readOnly />
            {/* Affichage du message conditionnel RCom*/}
            <center><p className={`${textColorCom} text-sm font-semibold`}>{messageCom}</p></center>
            
            <Label>Prix d'achat max Objectif de Plus Value</Label>
            <Input type="number" value={prixAchatMaxPV} className={`border-2 rounded-lg p-2 ${borderColorPV}`} readOnly />
            {/* Affichage du message conditionnel PV */}
            <center><p className={`${textColorPV} text-sm font-semibold`}>{messagePV}</p></center>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
