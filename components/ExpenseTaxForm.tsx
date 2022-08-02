import * as React from "react";
import { Form } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import { IFormExpense } from "../types";
import { decimalInputValidator} from "../utils/validators";

type Props = {
  newExpense: IFormExpense;
  setNewExpense: React.Dispatch<React.SetStateAction<IFormExpense>>;
};

const ExpenseTaxForm: React.FC<Props> = ({newExpense, setNewExpense}) => {
  
  const handleTaxRateChange = (taxRate: string) => {
    const taxAmount: number = Number(newExpense.price) * (Number(taxRate) / 100);
    setNewExpense({...newExpense, taxAmount: taxAmount.toString(), taxRate: taxRate});
  }

  const handleTaxAmountChange = (taxAmount: string) => {
    const taxPercent: number = (Number(taxAmount) / Number(newExpense.price)) * 100;
    setNewExpense({...newExpense, taxAmount: taxAmount, taxRate: taxPercent.toString()});
  }

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>Tax</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          placeholder="Tax Amount"
          value={newExpense.taxAmount}
          onChange={(e) =>handleTaxAmountChange(decimalInputValidator(e.target.value))}
        />
        <InputGroup.Text>%</InputGroup.Text>
        <Form.Control
          placeholder="Tax Rate"
          value={newExpense.taxRate}
          onChange={(e) => handleTaxRateChange(decimalInputValidator(e.target.value))}
        />
      </InputGroup>
    </div>
  );
}

export default ExpenseTaxForm;