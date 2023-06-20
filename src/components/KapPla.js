import React from 'react';
import { Table, OverlayTrigger, Tooltip, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function KapPla({kapPlaTabelle, kapBedarfNeu, ruestVorP, warteschlangeZeit, schichten, handleSchichtenChange, ueberstunden, handleUeberstundenChange, setHeader, ruestNeu, changeRuestNeu}) {  
    const { t } = useTranslation();
    const centeredCellStyle = {
        textAlign: 'center',
        verticalAlign: 'middle',
      };
  
    return (
      <div>
        <Table bordered>
            <thead>
                <tr>
                <th colSpan={4}></th>
                <th colSpan={30} style={{ textAlign: 'center' }}>{t('Arbeitsplatz')}</th>
                </tr>
                <tr>
                <th>{t('Bezeichnung')}</th>
                <th>{t('Radtyp')}</th>
                <th>{t('Sachnummer')}</th>
                <th>{t('Auftragsmenge')}</th>
                <th colSpan={2}>1</th>
                <th colSpan={2}>2</th>
                <th colSpan={2}>3</th>
                <th colSpan={2}>4</th>
                <th colSpan={2}>5</th>
                <th colSpan={2}>6</th>
                <th colSpan={2}>7</th>
                <th colSpan={2}>8</th>
                <th colSpan={2}>9</th>
                <th colSpan={2}>10</th>
                <th colSpan={2}>11</th>
                <th colSpan={2}>12</th>
                <th colSpan={2}>13</th>
                <th colSpan={2}>14</th>
                <th colSpan={2}>15</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td style={centeredCellStyle} rowSpan={3}>{t('Hinterrad')}</td>
                <td>K</td>
                <td>E4</td>
                <td>{kapPlaTabelle[0].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>4</td>
                <td>{kapPlaTabelle[0].ab10}</td>
                <td>3</td>
                <td>{kapPlaTabelle[0].ab11}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                <tr>
                <td>D</td>
                <td>E5</td>
                <td>{kapPlaTabelle[1].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>4</td>
                <td>{kapPlaTabelle[1].ab10}</td>
                <td>3</td>
                <td>{kapPlaTabelle[1].ab11}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                <tr>
                <td>H</td>
                <td>E6</td>
                <td>{kapPlaTabelle[2].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>4</td>
                <td>{kapPlaTabelle[2].ab10}</td>
                <td>3</td>
                <td>{kapPlaTabelle[2].ab11}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr> 
                <tr>
                <td style={centeredCellStyle} rowSpan={3}>{t('Vorderrad')}</td>
                <td>K</td>
                <td>E7</td>
                <td>{kapPlaTabelle[3].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>4</td>
                <td>{kapPlaTabelle[3].ab10}</td>
                <td>3</td>
                <td>{kapPlaTabelle[3].ab11}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>  
                <tr>
                <td>D</td>
                <td>E8</td>
                <td>{kapPlaTabelle[4].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>4</td>
                <td>{kapPlaTabelle[4].ab10}</td>
                <td>3</td>
                <td>{kapPlaTabelle[4].ab11}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>      
                <tr>
                <td>H</td>
                <td>E9</td>
                <td>{kapPlaTabelle[5].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>4</td>
                <td>{kapPlaTabelle[5].ab10}</td>
                <td>3</td>
                <td>{kapPlaTabelle[5].ab11}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr> 
                <tr>
                <td style={centeredCellStyle} rowSpan={3}>{t('Schutzblech hinten')}</td>
                <td>K</td>
                <td>E10</td>
                <td>{kapPlaTabelle[6].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>2</td>
                <td>{kapPlaTabelle[6].ab7}</td>
                <td>1</td>
                <td>{kapPlaTabelle[6].ab8}</td>
                <td>3</td>
                <td>{kapPlaTabelle[6].ab9}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[6].ab12}</td>
                <td>2</td>
                <td>{kapPlaTabelle[6].ab13}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr> 
                <tr>
                <td>D</td>
                <td>E11</td>
                <td>{kapPlaTabelle[7].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>2</td>
                <td>{kapPlaTabelle[7].ab7}</td>
                <td>2</td>
                <td>{kapPlaTabelle[7].ab8}</td>
                <td>3</td>
                <td>{kapPlaTabelle[7].ab9}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[7].ab12}</td>
                <td>2</td>
                <td>{kapPlaTabelle[7].ab13}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>  
                <tr>
                <td>H</td>
                <td>E12</td>
                <td>{kapPlaTabelle[8].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>2</td>
                <td>{kapPlaTabelle[8].ab7}</td>
                <td>2</td>
                <td>{kapPlaTabelle[8].ab8}</td>
                <td>3</td>
                <td>{kapPlaTabelle[8].ab9}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[8].ab12}</td>
                <td>2</td>
                <td>{kapPlaTabelle[8].ab13}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>        
                <tr>
                <td style={centeredCellStyle} rowSpan={3}>{t('Schutzblech vorne')}</td>
                <td>K</td>
                <td>E13</td>
                <td>{kapPlaTabelle[9].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>2</td>
                <td>{kapPlaTabelle[9].ab7}</td>
                <td>1</td>
                <td>{kapPlaTabelle[9].ab8}</td>
                <td>3</td>
                <td>{kapPlaTabelle[9].ab9}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[9].ab12}</td>
                <td>2</td>
                <td>{kapPlaTabelle[9].ab13}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>        
                <tr>
                <td>D</td>
                <td>E14</td>
                <td>{kapPlaTabelle[10].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>2</td>
                <td>{kapPlaTabelle[10].ab7}</td>
                <td>2</td>
                <td>{kapPlaTabelle[10].ab8}</td>
                <td>3</td>
                <td>{kapPlaTabelle[10].ab9}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[10].ab12}</td>
                <td>2</td>
                <td>{kapPlaTabelle[10].ab13}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>        
                <tr>
                <td>H</td>
                <td>E15</td>
                <td>{kapPlaTabelle[11].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>2</td>
                <td>{kapPlaTabelle[11].ab7}</td>
                <td>2</td>
                <td>{kapPlaTabelle[11].ab8}</td>
                <td>3</td>
                <td>{kapPlaTabelle[11].ab9}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[11].ab12}</td>
                <td>2</td>
                <td>{kapPlaTabelle[11].ab13}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr> 
                <tr>
                <td style={centeredCellStyle}>{t('Lenker')}</td>
                <td>KDH</td>
                <td>E16</td>
                <td>{kapPlaTabelle[12].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>2</td>
                <td>{kapPlaTabelle[12].ab6}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[12].ab14}</td>
                <td></td>
                <td></td>
                </tr> 
                <tr>
                <td style={centeredCellStyle}>{t('Sattel')}</td>
                <td>KDH</td>
                <td>E17</td>
                <td>{kapPlaTabelle[13].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[13].ab15}</td>
                </tr> 
                <tr>
                <td style={centeredCellStyle} rowSpan={3}>{t('Rahmen')}</td>
                <td>K</td>
                <td>E18</td>
                <td>{kapPlaTabelle[14].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[14].ab6}</td>
                <td>2</td>
                <td>{kapPlaTabelle[14].ab7}</td>
                <td>3</td>
                <td>{kapPlaTabelle[14].ab8}</td>
                <td>2</td>
                <td>{kapPlaTabelle[14].ab9}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>   
                <tr>
                <td>D</td>
                <td>E19</td>
                <td>{kapPlaTabelle[15].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[15].ab6}</td>
                <td>2</td>
                <td>{kapPlaTabelle[15].ab7}</td>
                <td>3</td>
                <td>{kapPlaTabelle[15].ab8}</td>
                <td>2</td>
                <td>{kapPlaTabelle[15].ab9}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>         
                <tr>
                <td>H</td>
                <td>E20</td>
                <td>{kapPlaTabelle[16].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[16].ab6}</td>
                <td>2</td>
                <td>{kapPlaTabelle[16].ab7}</td>
                <td>3</td>
                <td>{kapPlaTabelle[16].ab8}</td>
                <td>2</td>
                <td>{kapPlaTabelle[16].ab9}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>  
                <tr>
                <td style={centeredCellStyle}>{t('Pedale')}</td>
                <td>KDH</td>
                <td>E26</td>
                <td>{kapPlaTabelle[17].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>2</td>
                <td>{kapPlaTabelle[17].ab7}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>3</td>
                <td>{kapPlaTabelle[17].ab15}</td>
                </tr>
                <tr>
                <td style={centeredCellStyle} rowSpan={3}>{t('Vorderrad komplett')}</td>
                <td>K</td>
                <td>E49</td>
                <td>{kapPlaTabelle[18].quantity}</td>
                <td>6</td>
                <td>{kapPlaTabelle[18].ab1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>   
                <tr>
                <td>D</td>
                <td>E54</td>
                <td>{kapPlaTabelle[19].quantity}</td>
                <td>6</td>
                <td>{kapPlaTabelle[19].ab1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr> 
                <tr>
                <td>H</td>
                <td>E29</td>
                <td>{kapPlaTabelle[20].quantity}</td>
                <td>6</td>
                <td>{kapPlaTabelle[20].ab1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>  
                <tr>
                <td style={centeredCellStyle} rowSpan={3}>{t('Rahmen und Räder')}</td>
                <td>K</td>
                <td>E50</td>
                <td>{kapPlaTabelle[21].quantity}</td>
                <td></td>
                <td></td>
                <td>5</td>
                <td>{kapPlaTabelle[21].ab2}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>  
                <tr>
                <td>D</td>
                <td>E55</td>
                <td>{kapPlaTabelle[22].quantity}</td>
                <td></td>
                <td></td>
                <td>5</td>
                <td>{kapPlaTabelle[22].ab2}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>   
                <tr>
                <td>H</td>
                <td>E30</td>
                <td>{kapPlaTabelle[23].quantity}</td>
                <td></td>
                <td></td>
                <td>5</td>
                <td>{kapPlaTabelle[23].ab2}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr> 
                <tr>
                <td style={centeredCellStyle} rowSpan={3}>{t('Fahrrad ohne Pedale')}</td>
                <td>K</td>
                <td>E51</td>
                <td>{kapPlaTabelle[24].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>5</td>
                <td>{kapPlaTabelle[24].ab3}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>   
                <tr>
                <td>D</td>
                <td>E56</td>
                <td>{kapPlaTabelle[25].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>6</td>
                <td>{kapPlaTabelle[25].ab3}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>    
                <tr>
                <td>H</td>
                <td>E31</td>
                <td>{kapPlaTabelle[26].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>6</td>
                <td>{kapPlaTabelle[26].ab3}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>  
                <tr>
                <td style={centeredCellStyle} rowSpan={3}>{t('Fahrrad komplett')}</td>
                <td>K</td>
                <td>P1</td>
                <td>{kapPlaTabelle[27].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>6</td>
                <td>{kapPlaTabelle[27].ab4}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr> 
                <tr>
                <td>D</td>
                <td>P2</td>
                <td>{kapPlaTabelle[28].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>7</td>
                <td>{kapPlaTabelle[28].ab4}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>   
                <tr>
                <td>H</td>
                <td>P3</td>
                <td>{kapPlaTabelle[29].quantity}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>7</td>
                <td>{kapPlaTabelle[29].ab4}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr> 
                <tr>
                <td style={centeredCellStyle} colSpan={4}>{t('Kapazitätsbedarf (neu)')} <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">{t('Der Kapazitätsbedarf berechnet sich aus der Summe der benötigten Arbeitsminuten je Produkt für einen Arbeitsplatz')}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger></td>
                <td colSpan={2}>{kapBedarfNeu[0]}</td>
                <td colSpan={2}>{kapBedarfNeu[1]}</td>
                <td colSpan={2}>{kapBedarfNeu[2]}</td>
                <td colSpan={2}>{kapBedarfNeu[3]}</td>
                <td colSpan={2}></td>
                <td colSpan={2}>{kapBedarfNeu[4]}</td>
                <td colSpan={2}>{kapBedarfNeu[5]}</td>
                <td colSpan={2}>{kapBedarfNeu[6]}</td>
                <td colSpan={2}>{kapBedarfNeu[7]}</td>
                <td colSpan={2}>{kapBedarfNeu[8]}</td>
                <td colSpan={2}>{kapBedarfNeu[9]}</td>
                <td colSpan={2}>{kapBedarfNeu[10]}</td>
                <td colSpan={2}>{kapBedarfNeu[11]}</td>
                <td colSpan={2}>{kapBedarfNeu[12]}</td>
                <td colSpan={2}>{kapBedarfNeu[13]}</td>
                </tr>       
                <tr>
                <td style={centeredCellStyle} colSpan={4}>{t('Rüstzeit (neu)')} <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">{t('Die Rüstzeit ist mit Erfahrungswerten vorausgefüllt werden kann aber entsprechend geändert werden')}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[0]}
                      onChange={(e) =>
                        changeRuestNeu(0, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[1]}
                      onChange={(e) =>
                        changeRuestNeu(1, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[2]}
                      onChange={(e) =>
                        changeRuestNeu(2, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[3]}
                      onChange={(e) =>
                        changeRuestNeu(3, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[4]}
                      onChange={(e) =>
                        changeRuestNeu(4, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[5]}
                      onChange={(e) =>
                        changeRuestNeu(5, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[6]}
                      onChange={(e) =>
                        changeRuestNeu(6, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[7]}
                      onChange={(e) =>
                        changeRuestNeu(7, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[8]}
                      onChange={(e) =>
                        changeRuestNeu(8, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[9]}
                      onChange={(e) =>
                        changeRuestNeu(9, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[10]}
                      onChange={(e) =>
                        changeRuestNeu(10, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[11]}
                      onChange={(e) =>
                        changeRuestNeu(11, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[12]}
                      onChange={(e) =>
                        changeRuestNeu(12, e.target.value)
                      }
                      min={0}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ruestNeu[13]}
                      onChange={(e) =>
                        changeRuestNeu(13, e.target.value)
                      }
                      min={0}
                    /></td>
                </tr>         
                <tr>
                <td style={centeredCellStyle} colSpan={4}>{t('Kap.bed. (Rückstand Vorperiode)')} <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">{t('Der Rückstand aus der Vorperiode vom Kapazitätsbedarf sind die aufaddierten Zeiten von Aufträgen in der Warteschlange oder in Bearbeitung die je Arbeitsplatz benötigt werden')}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger></td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '1') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '1').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '2') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '2').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '3') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '3').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '4') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '4').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}></td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '6') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '6').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '7') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '7').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '8') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '8').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '9') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '9').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '10') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '10').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '11') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '11').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '12') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '12').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '13') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '13').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '14') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '14').timeneed
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{warteschlangeZeit.some(obj => obj.arbeitsplatz === '15') ? (
                warteschlangeZeit.find(obj => obj.arbeitsplatz === '15').timeneed
                ) : (
                0
                )}
                </td>
                </tr>          
                <tr>
                <td style={centeredCellStyle} colSpan={4}>{t('Rüstzeit (Rückstand Vorperiode)')} <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">{t('Der Rückstand aus der Vorperiode an Rüstzeit ermittelt sich aus der Summe der Rüstzeiten all den Aufträgen pro Arbeitsplatz die sich noch nicht gerade in Bearbeitung in diesem Arbeitsplatz befinden und daher erstmal gerüstet werden muss')}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger></td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '1') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '1').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '2') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '2').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '3') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '3').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '4') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '4').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}></td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '6') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '6').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '7') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '7').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '8') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '8').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '9') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '9').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '10') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '10').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '11') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '11').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '12') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '12').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '13') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '13').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '14') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '14').time
                ) : (
                0
                )}
                </td>
                <td colSpan={2}>{ruestVorP.some(obj => obj.arbeitsplatz === '15') ? (
                ruestVorP.find(obj => obj.arbeitsplatz === '15').time
                ) : (
                0
                )}
                </td>
                </tr>       
                <tr>
                <td style={centeredCellStyle} colSpan={4}>{t('Gesamt-Kapazitätsbedarf')} <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">{t('Der Gesamt-Kapazitätsbedarf berechnet sich aus der Summe der 4 vorherigen Zeilen')}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger></td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '1') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '1').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '1') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '1').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[0]) + (kapBedarfNeu[0])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '2') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '2').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '2') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '2').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[1]) + (kapBedarfNeu[1])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '3') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '3').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '3') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '3').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[2]) + (kapBedarfNeu[2])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '4') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '4').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '4') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '4').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[3]) + (kapBedarfNeu[3])
                
                }
                </td>
                <td colSpan={2}></td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '6') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '6').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '6') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '6').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[4]) + (kapBedarfNeu[4])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '7') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '7').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '7') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '7').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[5]) + (kapBedarfNeu[5])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '8') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '8').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '8') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '8').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[6]) + (kapBedarfNeu[6])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '9') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '9').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '9') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '9').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[7]) + (kapBedarfNeu[7])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '10') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '10').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '10') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '10').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[8]) + (kapBedarfNeu[8])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '11') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '11').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '11') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '11').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[9]) + (kapBedarfNeu[9])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '12') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '12').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '12') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '12').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[10]) + (kapBedarfNeu[10])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '13') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '13').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '13') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '13').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[11]) + (kapBedarfNeu[11])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '14') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '14').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '14') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '14').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[12]) + (kapBedarfNeu[12])
                
                }
                </td>
                <td colSpan={2}>
                {(ruestVorP.some(obj => obj.arbeitsplatz === '15') ? (
                parseInt(ruestVorP.find(obj => obj.arbeitsplatz === '15').time)
                ) : (
                0
                )) + (warteschlangeZeit.some(obj => obj.arbeitsplatz === '15') ? (
                    parseInt(warteschlangeZeit.find(obj => obj.arbeitsplatz === '15').timeneed)
                    ) : (
                    0
                    ))  + (ruestNeu[13]) + (kapBedarfNeu[13])
                
                }
                </td>
                </tr>   
                <tr>
                <td style={centeredCellStyle} colSpan={4}>{t('Schichten')} <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">{t('Die Schichten und Überstunden werden basierend auf dem Gesamtkapazitätsbedarf berechnet. Überstunden werden immer bevorzugt, falls mehr als 240 Minuten pro Tag an überstunden anfallen würden wird eine neue Schicht hinzugefügt.')}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[0]}
                      onChange={(e) =>
                        handleSchichtenChange(0, e.target.value)
                      }
                      min={1}
                      max={3}
                    />
                    </td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[1]}
                      onChange={(e) =>
                        handleSchichtenChange(1, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[2]}
                      onChange={(e) =>
                        handleSchichtenChange(2, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[3]}
                      onChange={(e) =>
                        handleSchichtenChange(3, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[4]}
                      onChange={(e) =>
                        handleSchichtenChange(4, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[5]}
                      onChange={(e) =>
                        handleSchichtenChange(5, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[6]}
                      onChange={(e) =>
                        handleSchichtenChange(6, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[7]}
                      onChange={(e) =>
                        handleSchichtenChange(7, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[8]}
                      onChange={(e) =>
                        handleSchichtenChange(8, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[9]}
                      onChange={(e) =>
                        handleSchichtenChange(9, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[10]}
                      onChange={(e) =>
                        handleSchichtenChange(10, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[11]}
                      onChange={(e) =>
                        handleSchichtenChange(11, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[12]}
                      onChange={(e) =>
                        handleSchichtenChange(12, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={schichten[13]}
                      onChange={(e) =>
                        handleSchichtenChange(13, e.target.value)
                      }
                      min={1}
                      max={3}
                    /></td>
                </tr>          
                <tr>
                <td style={centeredCellStyle} colSpan={4}>{t('Überstunden')} <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled">{t('Die Schichten und Überstunden werden basierend auf dem Gesamtkapazitätsbedarf berechnet. Überstunden werden immer bevorzugt, falls mehr als 240 Minuten pro Tag an überstunden anfallen würden wird eine neue Schicht hinzugefügt.')}</Tooltip>}>
                  <span className="d-inline-block">
                          <FontAwesomeIcon icon={faInfoCircle}/>
                  </span>
                </OverlayTrigger></td>
                <td colSpan={2}><input
                      type="number"
                      className="form-control"
                      value={ueberstunden[0]}
                      onChange={(e) =>
                        handleUeberstundenChange(0, e.target.value)
                      }
                      min={0}
                      max={240}
                    /></td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[1]}
                      onChange={(e) =>
                        handleUeberstundenChange(1, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[2]}
                      onChange={(e) =>
                        handleUeberstundenChange(2, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[3]}
                      onChange={(e) =>
                        handleUeberstundenChange(3, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}></td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[4]}
                      onChange={(e) =>
                        handleUeberstundenChange(4, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[5]}
                      onChange={(e) =>
                        handleUeberstundenChange(5, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[6]}
                      onChange={(e) =>
                        handleUeberstundenChange(6, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[7]}
                      onChange={(e) =>
                        handleUeberstundenChange(7, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[8]}
                      onChange={(e) =>
                        handleUeberstundenChange(8, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[9]}
                      onChange={(e) =>
                        handleUeberstundenChange(9, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[10]}
                      onChange={(e) =>
                        handleUeberstundenChange(10, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[11]}
                      onChange={(e) =>
                        handleUeberstundenChange(11, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[12]}
                      onChange={(e) =>
                        handleUeberstundenChange(12, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                <td colSpan={2}>
                <input
                      type="number"
                      className="form-control"
                      value={ueberstunden[13]}
                      onChange={(e) =>
                        handleUeberstundenChange(13, e.target.value)
                      }
                      min={0}
                      max={240}
                    />
                </td>
                </tr>                                                                                                                                                                                                                       
            </tbody>
        </Table>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ButtonGroup aria-label="Basic example">
              <Button as={Link} to="/step5" onClick={() => setHeader(5)} size="lg" variant="outline-secondary">« {t('Zurueck')}</Button>
              <Button as={Link} to="/step7" onClick={() => setHeader(7)} size="lg" variant="outline-secondary">{t('Weiter')} »</Button>
          </ButtonGroup>
      </div>
      </div>
    );
  }
  
  export default KapPla