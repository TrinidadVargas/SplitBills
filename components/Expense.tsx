import React from "react";
import { Button } from "react-bootstrap";
import { IExpense } from "../types";

type Props = {
  expense: IExpense;
  removeExpense: (id: number) => void;
};

const Expense: React.FC<Props> = ({ expense, removeExpense }) => {
  return (
    <div className="expense">
      <span>
        Expense: {expense.name}
      </span>
      <span>
        $ {expense.price}
      </span>
      <div>
        <span>
          {expense.description}
          </span>
      </div>
    </div>
  );
};

export default Expense;