
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TermSheetResults } from '../utils/calculationLogic';

interface EquityVisualizationProps {
  results: TermSheetResults | null;
}

const EquityVisualization: React.FC<EquityVisualizationProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="bg-white rounded-lg shadow p-4 h-80 flex items-center justify-center">
        <p className="text-gray-500 italic">Enter values and calculate to see equity visualization</p>
      </div>
    );
  }

  const data = [
    { name: 'Founders', value: results.foundersEquityPercentage },
    { name: 'Investors', value: results.investorEquityPercentage },
    { name: 'ESOP Pool', value: results.esopEquityPercentage },
  ];

  // Custom colors that match our color scheme
  const COLORS = ['#245e4f', '#e9c46a', '#7ac9a7'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#ffffff" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 h-80">
      <h3 className="text-xl font-semibold text-primary mb-4 text-center">Equity Distribution</h3>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1000}
            animationBegin={200}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquityVisualization;
