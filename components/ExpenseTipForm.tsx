import * as React from "react";
import { Form } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import { IFormExpense } from "../types";
import { decimalInputValidator} from "../utils/validators";

type Props = {
  newExpense: IFormExpense;
  setNewExpense: React.Dispatch<React.SetStateAction<IFormExpense>>;
};

const ExpenseTip: React.FC<Props> = ({newExpense, setNewExpense}) => {

  const handleTipPercentChange = (tipPercent: string) => {
    const tipAmount: number = Number(newExpense.price) * (Number(tipPercent) / 100);
    setNewExpense({...newExpense, tipAmount: tipAmount.toString(), tipPercent });
  }

  const handleTipAmountChange = (tipAmount: string) => {
    const tipPercent: number = (Number(tipAmount) / Number(newExpense.price)) * 100;
    setNewExpense({...newExpense, tipAmount: tipAmount, tipPercent: tipPercent.toString() });
  }
  
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>Tip</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          placeholder="Tip Amount"
          value={newExpense.tipAmount}
          onChange={(e) =>handleTipAmountChange(decimalInputValidator(e.target.value))}
        />
        <InputGroup.Text>%</InputGroup.Text>
        <Form.Control
          placeholder="Tip Rate"
          value={newExpense.tipPercent}
          onChange={(e) => handleTipPercentChange(decimalInputValidator(e.target.value))}
        />
      </InputGroup>
    </div>
  );
}

export default ExpenseTip;