import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export function MetricCard({ icon: Icon, title, value, change, changeType = 'neutral' }: MetricCardProps) {
  const changeColors = {
    positive: 'text-green-500',
    negative: 'text-red-500',
    neutral: 'text-slate-500',
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-600/10 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-1">{value}</h3>
        <p className="text-base text-slate-400 mb-2">{title}</p>
        {change && (
          <p className={`text-sm ${changeColors[changeType]}`}>{change}</p>
        )}
      </CardContent>
    </Card>
  );
}
