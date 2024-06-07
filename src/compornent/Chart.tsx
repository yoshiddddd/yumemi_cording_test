import { ComposedChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { PopulationCompositionWithLabel } from '../types/type';
type ChartProps = {
    selectedPrefectures: number[];
    prefectures: { prefCode: number; prefName: string }[];
    showPrefectureData: PopulationCompositionWithLabel[][];
    selectedKey: number;
}



export const Chart = (props: ChartProps) => {
    const { selectedPrefectures, prefectures, showPrefectureData, selectedKey} = props;
    const combinedData = showPrefectureData[0]&&showPrefectureData[0][selectedKey].data.map((item, index) => {
        const newItem: { [key: string]: number } = { year: item.year };
        showPrefectureData.forEach((dataArray, dataIndex) => {
          newItem[`value${dataIndex}`] = dataArray[selectedKey].data[index]?.value || 0;
        });
        return newItem;
      });

    return(
        <div className="chart-container">
    <ComposedChart
    width={1400}
    height={400}
      className='composed-chart'
    data={combinedData}
    >
      <XAxis dataKey="year" />
      <YAxis width={100} />
      <Tooltip />
      <Legend />
      {showPrefectureData.map((_, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey={`value${index}`}
          name={prefectures.find(p => p.prefCode === selectedPrefectures[index])?.prefName || `Series ${index + 1}`} // シリーズ名を追加
          stroke={`hsl(${index * 40}, 70%, 50%)`} // 線の色を動的に設定（オプション）
        />
      ))}
    </ComposedChart>
    </div>

    )

}