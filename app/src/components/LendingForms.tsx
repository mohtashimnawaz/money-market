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
    <div className="space-y-6 bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {activeTab === 'supply' ? 'Supply SOL' : 'Borrow SOL'}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Available:</span>
            <span className="text-sm font-medium text-primary-600">10.00 SOL</span>
          </div>
        </div>

        <div className="relative">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full rounded-lg border-gray-300 pl-4 pr-12 py-3 text-lg focus:border-primary-500 focus:ring-primary-500 transition-colors duration-200"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-gray-500 sm:text-sm">SOL</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[0.1, 0.5, 1, 5].map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value.toString())}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {value} SOL
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Interest Rate</span>
          <span className="font-medium text-primary-600">2.5% APY</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Collateral Ratio</span>
          <span className="font-medium text-primary-600">150%</span>
        </div>
      </div>

      <button
        onClick={activeTab === 'supply' ? handleSupply : handleBorrow}
        disabled={!publicKey || !amount || isLoading}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white transition-all duration-200 ${
          activeTab === 'supply'
            ? 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500'
            : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]`}
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
          activeTab === 'supply' ? 'Supply SOL' : 'Borrow SOL'
        )}
      </button>
    </div>
  );
}; 