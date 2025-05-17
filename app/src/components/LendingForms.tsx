'use client';

import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

interface LendingFormsProps {
  activeTab: 'supply' | 'borrow';
}

export const LendingForms: FC<LendingFormsProps> = ({ activeTab }) => {
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSupply = async () => {
    if (!publicKey || !amount) return;
    setIsLoading(true);
    try {
      // TODO: Implement supply logic
      console.log('Supplying:', parseFloat(amount) * LAMPORTS_PER_SOL);
      setAmount('');
    } catch (error) {
      console.error('Supply failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBorrow = async () => {
    if (!publicKey || !amount) return;
    setIsLoading(true);
    try {
      // TODO: Implement borrow logic
      console.log('Borrowing:', parseFloat(amount) * LAMPORTS_PER_SOL);
      setAmount('');
    } catch (error) {
      console.error('Borrow failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount (SOL)
        </label>
        <div className="mt-1">
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <button
        onClick={activeTab === 'supply' ? handleSupply : handleBorrow}
        disabled={!publicKey || !amount || isLoading}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          activeTab === 'supply'
            ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500'
            : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          activeTab === 'supply' ? 'Supply' : 'Borrow'
        )}
      </button>
    </div>
  );
}; 