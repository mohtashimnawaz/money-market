'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export default function Home() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState<'supply' | 'borrow'>('supply');

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-primary-600">Solana Money Market</h1>
              </div>
            </div>
            <div className="flex items-center">
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </nav>

      {connected ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('supply')}
                  className={`${
                    activeTab === 'supply'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  Supply
                </button>
                <button
                  onClick={() => setActiveTab('borrow')}
                  className={`${
                    activeTab === 'borrow'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                >
                  Borrow
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'supply' ? (
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Supply Assets</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Deposit assets to earn interest and use as collateral.
                  </p>
                  {/* Supply form will go here */}
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Borrow Assets</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Borrow assets against your supplied collateral.
                  </p>
                  {/* Borrow form will go here */}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Connect your wallet to get started</h2>
            <p className="mt-2 text-gray-500">
              Connect your Solana wallet to supply or borrow assets.
            </p>
          </div>
        </div>
      )}
    </main>
  );
} 