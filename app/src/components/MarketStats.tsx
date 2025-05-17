'use client';

import { FC } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: FC<StatCardProps> = ({ title, value, change, trend }) => {
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

  return (
    <div className="modern-stat">
      <h3 className="modern-label mb-2">{title}</h3>
      <div className="flex-right space-x-2">
        <p className="modern-stat">{value}</p>
        {change && (
          <p className={getTrendClass()}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {change}
          </p>
        )}
      </div>
    </div>
  );
};

export const MarketStats: FC = () => {
  return (
    <div className="center-container space-y-8 animate-fade-in">
      <div className="modern-grid">
        <StatCard
          title="Total Value Locked"
          value="$1.2M"
          change="+12.5%"
          trend="up"
        />
        <StatCard
          title="Total Borrowed"
          value="$456.7K"
          change="+8.3%"
          trend="up"
        />
        <StatCard
          title="Utilization Rate"
          value="68%"
          change="-2.1%"
          trend="down"
        />
      </div>

      <div className="modern-section">
        <h3 className="heading-3 mb-6 text-right">Market Overview</h3>
        <div className="space-y-6">
          <div className="modern-card p-4">
            <div className="grid-right gap-4">
              <div className="flex-right space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex-center animate-pulse-slow">
                  <span className="text-blue-400 font-medium text-lg">S</span>
                </div>
                <div className="text-right">
                  <p className="body-large font-medium">SOL</p>
                  <p className="body-small">Solana</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 text-right">
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

          <div className="space-y-2">
            <div className="modern-progress h-2">
              <div className="modern-progress-bar animate-gradient" style={{ width: '65%' }} />
            </div>
            <div className="flex justify-between body-small">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="modern-section">
        <h3 className="heading-3 mb-6 text-right">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { type: 'Supply', amount: '10 SOL', user: '0x1234...5678', time: '2m ago' },
            { type: 'Borrow', amount: '5 SOL', user: '0x8765...4321', time: '5m ago' },
            { type: 'Supply', amount: '20 SOL', user: '0x2468...1357', time: '10m ago' },
          ].map((activity, index) => (
            <div 
              key={index} 
              className="modern-activity"
            >
              <div className="grid-right gap-4">
                <div className="flex-right space-x-4">
                  <div className={`w-10 h-10 rounded-full flex-center ${
                    activity.type === 'Supply' ? 'bg-emerald-500/10' : 'bg-blue-500/10'
                  } animate-pulse-slow`}>
                    <span className={`text-lg font-medium ${
                      activity.type === 'Supply' ? 'text-emerald-400' : 'text-blue-400'
                    }`}>
                      {activity.type === 'Supply' ? '↑' : '↓'}
                    </span>
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