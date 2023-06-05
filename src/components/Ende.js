import React from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";


function Ende({handleDownload, setHeader}) {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="mb-4">{t('XML Datei herunterladen')}</h1>
      <div className="d-flex align-items-center">
          <Button variant="primary" size="lg" onClick={handleDownload}>
          <FontAwesomeIcon icon={faDownload} /> {t('XML herunterladen')}
          </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
         <ButtonGroup aria-label="Basic example">
               <Button as={Link} to="/step6" onClick={() => setHeader(6)} size="lg" variant="outline-secondary">« {t('Zurueck')}</Button>
           </ButtonGroup>
         </div>
    </div>
  );
}

export default Ende;