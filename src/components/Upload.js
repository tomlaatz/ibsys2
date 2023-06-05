import React from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";


function Upload({handleFileUpload, fileInputRef, uploadSuccess, setHeader}) {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="mb-4">{t('XML Datei hochladen')}</h1>
      <div className="d-flex align-items-center">
      <label htmlFor="upload" style={{ margin: 'auto 10px' }}>
          <Button variant="primary" size="lg" as="span">
          <FontAwesomeIcon icon={faUpload} /> {t('XML hochladen')}
          </Button>
        </label>
        <input type="file" accept=".xml" onChange={handleFileUpload} style={{ display: 'none' }} ref={fileInputRef} id="upload" />
      </div>
      {uploadSuccess && (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
         <ButtonGroup aria-label="Basic example">
               <Button as={Link} to="/step2" size="lg" onClick={() => setHeader(2)} variant="outline-secondary">{t('Weiter')}  »</Button>
           </ButtonGroup>
         </div>
      )}
    </div>
  );
}

export default Upload;