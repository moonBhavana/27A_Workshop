import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deposit, credit, transfer } from './action';
import './index.css';

const BankAccount = () => {
  const dispatch = useDispatch();
  const balance = useSelector(state => state.balance);
  const transactions = useSelector(state => state.transactions);
  const [transferTo, setTransferTo] = useState('');

  const handleDeposit = (event) => {
    event.preventDefault();
    const amount = Number(event.target.amount.value);
    dispatch(deposit(amount));
  };

  const handleCredit = (event) => {
    event.preventDefault();
    const amount = Number(event.target.amount.value);
    dispatch(credit(amount));
  };

  const handleTransfer = (event) => {
    event.preventDefault();
    const amount = Number(event.target.amount.value);
    dispatch(transfer(amount, transferTo));
  };

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const transactionOptions = transactions.map((transaction, index) => {
    return <option key={index} value={transaction}>{transaction}</option>;
  });

  return (
    <div>
      {/* A box to credit and deposit amounts */}
      <div className="bank-account">
        <h2>Bank Account Balance: ${balance}</h2>
        <form onSubmit={handleDeposit}>
          <label htmlFor="deposit-amount">Deposit Amount:</label>
          <input id="deposit-amount" type="number" name="amount" />
          <button type="submit">Deposit</button>
        </form>
        <form onSubmit={handleCredit}>
          <label htmlFor="credit-amount">Credit Amount:</label>
          <input id="credit-amount" type="number" name="amount" />
          <button type="submit">Credit</button>
        </form>
      </div>

      {/* A box to transfer money to a certain user ID */}
      <div className="bank-account">
        <form onSubmit={handleTransfer}>
          <label htmlFor="transfer-to">Transfer to:</label>
          <input id="transfer-to" type="text" name="transferTo" value={transferTo} onChange={e => setTransferTo(e.target.value)} />
          <label htmlFor="transfer-amount">Amount:</label>
          <input id="transfer-amount" type="number" name="amount" />
          <button type="submit">Transfer</button>
        </form>
      </div>

      {/* Displaying the Transaction log in Drop down format */}
      <div className="transaction-log">
  <h2>Transaction Log:</h2>
  <select value={selectedTransaction} onChange={(event) => setSelectedTransaction(event.target.value)}>
    <option value={null}>Select a transaction</option>
    {transactionOptions}
  </select>
    {selectedTransaction && (
        <div>
        <h3>Selected transaction:</h3>
        <p>{selectedTransaction}</p>
        </div>
        )}

    </div>
    </div>
  );
};



export default BankAccount;
