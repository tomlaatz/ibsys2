import React from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

function Zusatzauftrag({zusatzauftragMatrix, zusatzauftragChange}) {
  const { t } = useTranslation();
  
  const handleChange = (productIndex, periodIndex, value) => {
    if (periodIndex === 0) {
      const isValidValue = /^[0-9]\d*$/.test(value);
      if (isValidValue) {
        zusatzauftragChange(productIndex, periodIndex, value.replace(',', '.'));
      }
    } else {
      const isValidValue = /^(\d+([.,]\d{0,2})?)?$/.test(value);
      if (isValidValue) {
        zusatzauftragChange(productIndex, periodIndex, value.replace(',', '.'));
      }
    }
  };


  return (
    <div>
      <h2>{t('Zusatzauftrag')}</h2>
      <Table bordered>
        <thead>
          <tr>
            <th></th>
            <th>{t('Menge')}</th>
            <th>{t('Preis')}</th>
            <th>{t('Konventionalstrafe')}</th>
          </tr>
        </thead>
        <tbody>
          {zusatzauftragMatrix.map((row, rowIndex) => (
            <tr key={`product-${rowIndex}`}>
              <th>{`P${rowIndex + 1}`}</th>
              {row.map((quantity, columnIndex) => (
                <td key={`quantity-${rowIndex}-${columnIndex}`}>
                  <input
                    type="text"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => handleChange(rowIndex, columnIndex, e.target.value)}
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

export default Zusatzauftrag;