import './App.css';
import React, { useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button, Modal} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Upload from './components/Upload';
import MainPage from './components/MainPage';
import { faDownload  } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import XMLParser from 'react-xml-parser';
import xmlbuilder from 'xmlbuilder';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import Materialplanung from './components/Materialplanung';
import Reihenfolge from './components/Reihenfolge';
import Kaufteildisposition from './components/Bestellplanung';
import KapPla from './components/KapPla';
import Ende from './components/Ende';


function App() {
  const [step2Valid, setStep2Valid] = useState(false);
  const [step3Valid, setStep3Valid] = useState(false);
  const [step4Valid, setStep4Valid] = useState(false);
  const [step5Valid, setStep5Valid] = useState(false);
  const [step6Valid, setStep6Valid] = useState(false);
  const [step7Valid, setStep7Valid] = useState(false);

  const [aktuellePeriode, setAktuellePeriode] = useState(0);

  const [lagerbestandP1Mat, setLagerbestandP1Mat] = useState([]);
  const [lagerbestandP2Mat, setLagerbestandP2Mat] = useState([]);
  const [lagerbestandP3Mat, setLagerbestandP3Mat] = useState([]);
  const [geplanteLaP1, setGeplanteLaP1] = useState([]);
  const [geplanteLaP2, setGeplanteLaP2] = useState([]);
  const [geplanteLaP3, setGeplanteLaP3] = useState([]);
  const [materialplanTabelle1, setMaterialplanTabelle1] = useState([]);
  const [materialplanTabelle2, setMaterialplanTabelle2] = useState([]);
  const [materialplanTabelle3, setMaterialplanTabelle3] = useState([]);
  const [warteschlangeMenge, setWarteschlangeMenge] = useState([]);
  const [inBearbeitung, setInBearbeitung] = useState([]);


  const [geplaP1, setGeplaP1] = useState(0);
  const [geplaP2, setGeplaP2] = useState(0);
  const [geplaP3, setGeplaP3] = useState(0);
  const [ruestNeu, setRuestNeu] = useState([60, 80, 60, 80, 30, 170, 110, 105, 120, 100, 0, 0, 0, 30]);
  


  const [kapPlaTabelle, setKapPlaTabelle] = useState([]);
  const [kapBedarfNeu, setKapBedarfNeu] = useState([]);
  const [ruestVorP, setRuestVorP] = useState([]);
  const [warteschlangeZeit, setWarteschlangeZeit] = useState([]);
  const [noetigeRuest, setNoetigeRuest] = useState([]);

  const [reihenfolgePlannung, setReihenfolgePlannung] = useState([]);
  const [kaufteildisposition, setKaufteildisposition] = useState([]);
  const [kaufteilEntscheidungen, setKaufteilEntscheidungen] = useState([
    {article: 21, bestellmenge: 0, bestellart: 5},
    {article: 22, bestellmenge: 0, bestellart: 5},
    {article: 23, bestellmenge: 0, bestellart: 5},
    {article: 24, bestellmenge: 0, bestellart: 5},
    {article: 25, bestellmenge: 0, bestellart: 5},
    {article: 27, bestellmenge: 0, bestellart: 5},
    {article: 28, bestellmenge: 0, bestellart: 5},
    {article: 32, bestellmenge: 0, bestellart: 5},
    {article: 33, bestellmenge: 0, bestellart: 5},
    {article: 34, bestellmenge: 0, bestellart: 5},
    {article: 35, bestellmenge: 0, bestellart: 5},
    {article: 36, bestellmenge: 0, bestellart: 5},
    {article: 37, bestellmenge: 0, bestellart: 5},
    {article: 38, bestellmenge: 0, bestellart: 5},
    {article: 39, bestellmenge: 0, bestellart: 5},
    {article: 40, bestellmenge: 0, bestellart: 5},
    {article: 41, bestellmenge: 0, bestellart: 5},
    {article: 42, bestellmenge: 0, bestellart: 5},
    {article: 43, bestellmenge: 0, bestellart: 5},
    {article: 44, bestellmenge: 0, bestellart: 5},
    {article: 45, bestellmenge: 0, bestellart: 5},
    {article: 46, bestellmenge: 0, bestellart: 5},
    {article: 47, bestellmenge: 0, bestellart: 5},
    {article: 48, bestellmenge: 0, bestellart: 5},
    {article: 52, bestellmenge: 0, bestellart: 5},
    {article: 53, bestellmenge: 0, bestellart: 5},
    {article: 57, bestellmenge: 0, bestellart: 5},
    {article: 58, bestellmenge: 0, bestellart: 5},
    {article: 59, bestellmenge: 0, bestellart: 5},
  ]);

  const [schichten, setSchichten] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
  const [ueberstunden, setUberstunden] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

  const [warteschlange, setWarteschlange] = useState(() => {
    const savedMatrix = localStorage.getItem('warteschlange');
    if (savedMatrix) {
      return JSON.parse(savedMatrix);
    } else {
      return [
        {article: '-1', amount: 0},
      ];
    }
  });

  // --------------- FÜR DEN STATE UND INITIALIZE -----------------------
  const [lagerbestandMatrix, setLagerbestandMatrix] = useState(() => {
    const savedMatrix = localStorage.getItem('lagerbestandMatrix');
    if (savedMatrix) {
      return JSON.parse(savedMatrix);
    } else {
      return [
        [1, 0],
        [2, 0],
        [3, 0],
      ];
    }
  });

  const [lieferprogrammMatrix, setLieferprogrammMatrix] = useState(() => {
    const savedMatrix = localStorage.getItem('lieferprogrammMatrix');
    if (savedMatrix) {
      return JSON.parse(savedMatrix);
    } else {
      return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    }
  });

  const [produktionsprogrammMatrix, setProduktionsprogrammQuantityMatrix] = useState(() => {
    const savedMatrix = localStorage.getItem('produktionsprogrammMatrix');
    if (savedMatrix) {
      return JSON.parse(savedMatrix);
    } else {
      return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    }
  });

  const [zusatzauftragMatrix, setZusatzauftragQuantityMatrix] = useState(() => {
    const savedMatrix = localStorage.getItem('zusatzauftragMatrix');
    if (savedMatrix) {
      return JSON.parse(savedMatrix);
    } else {
      return [
        ['0', '0.0', '0.0'],
        ['0', '0.0', '0.0'],
        ['0', '0.0', '0.0'],
      ];
    }
  });

  // ------------------------------------------------------

  // --------------- FÜR ON CHANGE -----------------------
  const lieferprogrammChange = (productIndex, periodIndex, value) => {
    const updatedMatrix = [...lieferprogrammMatrix];
    updatedMatrix[productIndex][periodIndex] = parseInt(value) || 0;
    setLieferprogrammMatrix(updatedMatrix);
  };

  const produktionsprogrammChange = (productIndex, periodIndex, value) => {
    const updatedMatrix = [...produktionsprogrammMatrix];
    updatedMatrix[productIndex][periodIndex] = parseInt(value) || 0;
    setProduktionsprogrammQuantityMatrix(updatedMatrix);
    handleChangeTabelle1(0,0);
    handleChangeTabelle2(0,0);
    handleChangeTabelle3(0,0);
  };

  const zusatzauftragChange = (productIndex, periodIndex, value) => {
    const updatedMatrix = [...zusatzauftragMatrix];
    updatedMatrix[productIndex][periodIndex] = value || 0;
    setZusatzauftragQuantityMatrix(updatedMatrix);
  };
  // ------------------------------------------------------

  // --------------- USE EFFECT -----------------------
  useEffect(() => {
    localStorage.setItem('lagerbestandMatrix', JSON.stringify(lagerbestandMatrix));
  }, [lagerbestandMatrix]);

  useEffect(() => {
    // Save matrix to local storage whenever it changes
    localStorage.setItem('lieferprogrammMatrix', JSON.stringify(lieferprogrammMatrix));
  }, [lieferprogrammMatrix]);

  useEffect(() => {
    localStorage.setItem('produktionsprogrammMatrix', JSON.stringify(produktionsprogrammMatrix));
  }, [produktionsprogrammMatrix]);
  
  useEffect(() => {
    localStorage.setItem('zusatzauftragMatrix', JSON.stringify(zusatzauftragMatrix));
  }, [zusatzauftragMatrix]);

  useEffect(() => {
    localStorage.setItem('warteschlange', JSON.stringify(warteschlange));
  }, [warteschlange]);
  // ------------------------------------------------------


  const [selectedLanguage, setSelectedLanguage] = useState('Deutsch');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    if (language === 'Deutsch') {
      i18n.changeLanguage('de');
    } else {
      i18n.changeLanguage('en');
    }
  };

  useEffect(() => {
    const alles = materialplanTabelle1.concat(materialplanTabelle2, materialplanTabelle3).filter(obj => obj.article !== '')
    
    const combinedArray = Object.values(
      alles.reduce((acc, obj) => {
        const { article, spalteH } = obj;
    
        if (!acc[article]) {
          acc[article] = { article, quantity: spalteH };
        } else {
          acc[article].quantity += spalteH;
        }
    
        return acc;
      }, {})
    );

    combinedArray.forEach(item => {
      item.quantity = Math.floor(item.quantity);
    })

    const specificOrder = ["E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18", "E19", "E20", "E26", "E49", "E54","E29","E50","E55","E30","E51","E56","E31","P1","P2","P3"]

    combinedArray.sort((a, b) => {
      const indexA = specificOrder.indexOf(a.article);
      const indexB = specificOrder.indexOf(b.article);
    
      if (indexA < indexB) {
        return -1;
      } else if (indexA > indexB) {
        return 1;
      } else {
        return 0;
      }
    });

    combinedArray.forEach(item => {
      switch(item.article) {
        case 'E4':
          item.ab10 = 4 * item.quantity
          item.ab11 = 3 * item.quantity
          break;
        case 'E5':
          item.ab10 = 4 * item.quantity
          item.ab11 = 3 * item.quantity
          break;
        case 'E6':
          item.ab10 = 4 * item.quantity
          item.ab11 = 3 * item.quantity
          break;
        case 'E7':
          item.ab10 = 4 * item.quantity
          item.ab11 = 3 * item.quantity
          break;
        case 'E8':
            item.ab10 = 4 * item.quantity
            item.ab11 = 3 * item.quantity
            break;
        case 'E9':
          item.ab10 = 4 * item.quantity
          item.ab11 = 3 * item.quantity
          break;
        case 'E10':
          item.ab7 = 2 * item.quantity
          item.ab8 = 1 * item.quantity
          item.ab9 = 3 * item.quantity
          item.ab12 = 3 * item.quantity
          item.ab13 = 2 * item.quantity
          break;
        case 'E11':
          item.ab7 = 2 * item.quantity
          item.ab8 = 2 * item.quantity
          item.ab9 = 3 * item.quantity
          item.ab12 = 3 * item.quantity
          item.ab13 = 2 * item.quantity
          break;
        case 'E12':
          item.ab7 = 2 * item.quantity
          item.ab8 = 2 * item.quantity
          item.ab9 = 3 * item.quantity
          item.ab12 = 3 * item.quantity
          item.ab13 = 2 * item.quantity
          break;
        case 'E13':
          item.ab7 = 2 * item.quantity
          item.ab8 = 1 * item.quantity
          item.ab9 = 3 * item.quantity
          item.ab12 = 3 * item.quantity
          item.ab13 = 2 * item.quantity
          break;
        case 'E14':
          item.ab7 = 2 * item.quantity
          item.ab8 = 2 * item.quantity
          item.ab9 = 3 * item.quantity
          item.ab12 = 3 * item.quantity
          item.ab13 = 2 * item.quantity
          break;
        case 'E15':
          item.ab7 = 2 * item.quantity
          item.ab8 = 2 * item.quantity
          item.ab9 = 3 * item.quantity
          item.ab12 = 3 * item.quantity
          item.ab13 = 2 * item.quantity
          break;
        case 'E16':
          item.ab6 = 2 * item.quantity
          item.ab14 = 3 * item.quantity
          break;
        case 'E17':
          item.ab15 = 3 * item.quantity
          break;
        case 'E18':
          item.ab6 = 3 * item.quantity
          item.ab7 = 2 * item.quantity
          item.ab8 = 3 * item.quantity
          item.ab9 = 2 * item.quantity
          break;
        case 'E19':
          item.ab6 = 3 * item.quantity
          item.ab7 = 2 * item.quantity
          item.ab8 = 3 * item.quantity
          item.ab9 = 2 * item.quantity
          break;
        case 'E20':
          item.ab6 = 3 * item.quantity
          item.ab7 = 2 * item.quantity
          item.ab8 = 3 * item.quantity
          item.ab9 = 2 * item.quantity
          break;
        case 'E26':
          item.ab7 = 2 * item.quantity
          item.ab15 = 3 * item.quantity
          break;
        case 'E49':
          item.ab1 = 6 * item.quantity
          break;
        case 'E54':
          item.ab1 = 6 * item.quantity
          break;
        case 'E29':
          item.ab1 = 6 * item.quantity
          break;
        case 'E50':
          item.ab2 = 5 * item.quantity
          break;
        case 'E55':
          item.ab2 = 5 * item.quantity
          break;
        case 'E30':
          item.ab2 = 5 * item.quantity
          break;
        case 'E51':
          item.ab3 = 5 * item.quantity
          break;
        case 'E56':
          item.ab3 = 6 * item.quantity
          break;
        case 'E31':
          item.ab3 = 6 * item.quantity
          break;
        case 'P1':
          item.ab4 = 6 * item.quantity
          break;
        case 'P2':
          item.ab4 = 7 * item.quantity
          break;
        case 'P3':
          item.ab4 = 7 * item.quantity
          break;
        default:
          break;
      }
    })

    setKapPlaTabelle(combinedArray);

    const abKeys = ["ab1", "ab2", "ab3", "ab4", "ab6", "ab7", "ab8", "ab9", "ab10", "ab11", "ab12", "ab13", "ab14", "ab15"]
    const sumArray = [];
    abKeys.forEach(abKey => {
      const sum = combinedArray.reduce((accumulator, item) => accumulator + (item[abKey] || 0), 0);
      sumArray.push(sum);
    });

    setKapBedarfNeu(sumArray)

    const ruestis = []
    noetigeRuest.forEach(item => {
      switch (item.arbeitsplatz) {
        case "1":
          ruestis.push({arbeitsplatz: "1", time: 20})
          break;
        case "2":
          if (item.article === '30') {
            ruestis.push({arbeitsplatz: "2", time: 20})
          } else {
            ruestis.push({arbeitsplatz: "2", time: 30})
          }
          break;
        case "3":
          ruestis.push({arbeitsplatz: "3", time: 20})
          break;
        case "4":
          if (item.article === '2') {
            ruestis.push({arbeitsplatz: "4", time: 20})
          } else {
            ruestis.push({arbeitsplatz: "4", time: 30})
          }
          break;
        case "6":
          ruestis.push({arbeitsplatz: "6", time: 15})
          break;
        case "7":
          if (item.article === '26') {
            ruestis.push({arbeitsplatz: "7", time: 30})
          } else {
            ruestis.push({arbeitsplatz: "7", time: 20})
          }
          break;
        case "8":
          if (item.article === '18' || item.article === '20') {
            ruestis.push({arbeitsplatz: "8", time: 20})
          } else if (item.article === '19') {
            ruestis.push({arbeitsplatz: "8", time: 25})
          } else {
            ruestis.push({arbeitsplatz: "8", time: 15})
          }
          break;
        case "9":
          if (item.article === '19') {
            ruestis.push({arbeitsplatz: "9", time: 20})
          } else {
            ruestis.push({arbeitsplatz: "9", time: 15})
          }
          break;
        case "10":
          ruestis.push({arbeitsplatz: "10", time: 20})
          break;
        case "11":
          if (item.article === '4' || item.article === '5') {
            ruestis.push({arbeitsplatz: "11", time: 10})
          } else {
            ruestis.push({arbeitsplatz: "11", time: 20})
          }
          break;
        case "12":
          ruestis.push({arbeitsplatz: "12", time: 0})
          break;
        case "13":
          ruestis.push({arbeitsplatz: "13", time: 0})
          break;
        case "14":
          ruestis.push({arbeitsplatz: "14", time: 0})
          break;
        case "15":
          ruestis.push({arbeitsplatz: "15", time: 15})
          break;
        default:
          break;
      }
    })

    const resultRuest = [];
    // Iterate over the inputArray
    for (const item of ruestis) {
      const arbeitsplatz = item.arbeitsplatz;
      const time = item.time;

      // Check if an entry for the arbeitsplatz already exists in the resultArray
      const existingItem = resultRuest.find(obj => obj.arbeitsplatz === arbeitsplatz);

      if (existingItem) {
        // If an entry exists, add the time to the existing value
        existingItem.time += time;
      } else {
        // If no entry exists, create a new object and add it to the resultArray
        resultRuest.push({ arbeitsplatz, time });
      }
    }

    setRuestVorP(resultRuest);

    const schichtenArray = [];
    const ueberstundenArray = [];

    sumArray.forEach((item, index) => {
      const arplatz = index + 1 > 4 ? index + 2 : index +1;
      const wsZeit = warteschlangeZeit.find(item => parseInt(item.arbeitsplatz) === arplatz);
      let summe = item;
      if (wsZeit) {
        summe += wsZeit.timeneed;
      }
      const ruestZ = resultRuest.find(item => parseInt(item.arbeitsplatz) === arplatz);
      if (ruestZ) {
        summe += ruestZ.time;
      }

      let randomValue = ruestNeu[index];
      summe = summe + randomValue;

      let valueU = 0;
      switch (true) {
        case (summe <= 3600):
          schichtenArray.push(1);
          if (summe > 2400) {
            valueU = parseInt((summe - 2400) / 5);
          } else {
            valueU = 0;
          }
         
          ueberstundenArray.push(valueU);
          break;
        case (summe > 3600 && summe <= 6000):
          schichtenArray.push(2);
          if (summe > 4800) {
            valueU = parseInt((summe - 4800) / 5);
          } else {
            valueU = 0;
          }
          ueberstundenArray.push(valueU);
          break;
        case (summe > 5040 && summe <= 5040):
            schichtenArray.push(3);
            valueU = 0;
            ueberstundenArray.push(valueU);
            break;
        default:
          schichtenArray.push(3);
          valueU = 0;
          ueberstundenArray.push(valueU);
          break;
      }

      setSchichten(schichtenArray);
      setUberstunden(ueberstundenArray);
    })


  }, [materialplanTabelle1, materialplanTabelle2, materialplanTabelle3, noetigeRuest, warteschlangeZeit, ruestNeu]);

  useEffect(() => {
    const alles = materialplanTabelle1.concat(materialplanTabelle2, materialplanTabelle3).filter(obj => obj.article !== '')
    
    const combinedArray = Object.values(
      alles.reduce((acc, obj) => {
        const { article, spalteH } = obj;
    
        if (!acc[article]) {
          acc[article] = { article, quantity: spalteH };
        } else {
          acc[article].quantity += spalteH;
        }
    
        return acc;
      }, {})
    );

    combinedArray
      .sort((a, b) => {
        const numA = parseInt(a.article.slice(1));
        const numB = parseInt(b.article.slice(1));
        return numA - numB;
      });

    combinedArray.forEach(obj => {
      obj.input = 0;
      obj.quantity = Math.floor(obj.quantity);
    });
      
    setReihenfolgePlannung(combinedArray);
  }, [materialplanTabelle1, materialplanTabelle2, materialplanTabelle3]);


  useEffect(() => {
  // FÜR die Kaufteildispositionstabelle :)
  const tolleTabelle = [];
  const nurKTeile = [21,22,23,24,25,27,28,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,52,53,57,58,59];

  const lagerbestandKTeile = lagerbestandMatrix.filter(innerArray => nurKTeile.includes(innerArray.article));

  lagerbestandKTeile.forEach(item => {
    let zeileObj = {};
    let berechnungBedarf1 = 0;
    let berechnungBedarf2 = 0;
    let berechnungBedarf3 = 0;
    let berechnungBedarf4 = 0;
    let berechnungBestand1 = 0;
    let berechnungBestand2 = 0;
    let berechnungBestand3 = 0;
    let berechnungBestand4 = 0;
    let verwendungp1 = 0;
    let verwendungp2 = 0;
    let verwendungp3 = 0;
    switch (item.article) {
      case 21: 
        zeileObj = {kaufteil: 'K21', frist: '2,2', verwendungp1: 1, verwendungp2: 0, verwendungp3: 0, disko: 300, anfangsbestand: item.quantity, bedarf1: produktionsprogrammMatrix[0][0], bedarf2: produktionsprogrammMatrix[0][1], bedarf3: produktionsprogrammMatrix[0][2], bedarf4: produktionsprogrammMatrix[0][3], bestand1: item.quantity - produktionsprogrammMatrix[0][0], bestand2: item.quantity - produktionsprogrammMatrix[0][0] - produktionsprogrammMatrix[0][1], bestand3: item.quantity - produktionsprogrammMatrix[0][0]- produktionsprogrammMatrix[0][1] - produktionsprogrammMatrix[0][2], bestand4: item.quantity - produktionsprogrammMatrix[0][0] - produktionsprogrammMatrix[0][1] - produktionsprogrammMatrix[0][2] - produktionsprogrammMatrix[0][3]};
        tolleTabelle.push(zeileObj);
        break;
      case 22:
        zeileObj = {kaufteil: 'K22', frist: '2,1', verwendungp1: 0, verwendungp2: 1, verwendungp3: 0, disko: 300, anfangsbestand: item.quantity, bedarf1: produktionsprogrammMatrix[1][0], bedarf2: produktionsprogrammMatrix[1][1], bedarf3: produktionsprogrammMatrix[1][2], bedarf4: produktionsprogrammMatrix[1][3], bestand1: item.quantity - produktionsprogrammMatrix[1][0], bestand2: item.quantity - produktionsprogrammMatrix[1][0] - produktionsprogrammMatrix[1][1], bestand3: item.quantity - produktionsprogrammMatrix[1][0]- produktionsprogrammMatrix[1][1] - produktionsprogrammMatrix[1][2], bestand4: item.quantity - produktionsprogrammMatrix[1][0] - produktionsprogrammMatrix[1][1] - produktionsprogrammMatrix[1][2] - produktionsprogrammMatrix[1][3]};
        tolleTabelle.push(zeileObj);
        break;
      case 23:
        zeileObj = {kaufteil: 'K23', frist: '1,4', verwendungp1: 0, verwendungp2: 0, verwendungp3: 1, disko: 300, anfangsbestand: item.quantity, bedarf1: produktionsprogrammMatrix[2][0], bedarf2: produktionsprogrammMatrix[2][1], bedarf3: produktionsprogrammMatrix[2][2], bedarf4: produktionsprogrammMatrix[2][3], bestand1: item.quantity - produktionsprogrammMatrix[2][0], bestand2: item.quantity - produktionsprogrammMatrix[2][0] - produktionsprogrammMatrix[2][1], bestand3: item.quantity - produktionsprogrammMatrix[2][0]- produktionsprogrammMatrix[2][1] - produktionsprogrammMatrix[2][2], bestand4: item.quantity - produktionsprogrammMatrix[2][0] - produktionsprogrammMatrix[2][1] - produktionsprogrammMatrix[2][2] - produktionsprogrammMatrix[2][3]}; 
        tolleTabelle.push(zeileObj)
        break;
      case 24:
        verwendungp1 = 7;
        verwendungp2 = 7;
        verwendungp3 = 7;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K24', frist: '3,5', disko: 6100, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 25:
        verwendungp1 = 4;
        verwendungp2 = 4;
        verwendungp3 = 4;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K25', frist: '1,1', disko: 3600, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 27:
        verwendungp1 = 2;
        verwendungp2 = 2;
        verwendungp3 = 2;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K27', frist: '1,1', disko: 1800, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 28:
        verwendungp1 = 4;
        verwendungp2 = 5;
        verwendungp3 = 6;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K28', frist: '2,1', disko: 4500, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 32:
        verwendungp1 = 3;
        verwendungp2 = 3;
        verwendungp3 = 3;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K32', frist: '2,6', disko: 2700, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 33:
        verwendungp1 = 0;
        verwendungp2 = 0;
        verwendungp3 = 2;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K33', frist: '2,4', disko: 900, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 34:
        verwendungp1 = 0;
        verwendungp2 = 0;
        verwendungp3 = 72;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K34', frist: '1,9', disko: 22000, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 35:
        verwendungp1 = 4;
        verwendungp2 = 4;
        verwendungp3 = 4;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K35', frist: '2,6', disko: 3600, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 36:
        verwendungp1 = 1;
        verwendungp2 = 1;
        verwendungp3 = 1;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K36', frist: '1,3', disko: 900, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 37:
        verwendungp1 = 1;
        verwendungp2 = 1;
        verwendungp3 = 1;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K37', frist: '1,8', disko: 900, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 38:
        verwendungp1 = 1;
        verwendungp2 = 1;
        verwendungp3 = 1;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K38', frist: '2,1', disko: 300, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 39:
        verwendungp1 = 2;
        verwendungp2 = 2;
        verwendungp3 = 2;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K39', frist: '1,8', disko: 1800, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 40:
        verwendungp1 = 1;
        verwendungp2 = 1;
        verwendungp3 = 1;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K40', frist: '1,9', disko: 900, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 41:
        verwendungp1 = 1;
        verwendungp2 = 1;
        verwendungp3 = 1;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K41', frist: '1,1', disko: 900, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 42:
        verwendungp1 = 2;
        verwendungp2 = 2;
        verwendungp3 = 2;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K42', frist: '1,5', disko: 1800, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 43:
        verwendungp1 = 1;
        verwendungp2 = 1;
        verwendungp3 = 1;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K43', frist: '2,5', disko: 2700, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 44:
        verwendungp1 = 3;
        verwendungp2 = 3;
        verwendungp3 = 3;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K44', frist: '1,2', disko: 900, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 45:
        verwendungp1 = 1;
        verwendungp2 = 1;
        verwendungp3 = 1;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K45', frist: '2,1', disko: 900, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 46:
        verwendungp1 = 1;
        verwendungp2 = 1;
        verwendungp3 = 1;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K46', frist: '1,2', disko: 900, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 47:
        verwendungp1 = 1;
        verwendungp2 = 1;
        verwendungp3 = 1;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K47', frist: '1,2', disko: 900, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 48:
        verwendungp1 = 2;
        verwendungp2 = 2;
        verwendungp3 = 2;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K48', frist: '1,2', disko: 1800, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 52:
        verwendungp1 = 2;
        verwendungp2 = 0;
        verwendungp3 = 0;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K52', frist: '2,0', disko: 600, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 53:
        verwendungp1 = 72;
        verwendungp2 = 0;
        verwendungp3 = 0;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K53', frist: '1,8', disko: 22000, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 57:
        verwendungp1 = 0;
        verwendungp2 = 2;
        verwendungp3 = 0;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K57', frist: '2,0', disko: 600, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 58:
        verwendungp1 = 0;
        verwendungp2 = 72;
        verwendungp3 = 0;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K58', frist: '2,1', disko: 22000, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      case 59:
        verwendungp1 = 2;
        verwendungp2 = 2;
        verwendungp3 = 2;
        berechnungBedarf1 = produktionsprogrammMatrix[0][0] * verwendungp1 + produktionsprogrammMatrix[1][0] * verwendungp2 + produktionsprogrammMatrix[2][0] * verwendungp3;
        berechnungBedarf2 = produktionsprogrammMatrix[0][1] * verwendungp1 + produktionsprogrammMatrix[1][1] * verwendungp2 + produktionsprogrammMatrix[2][1] * verwendungp3;
        berechnungBedarf3 = produktionsprogrammMatrix[0][2] * verwendungp1 + produktionsprogrammMatrix[1][2] * verwendungp2 + produktionsprogrammMatrix[2][2] * verwendungp3;
        berechnungBedarf4 = produktionsprogrammMatrix[0][3] * verwendungp1 + produktionsprogrammMatrix[1][3] * verwendungp2 + produktionsprogrammMatrix[2][3] * verwendungp3;
        berechnungBestand1 = item.quantity - berechnungBedarf1;
        berechnungBestand2 = berechnungBestand1 - berechnungBedarf2;
        berechnungBestand3 = berechnungBestand2 - berechnungBedarf3;
        berechnungBestand4 = berechnungBestand3 - berechnungBedarf4;
        zeileObj =  {kaufteil: 'K59', frist: '0,9', disko: 1800, verwendungp1: verwendungp1, verwendungp2: verwendungp2, verwendungp3: verwendungp3, anfangsbestand: item.quantity, bedarf1: berechnungBedarf1, bedarf2: berechnungBedarf2, bedarf3: berechnungBedarf3, bedarf4: berechnungBedarf4, bestand1: berechnungBestand1, bestand2: berechnungBestand2, bestand3: berechnungBestand3, bestand4: berechnungBestand4}; 
        tolleTabelle.push(zeileObj)
        break;
      default:
        console.log("ERROR")
        console.log(item[0])
        break;
    }
    
  })

  setKaufteildisposition(tolleTabelle)

  }, [lagerbestandMatrix, produktionsprogrammMatrix]);


  const calculateNewTable1 = (warehousestockOhneKArray, geplantenLagerbestand, warteSnake, ordersinwork) => {
    const eigtlArray = [];
    let inWs = 0;
    let foundObj = 0;
    let ows = 0;
    let inBearb = 0;
    warehousestockOhneKArray.forEach((element, index) => {
        switch (index) {
            case 0:
              foundObj = warteSnake.find(obj => obj.article === '1');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '1');
              inBearb = ows ? parseInt(ows.amount) : 0;
              setGeplaP1(produktionsprogrammMatrix[0][0] - lieferprogrammMatrix[0][0] + element + inWs + inBearb)
              eigtlArray.push({article: 'P1', spalteE: element, spalteC: '', spalteH: produktionsprogrammMatrix[0][0], spalteB: lieferprogrammMatrix[0][0], spalteF: inWs, spalteG: inBearb});
              break;
            case 2:
              foundObj = warteSnake.find(item => item.article === '26');
              inWs = foundObj ? (parseInt(foundObj.amount)) / 3 : 0;
              ows = ordersinwork.find(obj => obj.article === '26');
              inBearb = ows ? (parseInt(ows.amount)) / 3 : 0;
              eigtlArray.push({article: 'E26', spalteE: element, spalteC: eigtlArray[0].spalteF, spalteH: (eigtlArray[0].spalteH + eigtlArray[0].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[0].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 3:
              foundObj = warteSnake.find(item => item.article === '51');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '51');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E51', spalteE: element, spalteC: eigtlArray[0].spalteF, spalteH: (eigtlArray[0].spalteH + eigtlArray[0].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[0].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 5:
              foundObj = warteSnake.find(item => item.article === '16');
              inWs = foundObj ? (parseInt(foundObj.amount)) / 3 : 0;
              ows = ordersinwork.find(obj => obj.article === '16');
              inBearb = ows ? (parseInt(ows.amount)) / 3 : 0;
              eigtlArray.push({article: 'E16', spalteE: element, spalteC: eigtlArray[3].spalteF, spalteH: (eigtlArray[3].spalteH + eigtlArray[3].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[3].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 6:
              foundObj = warteSnake.find(item => item.article === '17');
              inWs = foundObj ? (parseInt(foundObj.amount)) / 3 : 0;
              ows = ordersinwork.find(obj => obj.article === '17');
              inBearb = ows ? (parseInt(ows.amount)) / 3 : 0;
              eigtlArray.push({article: 'E17', spalteE: element, spalteC: eigtlArray[3].spalteF, spalteH: (eigtlArray[3].spalteH + eigtlArray[3].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[3].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 7:
              foundObj = warteSnake.find(item => item.article === '50');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '50');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E50', spalteE: element, spalteC: eigtlArray[3].spalteF, spalteH: (eigtlArray[3].spalteH + eigtlArray[3].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[3].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 9:
              foundObj = warteSnake.find(item => item.article === '4');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '4');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E4', spalteE: element, spalteC: eigtlArray[7].spalteF, spalteH: (eigtlArray[7].spalteH + eigtlArray[7].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[7].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 10:
              foundObj = warteSnake.find(item => item.article === '10');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '10');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E10', spalteE: element, spalteC: eigtlArray[7].spalteF, spalteH: (eigtlArray[7].spalteH + eigtlArray[7].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[7].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 11:
              foundObj = warteSnake.find(item => item.article === '49');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '49');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E49', spalteE: element, spalteC: eigtlArray[7].spalteF, spalteH: (eigtlArray[7].spalteH + eigtlArray[7].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[7].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 13:
              foundObj = warteSnake.find(item => item.article === '7');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '7');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E7', spalteE: element, spalteC: eigtlArray[11].spalteF, spalteH: (eigtlArray[11].spalteH + eigtlArray[11].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[11].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 14:
              foundObj = warteSnake.find(item => item.article === '13');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '13');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E13', spalteE: element, spalteC: eigtlArray[11].spalteF, spalteH: (eigtlArray[11].spalteH + eigtlArray[11].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[11].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 15:
              foundObj = warteSnake.find(item => item.article === '18');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '18');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E18', spalteE: element, spalteC: eigtlArray[11].spalteF, spalteH: (eigtlArray[11].spalteH + eigtlArray[11].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[11].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            default:
              eigtlArray.push({article: '', spalteC: '', spalteE: '', spalteH: '', spalteB: '', spalteF: '', spalteG: ''});
              break;
        }
    });
    setMaterialplanTabelle1(eigtlArray);
  }

  const calculateNewTable2 = (warehousestockOhneKArray, geplantenLagerbestand, warteSnake, ordersinwork) => {
    const eigtlArray = [];
    let inWs = 0;
    let foundObj = 0;
    let ows = 0;
    let inBearb = 0;
    warehousestockOhneKArray.forEach((element, index) => {
        switch (index) {
            case 0:
              foundObj = warteSnake.find(obj => obj.article === '2');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '2');
              inBearb = ows ? parseInt(ows.amount) : 0;
              setGeplaP2(produktionsprogrammMatrix[1][0] - lieferprogrammMatrix[1][0] + element + inWs + inBearb)
              eigtlArray.push({article: 'P2', spalteE: element, spalteC: '', spalteH: produktionsprogrammMatrix[1][0], spalteB: lieferprogrammMatrix[1][0], spalteF: inWs, spalteG: inBearb});
              break;
            case 2:
              foundObj = warteSnake.find(item => item.article === '26');
              inWs = foundObj ? (parseInt(foundObj.amount)) / 3 : 0;
              ows = ordersinwork.find(obj => obj.article === '26');
              inBearb = ows ? (parseInt(ows.amount)) / 3 : 0;
              eigtlArray.push({article: 'E26', spalteE: element, spalteC: eigtlArray[0].spalteF, spalteH: (eigtlArray[0].spalteH + eigtlArray[0].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[0].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 3:
              foundObj = warteSnake.find(item => item.article === '56');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '56');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E56', spalteE: element, spalteC: eigtlArray[0].spalteF, spalteH: (eigtlArray[0].spalteH + eigtlArray[0].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[0].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 5:
              foundObj = warteSnake.find(item => item.article === '16');
              inWs = foundObj ? (parseInt(foundObj.amount)) / 3 : 0;
              ows = ordersinwork.find(obj => obj.article === '16');
              inBearb = ows ? (parseInt(ows.amount)) / 3 : 0;
              eigtlArray.push({article: 'E16', spalteE: element, spalteC: eigtlArray[3].spalteF, spalteH: (eigtlArray[3].spalteH + eigtlArray[3].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[3].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 6:
              foundObj = warteSnake.find(item => item.article === '17');
              inWs = foundObj ? (parseInt(foundObj.amount)) / 3 : 0;
              ows = ordersinwork.find(obj => obj.article === '17');
              inBearb = ows ? (parseInt(ows.amount)) / 3 : 0;
              eigtlArray.push({article: 'E17', spalteE: element, spalteC: eigtlArray[3].spalteF, spalteH: (eigtlArray[3].spalteH + eigtlArray[3].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[3].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 7:
              foundObj = warteSnake.find(item => item.article === '55');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '55');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E55', spalteE: element, spalteC: eigtlArray[3].spalteF, spalteH: (eigtlArray[3].spalteH + eigtlArray[3].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[3].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 9:
              foundObj = warteSnake.find(item => item.article === '5');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '5');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E5', spalteE: element, spalteC: eigtlArray[7].spalteF, spalteH: (eigtlArray[7].spalteH + eigtlArray[7].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[7].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 10:
              foundObj = warteSnake.find(item => item.article === '11');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '11');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E11', spalteE: element, spalteC: eigtlArray[7].spalteF, spalteH: (eigtlArray[7].spalteH + eigtlArray[7].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[7].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 11:
              foundObj = warteSnake.find(item => item.article === '54');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '54');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E54', spalteE: element, spalteC: eigtlArray[7].spalteF, spalteH: (eigtlArray[7].spalteH + eigtlArray[7].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[7].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 13:
              foundObj = warteSnake.find(item => item.article === '8');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '8');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E8', spalteE: element, spalteC: eigtlArray[11].spalteF, spalteH: (eigtlArray[11].spalteH + eigtlArray[11].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[11].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 14:
              foundObj = warteSnake.find(item => item.article === '14');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '14');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E14', spalteE: element, spalteC: eigtlArray[11].spalteF, spalteH: (eigtlArray[11].spalteH + eigtlArray[11].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[11].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 15:
              foundObj = warteSnake.find(item => item.article === '19');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '19');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E19', spalteE: element, spalteC: eigtlArray[11].spalteF, spalteH: (eigtlArray[11].spalteH + eigtlArray[11].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[11].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            default:
              eigtlArray.push({article: '', spalteC: '', spalteE: '', spalteH: '', spalteB: '', spalteF: '', spalteG: ''});
              break;
        }
    });
    setMaterialplanTabelle2(eigtlArray);
  }
  
  const calculateNewTable3 = (warehousestockOhneKArray, geplantenLagerbestand, warteSnake, ordersinwork) => {
    const eigtlArray = [];
    let inWs = 0;
    let foundObj = 0;
    let ows = 0;
    let inBearb = 0;
    warehousestockOhneKArray.forEach((element, index) => {
        switch (index) {
            case 0:
              foundObj = warteSnake.find(obj => obj.article === '3');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '3');
              inBearb = ows ? parseInt(ows.amount) : 0;
              setGeplaP3(produktionsprogrammMatrix[2][0] - lieferprogrammMatrix[2][0] + element + inWs + inBearb)
              eigtlArray.push({article: 'P3', spalteE: element, spalteC: '', spalteH: produktionsprogrammMatrix[2][0], spalteB: lieferprogrammMatrix[2][0], spalteF: inWs, spalteG: inBearb});
              break;
            case 2:
              foundObj = warteSnake.find(item => item.article === '26');
              inWs = foundObj ? (parseInt(foundObj.amount)) / 3 : 0;
              ows = ordersinwork.find(obj => obj.article === '26');
              inBearb = ows ? (parseInt(ows.amount)) / 3 : 0;
              eigtlArray.push({article: 'E26', spalteE: element, spalteC: eigtlArray[0].spalteF, spalteH: (eigtlArray[0].spalteH + eigtlArray[0].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[0].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 3:
              foundObj = warteSnake.find(item => item.article === '31');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '31');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E31', spalteE: element, spalteC: eigtlArray[0].spalteF, spalteH: (eigtlArray[0].spalteH + eigtlArray[0].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[0].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 5:
              foundObj = warteSnake.find(item => item.article === '16');
              inWs = foundObj ? (parseInt(foundObj.amount)) / 3 : 0;
              ows = ordersinwork.find(obj => obj.article === '16');
              inBearb = ows ? (parseInt(ows.amount)) / 3 : 0;
              eigtlArray.push({article: 'E16', spalteE: element, spalteC: eigtlArray[3].spalteF, spalteH: (eigtlArray[3].spalteH + eigtlArray[3].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[3].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 6:
              foundObj = warteSnake.find(item => item.article === '17');
              inWs = foundObj ? (parseInt(foundObj.amount)) / 3 : 0;
              ows = ordersinwork.find(obj => obj.article === '17');
              inBearb = ows ? (parseInt(ows.amount)) / 3 : 0;
              eigtlArray.push({article: 'E17', spalteE: element, spalteC: eigtlArray[3].spalteF, spalteH: (eigtlArray[3].spalteH + eigtlArray[3].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[3].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 7:
              foundObj = warteSnake.find(item => item.article === '30');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '30');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E30', spalteE: element, spalteC: eigtlArray[3].spalteF, spalteH: (eigtlArray[3].spalteH + eigtlArray[3].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[3].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 9:
              foundObj = warteSnake.find(item => item.article === '6');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '6');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E6', spalteE: element, spalteC: eigtlArray[7].spalteF, spalteH: (eigtlArray[7].spalteH + eigtlArray[7].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[7].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 10:
              foundObj = warteSnake.find(item => item.article === '12');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '12');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E12', spalteE: element, spalteC: eigtlArray[7].spalteF, spalteH: (eigtlArray[7].spalteH + eigtlArray[7].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[7].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 11:
              foundObj = warteSnake.find(item => item.article === '29');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '29');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E29', spalteE: element, spalteC: eigtlArray[7].spalteF, spalteH: (eigtlArray[7].spalteH + eigtlArray[7].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[7].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 13:
              foundObj = warteSnake.find(item => item.article === '9');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '9');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E9', spalteE: element, spalteC: eigtlArray[11].spalteF, spalteH: (eigtlArray[11].spalteH + eigtlArray[11].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[11].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 14:
              foundObj = warteSnake.find(item => item.article === '15');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '15');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E15', spalteE: element, spalteC: eigtlArray[11].spalteF, spalteH: (eigtlArray[11].spalteH + eigtlArray[11].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[11].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            case 15:
              foundObj = warteSnake.find(item => item.article === '20');
              inWs = foundObj ? parseInt(foundObj.amount) : 0;
              ows = ordersinwork.find(obj => obj.article === '20');
              inBearb = ows ? parseInt(ows.amount) : 0;
              eigtlArray.push({article: 'E20', spalteE: element, spalteC: eigtlArray[11].spalteF, spalteH: (eigtlArray[11].spalteH + eigtlArray[11].spalteF + geplantenLagerbestand[index] - element - inWs - inBearb), spalteB: eigtlArray[11].spalteH, spalteF: inWs, spalteG: inBearb});
              break;
            default:
              eigtlArray.push({article: '', spalteC: '', spalteE: '', spalteH: '', spalteB: '', spalteF: '', spalteG: ''});
              break;
        }
    });
    setMaterialplanTabelle3(eigtlArray);
  }

  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [modalMessage, setModalMessage] = useState('');
    const fileInputRef = useRef(null);

    const handleFileUpload = () => {
      const uploadedFile = fileInputRef.current.files[0];

      if (!uploadedFile) {
        // No file selected
        return;
      }

      if (!uploadedFile.name.endsWith('.xml')) {
        setModalMessage(t('Bitte eine Datei im XML-Format hochladen!'));
        setShowModal(true);
        setUploadSuccess(false);
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target.result;

         // Parse the XML file using react-xml-parser
        const parser = new XMLParser();
        const xmlDoc = parser.parseFromString(fileContent);

        if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
          setModalMessage(t('Fileformat'));
          setShowModal(true);
        } else {
          if (validateXML(xmlDoc)) {

            // Periode setzen:
            const results  = xmlDoc.getElementsByTagName('results')[0];
            const periode = parseInt(results.attributes.period);
            setAktuellePeriode(periode);
             

            // Vertriebswunsch setzen:
            const sellwishElements  = xmlDoc.getElementsByTagName('forecast')[0];    
            const sellwishArray = [];
            const p1Array = [parseInt(sellwishElements.attributes.p1, 10), 0, 0, 0];
            const p2Array = [parseInt(sellwishElements.attributes.p2, 10), 0, 0, 0];
            const p3Array = [parseInt(sellwishElements.attributes.p3, 10), 0, 0, 0];
            sellwishArray.push(p1Array);
            sellwishArray.push(p2Array);
            sellwishArray.push(p3Array);
            setLieferprogrammMatrix(sellwishArray);

            // Warteschlange setzen:
            const waitinglistworkstations = xmlDoc.getElementsByTagName('waitinglistworkstations')[0]; 
            const waitinglistArray = [];
            waitinglistworkstations.children.forEach(workplace => {
              const arbeitsplatz = workplace.attributes.id;
              if (workplace.attributes.timeneed !== '0') {
                workplace.children.forEach(waitinglist => {
                  const article = waitinglist.attributes.item;
                  const amount = waitinglist.attributes.amount;
                  const timeneed = waitinglist.attributes.timeneed;
                  const auftragsNummer = waitinglist.attributes.order;
                  waitinglistArray.push({arbeitsplatz: arbeitsplatz, article: article, amount: amount, timeneed: timeneed, auftragsNummer: auftragsNummer})
                })
              }
              
            })

            const orderedWaitinglistArray = waitinglistArray.sort((a, b) => {
              const numA = parseInt(a.auftragsNummer);
              const numB = parseInt(b.auftragsNummer);
            
              if (numA < numB) {
                return -1;
              } else if (numA > numB) {
                return 1;
              } else {
                return 0;
              }
            });

            const wsMenge2 = []
            orderedWaitinglistArray.forEach(obj => {
              let obj1 = undefined;
              let obj2 = undefined;
              let obj3 = undefined;
              let obj4 = undefined;
              let obj5 = undefined;
              let foundItem = {};
              switch(obj.auftragsNummer) {
                case '1':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "1");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '10' && item.auftragsNummer === '1');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '11' && item.auftragsNummer === '1');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  }
                  break;
                case '2':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "2");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '10' && item.auftragsNummer === '2');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '11' && item.auftragsNummer === '2');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  }
                  break;
                case '3':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "3");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '10' && item.auftragsNummer === '3');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '11' && item.auftragsNummer === '3');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  }
                  break;
                case '4':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "4");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '10' && item.auftragsNummer === '4');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '11' && item.auftragsNummer === '4');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  }
                  break;
                case '5':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "5");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '10' && item.auftragsNummer === '5');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '11' && item.auftragsNummer === '5');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  }
                  break;
                case '6':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "6");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '10' && item.auftragsNummer === '6');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '11' && item.auftragsNummer === '6');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  }
                  break;
                case '7':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "7");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '13' && item.auftragsNummer === '7');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '12' && item.auftragsNummer === '7');
                  obj3 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '8' && item.auftragsNummer === '7');
                  obj4 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '7' && item.auftragsNummer === '7');
                  obj5 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '9' && item.auftragsNummer === '7');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  } else if (obj3) {
                    wsMenge2.push(obj3);
                  } else if (obj4) {
                    wsMenge2.push(obj4);
                  } else if (obj5) {
                    wsMenge2.push(obj5);
                  }
                  break;
                case '8':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "8");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '13' && item.auftragsNummer === '8');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '12' && item.auftragsNummer === '8');
                  obj3 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '8' && item.auftragsNummer === '8');
                  obj4 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '7' && item.auftragsNummer === '8');
                  obj5 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '9' && item.auftragsNummer === '8');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  } else if (obj3) {
                    wsMenge2.push(obj3);
                  } else if (obj4) {
                    wsMenge2.push(obj4);
                  } else if (obj5) {
                    wsMenge2.push(obj5);
                  }
                  break;
                case '9':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "9");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '13' && item.auftragsNummer === '9');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '12' && item.auftragsNummer === '9');
                  obj3 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '8' && item.auftragsNummer === '9');
                  obj4 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '7' && item.auftragsNummer === '9');
                  obj5 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '9' && item.auftragsNummer === '9');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  } else if (obj3) {
                    wsMenge2.push(obj3);
                  } else if (obj4) {
                    wsMenge2.push(obj4);
                  } else if (obj5) {
                    wsMenge2.push(obj5);
                  }
                  break;
                case '10':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "10");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '13' && item.auftragsNummer === '10');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '12' && item.auftragsNummer === '10');
                  obj3 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '8' && item.auftragsNummer === '10');
                  obj4 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '7' && item.auftragsNummer === '10');
                  obj5 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '9' && item.auftragsNummer === '10');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  } else if (obj3) {
                    wsMenge2.push(obj3);
                  } else if (obj4) {
                    wsMenge2.push(obj4);
                  } else if (obj5) {
                    wsMenge2.push(obj5);
                  }
                  break;
                case '11':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "11");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '13' && item.auftragsNummer === '11');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '12' && item.auftragsNummer === '11');
                  obj3 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '8' && item.auftragsNummer === '11');
                  obj4 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '7' && item.auftragsNummer === '11');
                  obj5 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '9' && item.auftragsNummer === '11');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  } else if (obj3) {
                    wsMenge2.push(obj3);
                  } else if (obj4) {
                    wsMenge2.push(obj4);
                  } else if (obj5) {
                    wsMenge2.push(obj5);
                  }
                  break;
                case '12':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "12");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '13' && item.auftragsNummer === '12');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '12' && item.auftragsNummer === '12');
                  obj3 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '8' && item.auftragsNummer === '12');
                  obj4 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '7' && item.auftragsNummer === '12');
                  obj5 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '9' && item.auftragsNummer === '12');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  } else if (obj3) {
                    wsMenge2.push(obj3);
                  } else if (obj4) {
                    wsMenge2.push(obj4);
                  } else if (obj5) {
                    wsMenge2.push(obj5);
                  }
                  break;
                case '13':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "13");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '6' && item.auftragsNummer === '13');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '14' && item.auftragsNummer === '13');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  } 
                  break;
                case '14':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "14");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '15' && item.auftragsNummer === '14');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '15':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "15");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '6' && item.auftragsNummer === '15');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '8' && item.auftragsNummer === '15');
                  obj3 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '7' && item.auftragsNummer === '15');
                  obj4 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '9' && item.auftragsNummer === '15');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  } else if (obj3) {
                    wsMenge2.push(obj3);
                  } else if (obj4) {
                    wsMenge2.push(obj4);
                  } 
                  break;
                case '16':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "16");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '6' && item.auftragsNummer === '16');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '8' && item.auftragsNummer === '16');
                  obj3 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '7' && item.auftragsNummer === '16');
                  obj4 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '9' && item.auftragsNummer === '16');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  } else if (obj3) {
                    wsMenge2.push(obj3);
                  } else if (obj4) {
                    wsMenge2.push(obj4);
                  } 
                  break;
                case '17':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "17");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '6' && item.auftragsNummer === '17');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '8' && item.auftragsNummer === '17');
                  obj3 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '7' && item.auftragsNummer === '17');
                  obj4 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '9' && item.auftragsNummer === '17');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  } else if (obj3) {
                    wsMenge2.push(obj3);
                  } else if (obj4) {
                    wsMenge2.push(obj4);
                  } 
                  break;
                case '18':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "18");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '7' && item.auftragsNummer === '18');
                  obj2 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '15' && item.auftragsNummer === '18');


                  if (obj1) {
                    wsMenge2.push(obj1);
                  } else if (obj2) {
                    wsMenge2.push(obj2);
                  }
                  break;
                case '19':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "19");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '1' && item.auftragsNummer === '19');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '20':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "20");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '1' && item.auftragsNummer === '20');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '21':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "21");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '1' && item.auftragsNummer === '21');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '22':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "22");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '2' && item.auftragsNummer === '22');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '23':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "23");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '2' && item.auftragsNummer === '23');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '24':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "24");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '2' && item.auftragsNummer === '24');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '25':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "25");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '3' && item.auftragsNummer === '25');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '26':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "26");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '3' && item.auftragsNummer === '26');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '27':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "27");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '3' && item.auftragsNummer === '27');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '28':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "28");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '4' && item.auftragsNummer === '28');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '29':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "29");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '4' && item.auftragsNummer === '29');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                case '30':
                  foundItem = wsMenge2.find((item) => item.auftragsNummer === "30");
                  if (foundItem) {
                    return;
                  }
                  obj1 = orderedWaitinglistArray.find(item => item.arbeitsplatz === '4' && item.auftragsNummer === '30');

                  if (obj1) {
                    wsMenge2.push(obj1);
                  }
                  break;
                default:
                  break;
              }
            })
        
            // case switch für auftragnummer und des nehmen

            const wsMenge = [];
            const ohneVerfalleneAuftraege = [];
            waitinglistArray.forEach(obj => {
              switch(obj.article) {
                case '26':
                  if (obj.arbeitsplatz === '7') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '16':
                  if (obj.arbeitsplatz === '6') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '4':
                  if (obj.arbeitsplatz === '10') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '10':
                  if (obj.arbeitsplatz === '13') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '13':
                  if (obj.arbeitsplatz === '13') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '18':
                  if (obj.arbeitsplatz === '6') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '7':
                  if (obj.arbeitsplatz === '10') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '5':
                  if (obj.arbeitsplatz === '10') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '11':
                  if (obj.arbeitsplatz === '13') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '14':
                  if (obj.arbeitsplatz === '13') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '19':
                  if (obj.arbeitsplatz === '6') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '8':
                  if (obj.arbeitsplatz === '10') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '6':
                  if (obj.arbeitsplatz === '10') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '12':
                  if (obj.arbeitsplatz === '13') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '15':
                  if (obj.arbeitsplatz === '13') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '20':
                  if (obj.arbeitsplatz === '6') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                case '9':
                  if (obj.arbeitsplatz === '10') {
                    return;
                  } else {
                    ohneVerfalleneAuftraege.push(obj)
                  }
                  break;
                default:
                  break;
              }
            })

            ohneVerfalleneAuftraege.forEach(obj => {
              const existingObj = wsMenge.find(item => item.article === obj.article);
              if (existingObj) {
                if (obj.auftragsNummer === existingObj.auftragsNummer && obj.arbeitsplatz !== existingObj.arbeitsplatz) {
                  return;
                }
                existingObj.amount = (parseInt(existingObj.amount) + parseInt(obj.amount)).toString();
                existingObj.timeneed = (parseInt(existingObj.timeneed) + parseInt(obj.timeneed)).toString();
              } else {
                wsMenge.push({article: obj.article, amount: obj.amount, timeneed: obj.timeneed, auftragsNummer: obj.auftragsNummer, arbeitsplatz: obj.arbeitsplatz});
              }
            });
            setWarteschlangeMenge(wsMenge2);
            setWarteschlange(waitinglistArray);

            const wsZeit = []
            for (const item of waitinglistArray) {
              const arbeitsplatz = item.arbeitsplatz;
              const timeneed = parseInt(item.timeneed);
            
              // Check if an entry for the arbeitsplatz already exists in the resultArray
              const existingItem = wsZeit.find(obj => obj.arbeitsplatz === arbeitsplatz);
              
              if (existingItem) {
                // If an entry exists, add the timeneed to the existing value
                existingItem.timeneed += timeneed;
              } else {
                // If no entry exists, create a new object and add it to the resultArray
                wsZeit.push({ arbeitsplatz, timeneed });
              }
            }

            // Aufträge in Bearbeitung:
            const ordersinwork = xmlDoc.getElementsByTagName('ordersinwork')[0]; 
            const ordersinworkArray = [];
            ordersinwork.children.forEach(workplace => {
              const arbeitsplatz = workplace.attributes.id;
              const article = workplace.attributes.item;
              const amount = workplace.attributes.amount;
              const timeneed = workplace.attributes.timeneed;
              const order = workplace.attributes.order;
              ordersinworkArray.push({arbeitsplatz: arbeitsplatz, article: article, amount: amount, timeneed: timeneed, auftragsNummer: order})
            })
            setInBearbeitung(ordersinworkArray);

            ordersinworkArray.forEach((ibObj) => {
              const existingObj = wsZeit.find((wsObj) => wsObj.arbeitsplatz === ibObj.arbeitsplatz);
              if (existingObj) {
                existingObj.timeneed += parseInt(ibObj.timeneed);
              } else {
                wsZeit.push({ arbeitsplatz: ibObj.arbeitsplatz, timeneed: parseInt(ibObj.timeneed) });
              }
            });
            setWarteschlangeZeit(wsZeit);

            const auftragsNummern = ordersinworkArray.map(obj => obj.auftragsNummer);

            const ruestzeitNoetig = waitinglistArray.filter(obj => !auftragsNummern.includes(obj.auftragsNummer));
            setNoetigeRuest(ruestzeitNoetig);


            // aktuelle Lagerbestand setzen:
            const warehousestock = xmlDoc.getElementsByTagName('warehousestock')[0];
            const warehousestockArray = [];
           
            warehousestock.children.forEach((item, index) => {
              if (index !== warehousestock.children.length - 1) {
                const article = parseInt(item.attributes.id, 10);
                const quantities = {article: article, quantity: parseInt(item.attributes.amount, 10)};
                warehousestockArray.push(quantities);
              }
            })
            setLagerbestandMatrix(warehousestockArray);

            const warehousestockP1MatArray = [];
            const p1 = warehousestockArray.find(item => item.article === 1).quantity
            const e26 = warehousestockArray.find(item => item.article === 26).quantity / 3
            const e51 = warehousestockArray.find(item => item.article === 51).quantity
            const e16 = warehousestockArray.find(item => item.article === 16).quantity / 3
            const e17 = warehousestockArray.find(item => item.article === 17).quantity / 3
            const e50 = warehousestockArray.find(item => item.article === 50).quantity
            const e4 = warehousestockArray.find(item => item.article === 4).quantity
            const e10 = warehousestockArray.find(item => item.article === 10).quantity
            const e49 = warehousestockArray.find(item => item.article === 49).quantity
            const e7 = warehousestockArray.find(item => item.article === 7).quantity
            const e13 = warehousestockArray.find(item => item.article === 13).quantity
            const e18 = warehousestockArray.find(item => item.article === 18).quantity
            warehousestockP1MatArray.push(p1, -1, e26, e51, -1, e16, e17, e50, -1, e4, e10, e49, -1, e7, e13, e18)
            setLagerbestandP1Mat(warehousestockP1MatArray);
            setGeplanteLaP1(warehousestockP1MatArray);
            calculateNewTable1(warehousestockP1MatArray, warehousestockP1MatArray, wsMenge2, ordersinworkArray);

            const warehousestockP2MatArray = [];
            const p2 = warehousestockArray.find(item => item.article === 2).quantity
            const e26zwei = warehousestockArray.find(item => item.article === 26).quantity / 3
            const e56 = warehousestockArray.find(item => item.article === 56).quantity
            const e16zwei = warehousestockArray.find(item => item.article === 16).quantity / 3
            const e17zwei = warehousestockArray.find(item => item.article === 17).quantity / 3
            const e55 = warehousestockArray.find(item => item.article === 55).quantity
            const e5 = warehousestockArray.find(item => item.article === 5).quantity
            const e11 = warehousestockArray.find(item => item.article === 11).quantity
            const e54 = warehousestockArray.find(item => item.article === 54).quantity
            const e8 = warehousestockArray.find(item => item.article === 8).quantity
            const e14 = warehousestockArray.find(item => item.article === 14).quantity
            const e19 = warehousestockArray.find(item => item.article === 19).quantity
            warehousestockP2MatArray.push(p2, -1, e26zwei, e56, -1, e16zwei, e17zwei, e55, -1, e5, e11, e54, -1, e8, e14, e19)
            setLagerbestandP2Mat(warehousestockP2MatArray);
            setGeplanteLaP2(warehousestockP2MatArray);
            calculateNewTable2(warehousestockP2MatArray, warehousestockP2MatArray, wsMenge2, ordersinworkArray);

            const warehousestockP3MatArray = [];
            const p3 = warehousestockArray.find(item => item.article === 3).quantity
            const e26drei = warehousestockArray.find(item => item.article === 26).quantity / 3
            const e31 = warehousestockArray.find(item => item.article === 31).quantity
            const e16drei = warehousestockArray.find(item => item.article === 16).quantity / 3
            const e17drei = warehousestockArray.find(item => item.article === 17).quantity / 3
            const e30 = warehousestockArray.find(item => item.article === 30).quantity
            const e6 = warehousestockArray.find(item => item.article === 6).quantity
            const e12 = warehousestockArray.find(item => item.article === 12).quantity
            const e29 = warehousestockArray.find(item => item.article === 29).quantity
            const e9 = warehousestockArray.find(item => item.article === 9).quantity
            const e15 = warehousestockArray.find(item => item.article === 15).quantity
            const e20 = warehousestockArray.find(item => item.article === 20).quantity
            warehousestockP3MatArray.push(p3, -1, e26drei, e31, -1, e16drei, e17drei, e30, -1, e6, e12, e29, -1, e9, e15, e20)
            setLagerbestandP3Mat(warehousestockP3MatArray);
            setGeplanteLaP3(warehousestockP3MatArray);
            calculateNewTable3(warehousestockP3MatArray, warehousestockP3MatArray, wsMenge2, ordersinworkArray);
      

            setUploadSuccess(true);
            setModalMessage(t('Hochladen erfolgreich!'));
            setShowModal(true);
          } else {
            setUploadSuccess(false);
            setModalMessage(t('Ungültige XML Datei!'));
            setShowModal(true);
          }
          
        }

      };
  
      reader.readAsText(uploadedFile);
    };

  
    const handleChangeTabelle1 = (index, value) => {
      const newValue = Math.max(parseInt(value, 10), 0);
      const updatedMatrix = [...geplanteLaP1];
      updatedMatrix[index] = newValue || 0;
      setGeplanteLaP1(updatedMatrix);
      calculateNewTable1(lagerbestandP1Mat, updatedMatrix, warteschlangeMenge, inBearbeitung)
    };

    const handleChangeTabelle2 = (index, value) => {
      const newValue = Math.max(parseInt(value, 10), 0);
      const updatedMatrix = [...geplanteLaP2];
      updatedMatrix[index] = newValue || 0;
      setGeplanteLaP2(updatedMatrix);
      calculateNewTable2(lagerbestandP2Mat, updatedMatrix, warteschlangeMenge, inBearbeitung)
    };

    const handleChangeTabelle3 = (index, value) => {
      const newValue = Math.max(parseInt(value, 10), 0);
      const updatedMatrix = [...geplanteLaP3];
      updatedMatrix[index] = newValue || 0;
      setGeplanteLaP3(updatedMatrix);
      calculateNewTable3(lagerbestandP3Mat, updatedMatrix, warteschlangeMenge, inBearbeitung)
    };

    const reihenfolgeChange = (splitValue, index) => {
      const newArray = reihenfolgePlannung.map((obj, i) => {
        if (i === index) {
          const splitObj1 = { ...obj, quantity: obj.quantity - splitValue, input: 0 };
          const splitObj2 = { ...obj, quantity: splitValue, input: 0 };
          return [splitObj1, splitObj2];
        }
        return obj;
      }).flat();
    
      setReihenfolgePlannung(newArray);
    };

    const handleSchichtenChange = (index, value) => {
      const updatedMatrix = [...schichten];
      const neuerWert = (value > 0 && value < 4) ? value : 1;
      if (parseInt(neuerWert) === 3) {
        ueberstunden[index] = 0;
      }
      updatedMatrix[index] =  parseInt(neuerWert) || 0;
      console.log(JSON.stringify(updatedMatrix))
      setSchichten(updatedMatrix)
    }

    const handleUeberstundenChange = (index, value) => {
      const updatedMatrix = [...ueberstunden];
      const neuerWert = (value >= 0 && value < 241) ? value : 0;

      if (schichten[index] === 3) {
        updatedMatrix[index] = 0;
      } else {
        updatedMatrix[index] = parseInt(neuerWert) || 0;
      }
      console.log(JSON.stringify(updatedMatrix))
      setUberstunden(updatedMatrix)
    }

    const reihenfolgeUndo = (article, index) => {
      const newArray = reihenfolgePlannung.filter((obj, i) => {
        if (i === index) {
          const mergedObj = { ...obj };
          const matchingObj = reihenfolgePlannung.find((o, j) => j !== index && o.article === article);
      
          if (matchingObj) {
            matchingObj.quantity += mergedObj.quantity;
            return false; // Exclude the object from the new array
          } else {
            return true;
          }          
        }
      
        return true; // Include the object in the new array
      });
      
      setReihenfolgePlannung(newArray);
    };

    const handleOrderChange = (index, direction) => {
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const updatedMatrix = [...reihenfolgePlannung];
      [updatedMatrix[index], updatedMatrix[newIndex]] = [updatedMatrix[newIndex], updatedMatrix[index]];
      setReihenfolgePlannung(updatedMatrix);
    }

    const changeRuestNeu = (index, value) => {
      const updatedMatrix = [...ruestNeu];
      updatedMatrix[index] = Math.max(parseInt(value, 10), 0) || 0;
      setRuestNeu(updatedMatrix);
    }

    const handleReihenfolgeInputChange = (value, index, maxQuantity) => {
      const inputNumber = parseInt(value);
      const newNumber = Math.min(Math.max(inputNumber, 0), maxQuantity-1);
  
      const updatedMatrix = [...reihenfolgePlannung];
      updatedMatrix[index].input = newNumber || 0;
      setReihenfolgePlannung(updatedMatrix);
    }

    const kaufteilEntscheidungenChange = (value, index) => {
      const inputNumber = Math.max(parseInt(value, 10), 0);
      const updatedMatrix = [...kaufteilEntscheidungen];
      updatedMatrix[index].bestellmenge = inputNumber;
      setKaufteilEntscheidungen(updatedMatrix);
    }

    const kaufteilArtChange = (value, index) => {
      const inputNumber = Math.max(parseInt(value, 10), 0);
      const updatedMatrix = [...kaufteilEntscheidungen];
      updatedMatrix[index].bestellart = inputNumber;
      setKaufteilEntscheidungen(updatedMatrix);
    }
      

    const validateXML = (parsedXML) => {
      const requiredElements = ['results', 'forecast', 'warehousestock', 'inwardstockmovement', 'waitinglistworkstations', 'ordersinwork'];
      
      for (const elementName of requiredElements) {
        const elements = parsedXML.getElementsByTagName(elementName);
        if (elements.length === 0) {
          return false;
        }
      }

      return true;
    };


    const setHeader = (currentPosition) => {
      switch(currentPosition) {
        case 1:
          setStep2Valid(false);
          setStep3Valid(false);
          setStep4Valid(false);
          setStep5Valid(false);
          setStep6Valid(false);
          setStep7Valid(false);
          break;
        case 2:
          setStep2Valid(true);
          setStep3Valid(false);
          setStep4Valid(false);
          setStep5Valid(false);
          setStep6Valid(false);
          setStep7Valid(false);
          break;
        case 3:
          setStep2Valid(true);
          setStep3Valid(true);
          setStep4Valid(false);
          setStep5Valid(false);
          setStep6Valid(false);
          setStep7Valid(false);
          break;
        case 4:
          setStep2Valid(true);
          setStep3Valid(true);
          setStep4Valid(true);
          setStep5Valid(false);
          setStep6Valid(false);
          setStep7Valid(false);
          break;
        case 5:
          setStep2Valid(true);
          setStep3Valid(true);
          setStep4Valid(true);
          setStep5Valid(true);
          setStep6Valid(false);
          setStep7Valid(false);
          break;
        case 6: 
          setStep2Valid(true);
          setStep3Valid(true);
          setStep4Valid(true);
          setStep5Valid(true);
          setStep6Valid(true);
          setStep7Valid(false);
          break;
        case 7:
          setStep2Valid(true);
          setStep3Valid(true);
          setStep4Valid(true);
          setStep5Valid(true);
          setStep6Valid(true);
          setStep7Valid(true);
          break;
        default:
          break;
      }
    }
    
    // XML DOWNLOAD
    const handleDownload = () => {
      // Create XML structure using xmlbuilder
      const xml = xmlbuilder.create('input');

      xml.ele('qualitycontrol', {type: "no", losequantity:0, delay:0});

      const sellwish = xml.ele('sellwish');
      lieferprogrammMatrix.forEach((item, index) => {
        sellwish.ele('item', { article: index+1, quantity: item[0]});
      })

      const selldirect = xml.ele('selldirect');
      zusatzauftragMatrix.forEach((item, index) => {
        selldirect.ele('item', { article: index+1, quantity: item[0], price: parseFloat(item[1]), penalty: parseFloat(item[2])});
      })

      const newKaufDing = kaufteilEntscheidungen.filter((obj) => obj.bestellmenge !== 0);
      const orderlist = xml.ele('orderlist');
      newKaufDing.forEach(item => {
        orderlist.ele('order', { article: item.article, quantity: item.bestellmenge, modus: item.bestellart});
      })

      const productionlist = xml.ele('productionlist'); 
      reihenfolgePlannung.forEach(item => {
        productionlist.ele('production', { article: item.article.substring(1), quantity: item.quantity });
      })

      const workingtimelist = xml.ele('workingtimelist'); 
      schichten.forEach((item, index) => {
        workingtimelist.ele('workingtime', { station: index + 1 > 4 ? index + 2 : index + 1, shift: item, overtime: ueberstunden[index] });
      })
  
      // Convert XML to string
      const xmlString = xml.end({ pretty: true });
  
      // Create a Blob from the XML string
      const blob = new Blob([xmlString], { type: 'text/xml' });
  
      // Generate a temporary download link
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'input.xml';
  
      // Trigger the download
      downloadLink.click();
    };

  return (
    <I18nextProvider i18n={i18n}>
   <BrowserRouter>
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand>&nbsp; IBSYS 2</Navbar.Brand>
      <Nav className="ml-auto">
            <Nav.Link disabled={true} as={NavLink} exact to="/" activeClassName="active" style={{ color: 'lightblue' }}>
              <strong  >{t('Datenimport')}</strong>
            </Nav.Link>

            <Nav.Link disabled={true} as={NavLink} exact to="/step2" activeClassName="active" style={{ color: step2Valid ? 'lightblue' : 'grey' }}>
              <strong  >{t('Liefer- & Produktionsprogramm')}</strong>
            </Nav.Link>

            <Nav.Link disabled={true} as={NavLink} exact to="/step3" activeClassName="active" style={{ color: step2Valid && step3Valid ? 'lightblue' : 'grey' }}>
              <strong  >{t('Materialplanung')}</strong>
            </Nav.Link>

            <Nav.Link disabled={true} as={NavLink} exact to="/step4" activeClassName="active" style={{ color: step2Valid && step3Valid && step4Valid ? 'lightblue' : 'grey' }}>
              <strong  >{t('Reihenfolgeplannung & Splitting')}</strong>
            </Nav.Link>

            <Nav.Link disabled={true} as={NavLink} exact to="/step5" activeClassName="active" style={{ color: step2Valid && step3Valid && step4Valid && step5Valid  ? 'lightblue' : 'grey' }}>
              <strong  >{t('Kaufteildisposition')}</strong>
            </Nav.Link>

            <Nav.Link disabled={true} as={NavLink} exact to="/step6" activeClassName="active" style={{ color: step2Valid && step3Valid && step4Valid && step5Valid && step6Valid  ? 'lightblue' : 'grey' }}>
              <strong  >{t('Kapazitätsplanung')}</strong>
            </Nav.Link>

            <Nav.Link disabled={true} as={NavLink} exact to="/step7" activeClassName="active" style={{ color: step2Valid && step3Valid && step4Valid && step5Valid  && step6Valid && step7Valid  ? 'lightblue' : 'grey' }}>
              <strong  >{t('Datenexport')}</strong>
            </Nav.Link>
      </Nav>

      <Nav className="ms-auto">
        <NavDropdown title={`${t('Sprache')}: ${t(selectedLanguage)}`} id="language-dropdown" className="dropdown-menu-dark">
          <NavDropdown.Item active={selectedLanguage === 'Deutsch'} onClick={() => handleLanguageChange('Deutsch')}>
          {t('Deutsch')} 
          </NavDropdown.Item>
          <NavDropdown.Item active={selectedLanguage === 'Englisch'} onClick={() => handleLanguageChange('Englisch')}>
          {t('Englisch')} 
          </NavDropdown.Item>
        </NavDropdown>
        &nbsp;&nbsp;  &nbsp;&nbsp;
      </Nav>
    </Navbar>

    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>XML Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleCloseModal}>
            {t('Schließen')}
          </button>
        </Modal.Footer>
      </Modal>

      <Routes>
        <Route path="/" element={<Upload handleFileUpload={handleFileUpload} fileInputRef={fileInputRef} uploadSuccess={uploadSuccess} setHeader={setHeader} />}></Route>
        <Route path="/step2" element={<MainPage 
        lieferprogrammMatrix={lieferprogrammMatrix} 
        lieferprogrammChange={lieferprogrammChange} 
        produktionsprogrammMatrix={produktionsprogrammMatrix} 
        produktionsprogrammChange={produktionsprogrammChange}
        zusatzauftragMatrix={zusatzauftragMatrix} 
        zusatzauftragChange={zusatzauftragChange}
        setHeader={setHeader}
        aktuellePeriode={aktuellePeriode}
        />}></Route>
        <Route path="/step3" element={<Materialplanung 
        geplaP1={geplaP1}
        geplaP2={geplaP2}
        geplaP3={geplaP3}
        materialplanTabelle1={materialplanTabelle1} 
        materialplanTabelle2={materialplanTabelle2} 
        materialplanTabelle3={materialplanTabelle3} 
        geplanteLaP1={geplanteLaP1} 
        geplanteLaP2={geplanteLaP2} 
        geplanteLaP3={geplanteLaP3} 
        handleChangeTabelle1={handleChangeTabelle1} 
        handleChangeTabelle2={handleChangeTabelle2} 
        handleChangeTabelle3={handleChangeTabelle3} 
        setHeader={setHeader}
        />}></Route>
        <Route path="/step4" element={<Reihenfolge
        reihenfolge={reihenfolgePlannung}
        reihenfolgeChange={reihenfolgeChange}
        reihenfolgeUndo={reihenfolgeUndo}
        handleReihenfolgeInputChange={handleReihenfolgeInputChange}
        handleOrderChange={handleOrderChange}
        setHeader={setHeader}
        />}></Route>
        <Route path="/step5" element={<Kaufteildisposition 
        kaufteildisposition={kaufteildisposition}
        kaufteilEntscheidungen={kaufteilEntscheidungen}
        kaufteilEntscheidungenChange={kaufteilEntscheidungenChange}
        kaufteilArtChange={kaufteilArtChange}
        setHeader={setHeader}
        aktuellePeriode={aktuellePeriode}
        ></Kaufteildisposition>}>
        </Route>
        <Route path="/step6" element={<KapPla
        kapPlaTabelle={kapPlaTabelle}
        kapBedarfNeu={kapBedarfNeu}
        ruestVorP={ruestVorP}
        warteschlangeZeit={warteschlangeZeit}
        schichten={schichten}
        handleSchichtenChange={handleSchichtenChange}
        ueberstunden={ueberstunden}
        handleUeberstundenChange={handleUeberstundenChange}
        setHeader={setHeader}
        ruestNeu={ruestNeu}
        changeRuestNeu={changeRuestNeu}
        ></KapPla>}>

        </Route>

        <Route path="/step7" element={<Ende handleDownload={handleDownload} setHeader={setHeader}></Ende>}></Route>
      </Routes>

    </BrowserRouter>
  </I18nextProvider>
  );
}

export default App;
