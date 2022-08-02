import React from "react";
import { Card } from "react-bootstrap";
import { InferGetStaticPropsType } from "next";
import { IExpense, initExpense } from "../../types";
import Expense from "../../components/Expense";
import FormExpense from "../../components/ExpenseForm";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


export default function indexPage({
  expenses,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [expensesList, setExpensesList] = React.useState(expenses);

  const addExpense = (expense: IExpense) => {
    const newExpenses = [expense, ...expensesList];
    setExpensesList(newExpenses);
  };

  const removeExpense = (id: number) => {
    const newExpenses = expensesList.filter((expense) => {
      return expense.id !== id;
    });
    setExpensesList(newExpenses);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Expenses List</h1>
        <FormExpense addExpense={addExpense} />
        <div>
          {expensesList.map((expense, index) => (
            <Card key={index}>
              <Card.Body>
                <Expense expense={expense} removeExpense={removeExpense} />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const expenses: IExpense[] = [
    {
      ... initExpense(),
      id: 1,
      name: 'Completos',
      description: '',
      price: 2000,
      tipPercent: 10,
      taxRate: 19,
    },
    {
      ... initExpense(),
      id: 2,
      name: 'Helados',
      description: '',
      price: 3400,
      tipPercent: 10,
      taxRate: 19,
    },
  ];

  return {
    props: {
      expenses,
    },
  };
}