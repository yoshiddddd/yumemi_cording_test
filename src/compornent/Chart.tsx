import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {ChartProps} from '../types/type';
import '../style/Chart.css';
export const Chart = (props: ChartProps) => {
    const { selectedPrefectures, prefectures, showPrefectureData, selectedKey} = props;
    const combinedData = showPrefectureData[0]&&showPrefectureData[0][selectedKey].data.map((item, index) => {
        const newItem: { [key: string]: number } = { year: item.year };
        showPrefectureData.forEach((dataArray, dataIndex) => {
          newItem[`value${dataIndex}`] = dataArray[selectedKey].data[index]?.value || 0;
        });
        return newItem;
      });

    if(!combinedData){
        return <div className='not-select-prefecture'>都道府県を選択してください。</div>
    }
    return(
        <div className="chart-container">
    <ComposedChart
    width={1200}
    height={400}
      className='composed-chart'
    data={combinedData}
    >
      <XAxis dataKey="year" label={{ value: '年度', position: 'insideBottomRight', offset: -5 }} />
      <YAxis width={100} label={{ value: '人口数', angle: -90, position: 'insideLeft' }}  />
      <Tooltip />
      <Legend />
      {showPrefectureData.map((_, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey={`value${index}`}
          name={prefectures.find(p => p.prefCode === selectedPrefectures[index])?.prefName || `Series ${index + 1}`} // シリーズ名を追加
          stroke={`hsl(${index * 40}, 70%, 50%)`} 
        />
      ))}
    </ComposedChart>
    </div>

    )

}