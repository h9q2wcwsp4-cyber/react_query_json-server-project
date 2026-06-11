import React from 'react'
import { useDashboard } from '../../store/hooks/useDashboard';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js"
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
    const { kpi, userRanking, productRanking } = useDashboard() || {};
    
    if (!kpi || !userRanking || !productRanking) {
        return <div>데이터 로딩 중...</div>;
    }
    
    const userChartData = {
        labels: userRanking.map(item => item.name || 'unknown'),
        datasets: [
            {
                label: "구매 건수",
                data: userRanking.map(item => item.count || 0)
            }
        ]
    }
    
    const productChartData = {
        labels: productRanking.map(item => item.name || 'unknown'),
        datasets: [
            {
                label: "판매 수량",
                data: productRanking.map(item => item.quantity || 0)
            }
        ]
    }
    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
            legend: {
                position: "top"
            }
        }
    }
    
    return (
        <div>
          <div>
            <div>
                <div>총 매출액</div>
                <div>{(kpi.totalSalesAmount || 0).toLocaleString()}원</div>
            </div>
            <div>
                <div>총 판매수량</div>
                <div>{(kpi.totalQuantity || 0).toLocaleString()}개</div>
            </div>
            <div>
                <div>총 주문건수</div>
                <div>{(kpi.totalOrderCount || 0).toLocaleString()}개</div>
            </div>
            <div>
                <div>총 고객 수</div>
                <div>{(kpi.customerCount || 0).toLocaleString()}명</div>
            </div>
            <div>
                <div>총 상품 수</div>
                <div>{(kpi.productCount || 0).toLocaleString()}개</div>
            </div>
          </div>
          <div>
            <div>
                <div>고객 구매 랭킹 TOP 10</div>
                <div style={{ height: '300px' }}>
                    <Bar data={userChartData} options={chartOptions}/>
                </div>
                <div></div>
                <div style={{ height: '300px' }}>
                    <Bar data={userChartData} options={chartOptions}/>
                </div>
            </div>
             <div>
                <div>상품 판매 랭킹 TOP 10</div>
                <div style={{ height: '300px' }}>
                    <Bar data={productChartData} options={chartOptions}/>
                </div>
            </div>
          </div>
        </div>
    )
}

export default Dashboard