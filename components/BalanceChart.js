
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { coins } from '../static/coin';

const BalanceChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan'];
    const total = coins.reduce((sum, coin) => sum + coin.balanceUsd, 0);
    setTotalBalance(total);
    
    const balanceHistory = months.map(() => total * (0.9 + Math.random() * 0.2));

    setChartData({
      labels: months,
      datasets: [
        {
          label: 'Portfolio Balance',
          data: balanceHistory,
          borderColor: '#3773f5',
          backgroundColor: '#3773f5',
          pointBorderColor: '#3773f5',
          pointBackgroundColor: '#3773f5',
          pointRadius: 4,
          lineTension: 0.2,
        },
      ],
    });
  }, []);

  return (
    <Wrapper>
      <Line
        data={chartData}
        options={{
          plugins: {
            legend: { display: false },
          },
        }}
        width={400}
        height={150}
      />
    </Wrapper>
  );
};

export default BalanceChart;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

