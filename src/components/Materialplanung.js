import React from 'react';
import { Table, OverlayTrigger, Tooltip, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Materialplanung({geplaP1, geplaP2, geplaP3, materialplanTabelle1, materialplanTabelle2, materialplanTabelle3, geplanteLaP1, geplanteLaP2, geplanteLaP3, handleChangeTabelle1, handleChangeTabelle2, handleChangeTabelle3, setHeader}) {

  const { t } = useTranslation();

  const showButton = materialplanTabelle1.every(obj => obj.spalteH >= 0) && materialplanTabelle2.every(obj => obj.spalteH >= 0) && materialplanTabelle3.every(obj => obj.spalteH >= 0);
 
  const tooltip = (
    <Tooltip id="tooltip">Please enter non-negative numbers</Tooltip>
  );

  return (
    <div>
      <Table bordered>
        <thead>
          <tr>
            <th>{t('Artikel')}</th>
            <th>{t('Verbindliche Aufträge/Vertriebswunsch')}</th>
            <th>{t('Warteschlange des Nachfolgers')}</th>
            <th>{t('Geplanter Lagerbestand am Ende der Planperiode')}</th>
            <th>{t('Lagerbestand am Ende der Vorperiode')}</th>
            <th>{t('Aufträge in der Warteschlange')}</th>
            <th>{t('Aufträge in Bearbeitung')}</th>
            <th>{t('Produktions-Aufträge für die kommende Periode')}</th>
          </tr>
        </thead>
        <tbody>
        {materialplanTabelle1.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.article}</td>
              <td>{item.spalteB}</td>
              <td>{item.spalteC}</td>
              {item.article === '' ? (<><td></td></>) : (item.article === 'P1' ? (<><td>{geplaP1}</td></>) : (
              <>
              <td>
              <input type="number" className="form-control" value={geplanteLaP1[index]} onChange={(e) =>
                      handleChangeTabelle1(index, e.target.value)
                    }>
                </input>
              </td>
                
               </>)
                )}
              <td>{item.spalteE}</td>
              <td>{item.spalteF}</td>
              <td>{item.spalteG}</td>
              {item.spalteB !== '' ? (item.spalteH < 0 ? (<><td style={{ backgroundColor: 'red', color: 'white' }}>
                {item.spalteH} &nbsp;
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.spalteB} + {item.spalteC === '' ? 0 : item.spalteC} + {item.article === 'P1' ? geplaP1 : geplanteLaP1[index]} - {item.spalteE} - {item.spalteF} - {item.spalteG} = {item.spalteH}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger>
                </td></>): (<><td>
                  {item.spalteH} &nbsp;
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.spalteB} + {item.spalteC === '' ? 0 : item.spalteC} + {item.article === 'P1' ? geplaP1 : geplanteLaP1[index]} - {item.spalteE} - {item.spalteF} - {item.spalteG} = {item.spalteH}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger>
                  </td></>)) : (<><td></td></>)}
            </tr>
          );
        })}
        </tbody>
      </Table>
      &nbsp; 
      <Table bordered>
        <thead>
          <tr>
            <th>{t('Artikel')}</th>
            <th>{t('Verbindliche Aufträge/Vertriebswunsch')}</th>
            <th>{t('Warteschlange des Nachfolgers')}</th>
            <th>{t('Geplanter Lagerbestand am Ende der Planperiode')}</th>
            <th>{t('Lagerbestand am Ende der Vorperiode')}</th>
            <th>{t('Aufträge in der Warteschlange')}</th>
            <th>{t('Aufträge in Bearbeitung')}</th>
            <th>{t('Produktions-Aufträge für die kommende Periode')}</th>
          </tr>
        </thead>
        <tbody>
        {materialplanTabelle2.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.article}</td>
              <td>{item.spalteB}</td>
              <td>{item.spalteC}</td>
              {item.article === '' ? (<><td></td></>) : (item.article === 'P2' ? (<><td>{geplaP2}</td></>) : (
              <>
              <td><input type="number" className="form-control" value={geplanteLaP2[index]} onChange={(e) =>
                      handleChangeTabelle2(index, e.target.value)
                    }>
                </input></td>
                
               </>)
                )}
              <td>{item.spalteE}</td>
              <td>{item.spalteF}</td>
              <td>{item.spalteG}</td>
              {item.spalteB !== '' ? (item.spalteH < 0 ? (<><td style={{ backgroundColor: 'red', color: 'white' }}>
                {item.spalteH} &nbsp;
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.spalteB} + {item.spalteC === '' ? 0 : item.spalteC} + {item.article === 'P2' ? geplaP2 : geplanteLaP2[index]} - {item.spalteE} - {item.spalteF} - {item.spalteG} = {item.spalteH}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger>
                </td></>): (<><td>
                  {item.spalteH} &nbsp;
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.spalteB} + {item.spalteC === '' ? 0 : item.spalteC} + {item.article === 'P2' ? geplaP2 : geplanteLaP2[index]} - {item.spalteE} - {item.spalteF} - {item.spalteG} = {item.spalteH}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger>
                  </td></>)) : (<><td></td></>)}
            
            </tr>
          );
        })}
        </tbody>
      </Table>
      &nbsp; 
      <Table bordered>
        <thead>
          <tr>
            <th>{t('Artikel')}</th>
            <th>{t('Verbindliche Aufträge/Vertriebswunsch')}</th>
            <th>{t('Warteschlange des Nachfolgers')}</th>
            <th>{t('Geplanter Lagerbestand am Ende der Planperiode')}</th>
            <th>{t('Lagerbestand am Ende der Vorperiode')}</th>
            <th>{t('Aufträge in der Warteschlange')}</th>
            <th>{t('Aufträge in Bearbeitung')}</th>
            <th>{t('Produktions-Aufträge für die kommende Periode')}</th>
          </tr>
        </thead>
        <tbody>
        {materialplanTabelle3.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.article}</td>
              <td>{item.spalteB}</td>
              <td>{item.spalteC}</td>
              {item.article === '' ? (<><td></td></>) : (item.article === 'P3' ? (<><td>{geplaP3}</td></>) : (
              <>
              <td>
              <input type="number" className="form-control" value={geplanteLaP3[index]} onChange={(e) =>
                      handleChangeTabelle3(index, e.target.value)
                    }>
                </input>
              </td>
               
               </>)
                )}
              <td>{item.spalteE}</td>
              <td>{item.spalteF}</td>
              <td>{item.spalteG}</td>
              {item.spalteB !== '' ? (item.spalteH < 0 ? (<><td style={{ backgroundColor: 'red', color: 'white' }}>
                {item.spalteH} &nbsp;
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.spalteB} + {item.spalteC === '' ? 0 : item.spalteC} + {item.article === 'P3' ? geplaP3 : geplanteLaP3[index]} - {item.spalteE} - {item.spalteF} - {item.spalteG} = {item.spalteH}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger>
                </td></>): (<><td>
                  {item.spalteH} &nbsp;
                  <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{item.spalteB} + {item.spalteC === '' ? 0 : item.spalteC} + {item.article === 'P3' ? geplaP3 : geplanteLaP3[index]} - {item.spalteE} - {item.spalteF} - {item.spalteG} = {item.spalteH}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger>
                  </td></>)) : (<><td></td></>)}
            </tr>
          );
        })}
        </tbody>
      </Table>
      {!showButton && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><span style={{ color: 'red', fontWeight: 'bold' }}> Keine negativen Werte für Produktionsaufträge erlaubt!</span></div>}

      {showButton ? (<>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ButtonGroup aria-label="Basic example">
            <Button as={Link} to="/step2" onClick={() => setHeader(2)}  size="lg" variant="outline-secondary">« {t('Zurueck')}</Button>
            <Button as={Link} to="/step4" onClick={() => setHeader(4)} size="lg" variant="outline-secondary">{t('Weiter')} »</Button>
        </ButtonGroup>
      </div>
      </>) : (<>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ButtonGroup aria-label="Basic example">
            <Button as={Link} to="/step2" size="lg" onClick={() => setHeader(2)}  variant="outline-secondary">« {t('Zurueck')}</Button>
            <OverlayTrigger
              placement="right"
              overlay={tooltip}
            >
              <Button size="lg" variant="outline-secondary" disabled>{t('Weiter')} »</Button>
            </OverlayTrigger>
        </ButtonGroup>
      </div>
      </>)}
    </div>
  );
}

export default Materialplanung