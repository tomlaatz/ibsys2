import React from 'react';
import { Table, OverlayTrigger, Tooltip, Form, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Kaufteildisposition({kaufteildisposition, kaufteilEntscheidungen, kaufteilEntscheidungenChange, kaufteilArtChange, setHeader, aktuellePeriode}) {  
    const { t } = useTranslation();
  
    return (
      <div>
        <Table bordered striped>
          <thead>
            <tr>
              <th>{t('Kaufteil')}</th>
              <th>{t('Lieferfrist + Abweichung')}</th>
              <th>{t('Verwendung P1')}</th>
              <th>{t('Verwendung P2')}</th>
              <th>{t('Verwendung P3')}</th>
              <th>{t('Diskontmenge')}</th>
              <th>   <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">{t('Hierbei handelt es sich um den Endbestand der Vorperiode')}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger>  <br></br>{t('Anfangsbestand in Periode')} {aktuellePeriode+1}
            
           
              </th>

              <th>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">{t('Der Bedarf berechnet der verschiedenen Perioden berechnet sich aus einer Matrixmultiplikation des Produktionsprogamms und der Verwendung in den Endergebnissen')}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger>
                <br></br>
                {t('Bruttobedarf Periode')} {aktuellePeriode+1}</th>
             
             
              <th>{t('Bruttobedarf Periode')} {aktuellePeriode+2}</th>
              <th>{t('Bruttobedarf Periode')} {aktuellePeriode+3}</th>
              <th>{t('Bruttobedarf Periode')} {aktuellePeriode+4}</th>
              <th> <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled">{t('Der Bestand berechnet sich durch den Anfangsbestand subtrahiert mit dem Bedarf der entsprechenden Perioden')}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger>  <br></br>{t('Bestand nach Periode')} {aktuellePeriode+1}</th>
              <th>{t('Bestand nach Periode')} {aktuellePeriode+2}</th>
              <th>{t('Bestand nach Periode')} {aktuellePeriode+3}</th>
              <th>{t('Bestand nach Periode')} {aktuellePeriode+4}</th>
              <th>{t('Bestellmenge')}</th>
              <th>{t('Bestellart')}</th>
            </tr>
          </thead>
          <tbody>
          {kaufteildisposition.map((item, index) => {
                return(
                    <tr key={index}>
                    <td>{item.kaufteil}</td>
                    <td>{item.frist}</td>
                    <td>{item.verwendungp1}</td>
                    <td>{item.verwendungp2}</td>
                    <td>{item.verwendungp3}</td>
                    <td>{item.disko}</td>
                    <td>{item.anfangsbestand}</td>
                    <td>{item.bedarf1}</td>
                    <td>{item.bedarf2}</td>
                    <td>{item.bedarf3}</td>
                    <td>{item.bedarf4}</td>
                    {item.bestand1 <= 0 ? (<><td style={{ backgroundColor: 'red', color: 'white' }}>0</td></>) : (<><td>{item.bestand1}</td></>)}
                    {item.bestand2 <= 0 ? (<><td style={{ backgroundColor: 'red', color: 'white' }}>0</td></>) : (<><td>{item.bestand2}</td></>)}
                    {item.bestand3 <= 0 ? (<><td style={{ backgroundColor: 'red', color: 'white' }}>0</td></>) : (<><td>{item.bestand3}</td></>)}
                    {item.bestand4 <= 0 ? (<><td style={{ backgroundColor: 'red', color: 'white' }}>0</td></>) : (<><td>{item.bestand4}</td></>)}
                    <td>
                    <input
                        type="number"
                        className="form-control"
                        onChange={(event) => kaufteilEntscheidungenChange(event.target.value, index)}
                        value={kaufteilEntscheidungen[index].bestellmenge}
                        min={0}
                    />
                    </td>
                    <td style={{ minWidth: '150px' }}>
                    <Form.Control
                      as="select"
                      value={kaufteilEntscheidungen[index].bestellart}
                      onChange={(e) => kaufteilArtChange(e.target.value, index)}
                    >
                      <option value="5">Normal (5)</option>
                      <option value="4">{t('Eil (4)')}</option>
                     </Form.Control>
                      
                    </td>
                </tr>
                )
            })}
          </tbody>
        </Table>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ButtonGroup aria-label="Basic example">
              <Button as={Link} to="/step4" onClick={() => setHeader(4)} size="lg" variant="outline-secondary">« {t('Zurueck')}</Button>
              <Button as={Link} to="/step6" onClick={() => setHeader(6)} size="lg" variant="outline-secondary">{t('Weiter')} »</Button>
          </ButtonGroup>
      </div>
      </div>
    );
  }
  
  export default Kaufteildisposition