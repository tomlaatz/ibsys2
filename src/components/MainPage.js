import React from 'react';
import Lieferprogramm from './Lieferprogramm';
import Produktionsprogramm from './Produktionsprogramm';
import Zusatzauftrag from './Zusatzauftrag';
import { Button, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";


function MainPage({lieferprogrammMatrix, lieferprogrammChange, produktionsprogrammMatrix, produktionsprogrammChange, zusatzauftragMatrix, zusatzauftragChange, setHeader, aktuellePeriode}) {
  const { t } = useTranslation();

  return (
    <div>      
      <Lieferprogramm  lieferprogrammMatrix={lieferprogrammMatrix} lieferprogrammChange={lieferprogrammChange} aktuellePeriode={aktuellePeriode} />

      <Produktionsprogramm  produktionsprogrammMatrix={produktionsprogrammMatrix} produktionsprogrammChange={produktionsprogrammChange} aktuellePeriode={aktuellePeriode} />

      <Zusatzauftrag zusatzauftragMatrix={zusatzauftragMatrix} zusatzauftragChange={zusatzauftragChange}/>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ButtonGroup aria-label="Basic example">
            <Button as={Link} to="/" size="lg" onClick={() => setHeader(1)} variant="outline-secondary">« {t('Zurueck')}</Button>
            <Button as={Link} to="/step3" size="lg" onClick={() => setHeader(3)} variant="outline-secondary">{t('Weiter')} »</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default MainPage;