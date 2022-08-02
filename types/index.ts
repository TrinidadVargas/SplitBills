export interface IUser {
  id: number;
  name: string;
}

export interface IExpense {
  id: number;
  name: string;
  description: string;
  price: number;
  includesTax: boolean;
  taxRate: number;
  taxAmount: number;
  includesTip: boolean;
  tipOverTotal: boolean;
  tipPercent: number;
  tipAmount: number;
  fees: number[];
}

export interface IFormExpense {
  id: number;
  name: string;
  description: string;
  price: string;
  includesTax: boolean;
  taxRate: string;
  taxAmount: string;
  includesTip: boolean;
  tipOverTotal: boolean;
  tipPercent: string;
  tipAmount: string;
  fees: string[];
}

export const initExpense = () => {
  return ({
    id: 0,
    name: '',
    description: '',
    price: 0,
    includesTax: true,
    taxRate: 0,
    taxAmount: 0,
    includesTip: true,
    tipOverTotal: false,
    tipPercent: 0,
    tipAmount: 0,
    fees: [],
  });
};

export const initFormExpense = () => {
  return ({
    id: 0,
    name: '',
    description: '',
    price: '',
    includesTax: true,
    taxRate: '',
    taxAmount: '',
    includesTip: true,
    tipOverTotal: false,
    tipPercent: '10',
    tipAmount: '',
    fees: [],
  });
};