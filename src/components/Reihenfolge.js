import React from 'react';
import { Button, Table, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faScissors, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function Reihenfolge({reihenfolge, reihenfolgeChange, reihenfolgeUndo, handleReihenfolgeInputChange, handleOrderChange, setHeader}) {
      const handleChange = (input, index) => {
        if (input > 0) {
            reihenfolgeChange(input, index);
        }
      };

      const handleUndo = (index, article) => {
        reihenfolgeUndo(article, index);
      };

      const moveRow = (index, direction) => {
        handleOrderChange(index, direction)
      };


  

  let tabellenLaenge = parseInt(reihenfolge.length / 3) + 1;

  const { t } = useTranslation();
  
  return (
    <div>
      <div className="row">
        <div className="col-sm-4">
        <Table bordered>
            <thead>
            <tr>
                <th>{t('Artikel')}</th>
                <th>{t('Menge')}</th>
                <th>{t('Aktion')}</th>
            </tr>
            </thead>
            <tbody>
            {reihenfolge.slice(0, tabellenLaenge).map((item, index) => {
                return(
                    <tr key={index}>
                    <td>{item.article}</td>
                    <td>{item.quantity}</td>
                    <td>
                        <div className="d-flex align-items-center">
                       
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Bitte geben Sie aufgrund der Losgröße eine Menge ein, die durch 10 teilbar ist.</Tooltip>}>
                            <input
                            type="number"
                            className="form-control"
                            onChange={(event) => handleReihenfolgeInputChange(event.target.value, index, item.quantity)}
                            value={item.input}
                            min={0}
                        />
                        </OverlayTrigger>


                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Splitting</Tooltip>}>
                        <Button onClick={() => handleChange(item.input, index)}><FontAwesomeIcon icon={faScissors} /></Button>
                        </OverlayTrigger>

                        
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Splitting zurücksetzen.</Tooltip>}>
                        <Button variant="danger" onClick={() => handleUndo(index, item.article)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </OverlayTrigger>
                        </div>
                   
                    </td>
                    <td>
                        <div>
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Nach oben verschieben.</Tooltip>}>
                        <Button
                            variant="outline-success"
                            disabled={index === 0} // Disable if it's the first row
                            onClick={() => moveRow(index, 'up')}
                        >
                            <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                        </OverlayTrigger>
                       
                        &nbsp;
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Nach unten verschieben.</Tooltip>}>
                        <Button
                            variant="outline-success"
                            disabled={index === reihenfolge.length - 1} // Disable if it's the last row
                            onClick={() => moveRow(index, 'down')}
                        >
                            <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                        </OverlayTrigger>
                        
                        </div>
                    </td>
                </tr>
                )
            })}
            </tbody>
        </Table>
        </div>
        <div className="col-sm-4">
        <Table bordered>
            <thead>
            <tr>
                <th>{t('Artikel')}</th>
                <th>{t('Menge')}</th>
                <th>{t('Aktion')}</th>
            </tr>
            </thead>
            <tbody>
            {reihenfolge.slice(tabellenLaenge, tabellenLaenge+tabellenLaenge).map((item, index) => {
                return(
                    <tr key={index + tabellenLaenge}>
                    <td>{item.article}</td>
                    <td>{item.quantity}</td>
                    <td>
                        <div className="d-flex align-items-center">

                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Bitte geben Sie aufgrund der Losgröße eine Menge ein, die durch 10 teilbar ist.</Tooltip>}>
                        <input
                        type="number"
                        className="form-control"
                        onChange={(event) => handleReihenfolgeInputChange(event.target.value, index + tabellenLaenge, item.quantity)}
                        value={item.input}
                        min={0}
                        />
                        </OverlayTrigger>


                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Splitting</Tooltip>}>
                        <Button onClick={() => handleChange(item.input, index + tabellenLaenge)}><FontAwesomeIcon icon={faScissors} /></Button>
                        </OverlayTrigger>

                        
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Splitting zurücksetzen.</Tooltip>}>
                        <Button variant="danger" onClick={() => handleUndo(index + tabellenLaenge, item.article)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </OverlayTrigger>
                       
              
          
                        </div>
                   
                    </td>
                    <td>
                        <div>
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Nach oben verschieben.</Tooltip>}>
                        <Button
                            variant="outline-success"
                            disabled={index + tabellenLaenge === 0} // Disable if it's the first row
                            onClick={() => moveRow(index + tabellenLaenge, 'up')}
                        >
                            <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                        </OverlayTrigger>
                       
                        &nbsp;
                        <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">Nach unten verschieben.</Tooltip>}>
                        <Button
                            variant="outline-success"
                            disabled={index + tabellenLaenge === reihenfolge.length - 1} // Disable if it's the last row
                            onClick={() => moveRow(index + tabellenLaenge, 'down')}
                        >
                            <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                        </OverlayTrigger>
                    
                        </div>
                    </td>
                </tr>
                )
            })}
            </tbody>
        </Table>
        </div>
        <div className="col-sm-4">
        <Table bordered>
            <thead>
            <tr>
                <th>{t('Artikel')}</th>
                <th>{t('Menge')}</th>
                <th>{t('Aktion')}</th>
            </tr>
            </thead>
            <tbody>
            {reihenfolge.slice(tabellenLaenge+tabellenLaenge, tabellenLaenge+tabellenLaenge+tabellenLaenge).map((item, index) => {
                return(
                    <tr key={index + tabellenLaenge + tabellenLaenge}>
                    <td>{item.article}</td>
                    <td>{item.quantity}</td>
                    <td>
                        <div className="d-flex align-items-center">


                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip-disabled">Bitte geben Sie aufgrund der Losgröße eine Menge ein, die durch 10 teilbar ist.</Tooltip>}>
                        <input
                        type="number"
                        className="form-control"
                        onChange={(event) => handleReihenfolgeInputChange(event.target.value, index + tabellenLaenge + tabellenLaenge, item.quantity)}
                        value={item.input}
                        min={0}
                    /> 
                        </OverlayTrigger>

                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip-disabled">Splitting</Tooltip>}>
                              
                    <Button onClick={() => handleChange(item.input, index + tabellenLaenge + tabellenLaenge)}><FontAwesomeIcon icon={faScissors} /></Button>
                        </OverlayTrigger>

                        
                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip-disabled">Splitting zurücksetzen.</Tooltip>}>
                        <Button variant="danger" onClick={() => handleUndo(index + tabellenLaenge + tabellenLaenge, item.article)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </OverlayTrigger>

                        </div>
                  
                    </td>
                    <td>
                        <div>
                      
                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip-disabled">Nach oben verschieben.</Tooltip>}>
                        <Button
                            variant="outline-success"
                            disabled={index + tabellenLaenge + tabellenLaenge === 0} // Disable if it's the first row
                            onClick={() => moveRow(index + tabellenLaenge + tabellenLaenge, 'up')}
                        >
                            <FontAwesomeIcon icon={faArrowUp} />
                        </Button>
                        </OverlayTrigger>
                        &nbsp;
                        <OverlayTrigger placement="left" overlay={<Tooltip id="tooltip-disabled">Nach unten verschieben.</Tooltip>}>
                        <Button
                            variant="outline-success"
                            disabled={index + tabellenLaenge + tabellenLaenge === reihenfolge.length - 1} // Disable if it's the last row
                            onClick={() => moveRow(index + tabellenLaenge + tabellenLaenge, 'down')}
                        >
                            <FontAwesomeIcon icon={faArrowDown} />
                        </Button>
                        </OverlayTrigger>
                       
                        </div>
                    </td>
                </tr>
                )
            })}
            </tbody>
        </Table>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ButtonGroup aria-label="Basic example">
            <Button as={Link} to="/step3" onClick={() => setHeader(3)} size="lg" variant="outline-secondary">« {t('Zurueck')}</Button>
            <Button as={Link} to="/step5" onClick={() => setHeader(5)} size="lg" variant="outline-secondary">{t('Weiter')} »</Button>
        </ButtonGroup>
      </div>
      
    </div>
  );
}

export default Reihenfolge