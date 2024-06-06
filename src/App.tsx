import React ,{useEffect, useState}from 'react';
import logo from './logo.svg';
import './App.css';
import { Area, ComposedChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { Legend } from 'recharts';
type Prefecture = {
    prefCode: number;
    prefName: string;
  };
  type PopulationCompositionWithLabel = {
    label: string;
    data: {
        year: number;
        value: number;
    }[];
};

function App() {
    const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
    const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
    const [prefectureData, setPrefectureData] = useState<Record<number,PopulationCompositionWithLabel[]>>({});
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const [showPrefectureData, setShowPrefectureData] = useState<PopulationCompositionWithLabel[][]>([]);
    const [Loading, setLoading] = useState<boolean>(true);
    const API_KEY = process.env.REACT_APP_RESAS_API_KEY
    useEffect(() => {

    }, [selectedPrefectures]);
    useEffect(() => {
        const fetchPrefectures = async () => {
          try {
            const response = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY || ''
              } as HeadersInit // ここで型アサーションを追加
            });
            const data = await response.json();
            setPrefectures(data.result);
          } catch (e) {
            console.error(e);
          }finally{
            setLoading(false);
      }
        };
        fetchPrefectures();
        // fetchComposition();
    }, [API_KEY]);

    const fetchComposition = async (prefCode: number) => {
        try{
            const response = await fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': API_KEY || ''
                } as HeadersInit
            });
            const data = await response.json();
            return data.result.data;
        }catch(e){
            console.error(e);
        }
    }
    useEffect(() => {
        const newShowPrefectureData = selectedPrefectures.map(prefCode => prefectureData[prefCode]).filter(Boolean);
        setShowPrefectureData(newShowPrefectureData);
        // console.log(newShowPrefectureData);
    }, [prefectureData,selectedPrefectures]); 


    if(Loading){
        return <div>Loading...</div>
    }

    const handleCheckbox = async (prefCode: number) => {
        setSelectedPrefectures(prev => {
            if(prev.includes(prefCode)){
                return prev.filter(p => p !== prefCode);
            }else{
                return [...prev, prefCode];
            }
        });
        if(!( prefCode in prefectureData)){        
            const data= await fetchComposition(prefCode);
            setPrefectureData(prev =>{
                return {...prev, [prefCode]: data};
            }
            );
        }

    }
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const key = parseInt(event.target.value, 10);
            setSelectedKey(key);
          };
      const options: { [key: number]: string } = {
        0: '総人口',
        1: '年少人口',
        2: '生産年齢人口',
        3: '老年人口',
      };
      const combinedData = showPrefectureData[0]&&showPrefectureData[0][selectedKey].data.map((item, index) => {
        const newItem: { [key: string]: number } = { year: item.year };
        showPrefectureData.forEach((dataArray, dataIndex) => {
          newItem[`value${dataIndex}`] = dataArray[selectedKey].data[index]?.value || 0;
        });
        return newItem;
      });

    return (
        <>
        {console.log(showPrefectureData)}
                {prefectures.length > 0 ? (
                  <div className="checkbox-container">
                    {prefectures.map((prefecture) => (
                      <div key={prefecture.prefCode} className='checkbox-item'>
                        <label>
                          <input type="checkbox" className='checkbox' name="prefecture" value={prefecture.prefCode} onChange={()=> handleCheckbox(prefecture.prefCode)}/>
                          {prefecture.prefName}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>Loading...</div>
                )}

<div>
      <label htmlFor="population-dropdown">人口区分: </label>
      <select
        id="population-dropdown"
        value={selectedKey}
        onChange={handleChange}
        className='population-dropdown'
      >
        {Object.entries(options).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      <p>選択された区分: {options[selectedKey]}</p>
    </div>



    <ComposedChart
      width={1200}
      height={400}
      className='composed-chart'
    //   data={showPrefectureData[0]&&showPrefectureData[0][selectedKey].data}
    data={combinedData}
    >
      <XAxis dataKey="year" />
      <YAxis />
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




        {/* {showPrefectureData.map((data, index) => (
            <ComposedChart
            key={index}
            width={1200}
            height={250}
            data={data[selectedKey].data}
            >
            <XAxis
            dataKey={'year'}
            type="category"
            />
            <YAxis/>
            <Tooltip/>
            <Line //面積を表すグラフ
                dataKey="value" //Array型のデータの、Y軸に表示したい値のキーを指定
            />
            </ComposedChart>
        ))} */}
        </>
  );
}

export default App;
