import React from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

function Produktionsprogramm({produktionsprogrammMatrix, produktionsprogrammChange, aktuellePeriode}) {
  
  const handleChange = (productIndex, periodIndex, value) => {
    // Check if the entered value is negative
    const newValue = Math.max(parseInt(value, 10), 0); // Set negative values to 0
    produktionsprogrammChange(productIndex, periodIndex, newValue);
  };

  const { t } = useTranslation();
  
  return (
    <div>
      <h2>{t('Produktionsprogramm')}</h2>
      <Table bordered>
        <thead>
          <tr>
            <th></th>
            <th>{t('Periode')} {aktuellePeriode+1}</th>
            <th>{t('Periode')} {aktuellePeriode+2}</th>
            <th>{t('Periode')} {aktuellePeriode+3}</th>
            <th>{t('Periode')} {aktuellePeriode+4}</th>
          </tr>
        </thead>
        <tbody>
          {produktionsprogrammMatrix.map((row, rowIndex) => (
            <tr key={`product-${rowIndex}`}>
              <th>{`P${rowIndex + 1}`}</th>
              {row.map((quantity, columnIndex) => (
                <td key={`quantity-${rowIndex}-${columnIndex}`}>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) =>
                      handleChange(rowIndex, columnIndex, e.target.value)
                    }
                    min={0} 
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Produktionsprogramm