import { Dashbord } from "./components/Dashboard";
import { Header } from "./components/TransactionsTable/Header";
import { GlobalStyle } from "./styles/global";
import { useState } from "react";
import { NewTrasactionModal } from "./components/NewTransactionModal";
import { TransactionProvider } from "./hooks/useTransactions";

export function App() {

  // All methods of Modal could be using by children components

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashbord />
      <NewTrasactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionProvider>
  );
}
