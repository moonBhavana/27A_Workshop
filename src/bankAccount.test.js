import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import BankAccount from './bankAccount';


describe('BankAccount', () => {
    it('should submit the form correctly', () => {
      const handleTransfer = jest.fn();
      const { getByLabelText, getByText } = render(<BankAccount handleTransfer={handleTransfer} />);
      const transferToInput = getByLabelText(/Transfer to:/i);
      const amountInput = getByLabelText(/Amount:/i);
      const submitButton = getByText(/Transfer/i);
  
      fireEvent.change(transferToInput, { target: { value: '1234567890' } });
      fireEvent.change(amountInput, { target: { value: 100 } });
      fireEvent.click(submitButton);
  
      expect(handleTransfer).toHaveBeenCalled();
    });
  });
  