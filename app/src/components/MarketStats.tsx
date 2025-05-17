'use client';

import { FC } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  highlight?: boolean;
  color?: 'blue' | 'emerald' | 'amber';
}

const StatCard: FC<StatCardProps> = ({ title, value, change, trend, highlight, color = 'blue' }) => {
  const getTrendClass = () => {
    switch (trend) {
      case 'up':
        return 'modern-change positive';
      case 'down':
        return 'modern-change negative';
      default:
        return 'modern-change neutral';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'emerald':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/30';
      case 'amber':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/15 hover:border-amber-500/30';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/15 hover:border-blue-500/30';
    }
  };

  return (
    <div className={`modern-stat ${highlight ? getColorClass() : ''} transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
      <h3 className={`modern-label mb-2 ${highlight ? getColorClass() : ''}`}>{title}</h3>
      <div className="flex-right space-x-2">
        <p className={`modern-stat ${highlight ? getColorClass() : ''}`}>{value}</p>
        {change && (
          <p className={`${getTrendClass()} ${highlight ? getColorClass() : ''}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {change}
          </p>
        )}
      </div>
    </div>
  );
};

export const MarketStats: FC = () => {
  return (
    <div className="center-container space-y-16 animate-fade-in">
      <div className="modern-grid gap-8">
        <StatCard
          title="Total Value Locked"
          value="$1.2M"
          change="+12.5%"
          trend="up"
          highlight={true}
          color="emerald"
        />
        <StatCard
          title="Total Borrowed"
          value="$456.7K"
          change="+8.3%"
          trend="up"
          highlight={true}
          color="blue"
        />
        <StatCard
          title="Utilization Rate"
          value="68%"
          change="-2.1%"
          trend="down"
          highlight={true}
          color="amber"
        />
      </div>

      <div className="modern-section transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
        <h3 className="heading-3 mb-8 text-right">Market Overview</h3>
        <div className="space-y-8">
          <div className="modern-card p-6 hover:shadow-lg transition-all duration-300">
            <div className="grid-right gap-6">
              <div className="flex-right space-x-6">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex-center animate-pulse-slow hover:bg-blue-500/20 transition-all duration-300">
                  <span className="text-blue-400 font-medium text-xl">S</span>
                </div>
                <div className="text-right">
                  <p className="body-large font-medium">SOL</p>
                  <p className="body-small">Solana</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-12 text-right">
                <div>
                  <p className="modern-value">2.5% APY</p>
                  <p className="body-small">Supply Rate</p>
                </div>
                <div>
                  <p className="modern-value">4.2% APY</p>
                  <p className="body-small">Borrow Rate</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="modern-progress h-3">
              <div className="modern-progress-bar animate-gradient hover:opacity-90 transition-all duration-300" style={{ width: '65%' }} />
            </div>
            <div className="flex justify-between body-small">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="modern-section bg-blue-500/5 border-blue-500/10 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
        <h3 className="heading-3 mb-8 text-right text-blue-400">Recent Borrowing Activity</h3>
        <div className="space-y-6">
          {[
            { type: 'Borrow', amount: '5 SOL', user: '0x8765...4321', time: '5m ago' },
            { type: 'Borrow', amount: '3 SOL', user: '0x9876...5432', time: '15m ago' },
            { type: 'Borrow', amount: '7 SOL', user: '0x5432...1234', time: '25m ago' },
          ].map((activity, index) => (
            <div 
              key={index} 
              className="modern-activity hover:bg-blue-500/10 transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg"
            >
              <div className="grid-right gap-6">
                <div className="flex-right space-x-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex-center animate-pulse-slow hover:bg-blue-500/20 transition-all duration-300">
                    <span className="text-blue-400 text-xl font-medium">↓</span>
                  </div>
                  <div className="text-right">
                    <p className="body-large font-medium text-blue-400">{activity.type}</p>
                    <p className="body-small">{activity.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="modern-value text-blue-400">{activity.amount}</p>
                  <p className="body-small">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="modern-section transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl">
        <h3 className="heading-3 mb-8 text-right">Recent Supply Activity</h3>
        <div className="space-y-6">
          {[
            { type: 'Supply', amount: '10 SOL', user: '0x1234...5678', time: '2m ago' },
            { type: 'Supply', amount: '20 SOL', user: '0x2468...1357', time: '10m ago' },
            { type: 'Supply', amount: '15 SOL', user: '0x1357...2468', time: '20m ago' },
          ].map((activity, index) => (
            <div 
              key={index} 
              className="modern-activity transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg"
            >
              <div className="grid-right gap-6">
                <div className="flex-right space-x-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex-center animate-pulse-slow hover:bg-emerald-500/20 transition-all duration-300">
                    <span className="text-emerald-400 text-xl font-medium">↑</span>
                  </div>
                  <div className="text-right">
                    <p className="body-large font-medium">{activity.type}</p>
                    <p className="body-small">{activity.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="modern-value">{activity.amount}</p>
                  <p className="body-small">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 