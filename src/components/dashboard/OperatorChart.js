import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const COLORS = {
  'MTN Money': '#FFC107',
  'Moov Money': '#FF6B00',
  'Celtis': '#00C2FF',
  'Coris Money': '#FFB800',
  'Orange Money': '#FF8B00',
  'Wave': '#50C878',
  'Nigeria Money': '#008751',
  'Togocom Money': '#00B4D8',
  'Free Money': '#FF0000',
};

const OperatorChart = ({operatorStats}) => {
  const isLoading = !operatorStats || operatorStats.length === 0;

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-[20px] shadow-sm border border-gray animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="flex items-center justify-center h-[300px]">
          <div className="w-full h-full bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const operatorData = [
    { pays: 'Bénin', 'Moov Money': operatorStats?.moov, 'Celtis': operatorStats?.celtiis_benin, 'Coris Money': operatorStats?.coris_benin, 'MTN Money': operatorStats?.mtn },
    { pays: 'Burkina-Faso', 'Moov Money': operatorStats?.moov_burkina,  'Orange Money': operatorStats?.orange_burkina },
    { pays:"Côte d'ivoire", 'Moov Money': operatorStats?.moov_ci, 'MTN Money': operatorStats?.mtn_ci, 'Orange Money': operatorStats?.orange_ci, 'Wave': operatorStats?.wave_ci },
    // { pays: 'Congo Brazzaville', 'MTN Money': 0 },
    // { pays: 'Cameroun', 'Orange Money': 46, 'MTN Money': 0 },
    // { pays: 'Nigeria', 'Nigeria Money': 100 },
    { pays: 'Sénégal', 'Orange Money': operatorStats?.orange_senegal, 'Free Money': operatorStats?.free_senegal, 'MTN Money': operatorStats?.mtn_senegal },
    { pays: 'Togo', 'Moov Money': operatorStats?.moov_togo, 'Togocom Money': operatorStats?.togocom},
  ];

  return (
    <div className="bg-white p-4 rounded-[20px] shadow-sm border border-primary">
      <h2 className="text-lg font-semibold mb-4">Répartition par opérateur</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={operatorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="pays" 
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]} 
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
            />
            {Object.keys(COLORS).map((operator) => (
              <Line
                key={operator}
                type="monotone"
                dataKey={operator}
                stroke={COLORS[operator]}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OperatorChart;