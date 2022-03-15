import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: string;
}

// interface TransactionInput{
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

// type TransactionInput = Pick<
//   Transaction,
//   "title" | "amount" | "type" | "category"
// >;

// create a interface input fields, omitting id and data props from Transaction interface.
type TransactionInput = Omit<Transaction, "id" | "date">;

//
interface TransactionProviderProps {
  children: ReactNode;
}

// saying that this Context could receive two tipes of data: an array of objects and an function of creation
interface TransactionContextDataProps {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

// create a Context and typing him
const TransactionContext = createContext<TransactionContextDataProps>(
  {} as TransactionContextDataProps
);

// create a Provider
export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  // 
  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {...transactionInput, date: new Date()});
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions(){
  const context = useContext(TransactionContext);

  return context
}
