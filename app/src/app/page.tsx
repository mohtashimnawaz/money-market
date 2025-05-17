'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { LendingForms } from '@/components/LendingForms';
import { MarketStats } from '@/components/MarketStats';

// Dynamically import the WalletMultiButton with no SSR
const WalletButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState<'supply' | 'borrow'>('supply');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-primary-50">
      <nav className="bg-white/80 shadow-sm sticky top-0 z-50 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  Solana Money Market
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">Docs</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">Support</a>
              </div>
              <WalletButton />
            </div>
          </div>
        </div>
      </nav>

      {connected ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex">
                    <button
                      onClick={() => setActiveTab('supply')}
                      className={`${
                        activeTab === 'supply'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors duration-200`}
                    >
                      Supply
                    </button>
                    <button
                      onClick={() => setActiveTab('borrow')}
                      className={`${
                        activeTab === 'borrow'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors duration-200`}
                    >
                      Borrow
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'supply' ? (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Supply Assets</h2>
                      <p className="text-gray-500 mb-8">
                        Deposit assets to earn interest and use as collateral for borrowing.
                      </p>
                      <LendingForms activeTab={activeTab} />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Borrow Assets</h2>
                      <p className="text-gray-500 mb-8">
                        Borrow assets against your supplied collateral with competitive interest rates.
                      </p>
                      <LendingForms activeTab={activeTab} />
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Position</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Supplied</p>
                    <p className="text-xl font-semibold text-primary-600 mt-1">0.00 SOL</p>
                    <p className="text-xs text-gray-400 mt-1">≈ $0.00</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Borrowed</p>
                    <p className="text-xl font-semibold text-green-600 mt-1">0.00 SOL</p>
                    <p className="text-xs text-gray-400 mt-1">≈ $0.00</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-sm text-gray-500">Health Factor</p>
                    <p className="text-xl font-semibold text-green-600 mt-1">∞</p>
                    <p className="text-xs text-gray-400 mt-1">Safe</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <MarketStats />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Solana Money Market</h2>
            <p className="text-xl text-gray-500 mb-8">
              Connect your wallet to start earning interest on your assets or borrow against your collateral.
            </p>
            <div className="flex justify-center">
              <WalletButton />
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary-600 text-xl">↑</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Supply Assets</h3>
                <p className="text-gray-500">Earn interest on your idle assets</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-green-600 text-xl">↓</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Borrow Assets</h3>
                <p className="text-gray-500">Borrow against your collateral</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl">$</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Earn Interest</h3>
                <p className="text-gray-500">Competitive interest rates</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 