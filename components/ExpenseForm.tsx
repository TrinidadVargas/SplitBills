import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { IExpense, IFormExpense, initExpense, initFormExpense } from "../types";
import TipForm from "./ExpenseTipForm";
import TaxForm from "./ExpenseTaxForm";
import { decimalInputValidator } from "../utils/validators";


type Props = {
  addExpense: (newExpense: IExpense) => void;
};

const FormExpense: React.FC<Props> = ({ addExpense }) => {
  const [newExpense, setNewExpense] = React.useState<IFormExpense>(initFormExpense());
  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addExpense({
      ...initExpense(),
      id: newExpense.id,
      name: newExpense.name,
      description: newExpense.description,
      price: Number(newExpense.price),
      includesTax: newExpense.includesTax,
      taxRate: Number(newExpense.taxRate),
      taxAmount : Number(newExpense.taxAmount),
      includesTip: newExpense.includesTip,
      tipPercent: Number(newExpense.tipPercent),
      tipAmount: Number(newExpense.tipAmount),
    });
    setNewExpense(initFormExpense());
  };

  const handlePriceChange = (price: string) => {
    const newPrice: number = Number(price);
    const taxAmount: number = newPrice * (Number(newExpense.taxRate) / 100);
    const tipAmount: number = newPrice * (Number(newExpense.tipPercent) / 100);
    setNewExpense({...newExpense, price, taxAmount: taxAmount.toString(), tipAmount: tipAmount.toString()});
  }

  useEffect(() => {
    const totalPriceChange = () => {
      let newPrice: number = Number(newExpense.price);
      if (newExpense.includesTax) {
        newPrice += Number(newExpense.taxAmount);
      }
      if (newExpense.includesTip) {
        newPrice += Number(newExpense.tipAmount);
      }
      setTotalPrice(newPrice);
    }
    totalPriceChange();
  }, [newExpense]);

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup className="mb-3">
        <InputGroup.Text>Expense</InputGroup.Text>
        <Form.Control
          placeholder="Name"
          value={newExpense.name}
          onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Price</InputGroup.Text>
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control
          placeholder="Amount"
          value={newExpense.price}
          onChange={(e) => handlePriceChange(decimalInputValidator(e.target.value))}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Add Tip</InputGroup.Text>
        <InputGroup.Checkbox
          onChange={(e: any) => setNewExpense({...newExpense, includesTip: e.target.checked})}
          checked={newExpense.includesTip}
        />
        <DropdownButton
          title="Tip options"
          variant="outline-secondary"
          disabled={!newExpense.includesTip}
        >
          <Dropdown.Item>Tip before Tax</Dropdown.Item>
          <Dropdown.Item>Tip after Tax</Dropdown.Item>
        </DropdownButton>
        <InputGroup.Text>Add Tax</InputGroup.Text>
        <InputGroup.Checkbox
          onChange={(e: any) => setNewExpense({...newExpense, includesTax: e.target.checked})}
          checked={newExpense.includesTax}
        />
        <DropdownButton
          title="Tax options"
          variant="outline-secondary"
        >
          <Dropdown.Item>Tax before Tip</Dropdown.Item>
          <Dropdown.Item>Tax after Tip</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      {newExpense.includesTip ? <TipForm newExpense={newExpense} setNewExpense={setNewExpense}/> : null}
      {newExpense.includesTax ? <TaxForm newExpense={newExpense} setNewExpense={setNewExpense}/> : null}
      <div>
        <h5><b>Total:</b> ${totalPrice}</h5>
      </div>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default FormExpense;