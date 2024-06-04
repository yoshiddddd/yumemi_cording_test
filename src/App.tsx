import React ,{useEffect, useState}from 'react';
import logo from './logo.svg';
import './App.css';
import { Area, ComposedChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
type Prefecture = {
    prefCode: number;
    prefName: string;
  };
  type prefectureData = {
    year: number;
    value: number;

  };
function App() {
    const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
    const [composition, setComposition] = useState<any[]>([]);
    const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
    const [prefectureData, setPrefectureData] = useState<Record<number,prefectureData[]>>({});
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
    }, []);

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
            // setComposition(data.result.data);
        }catch(e){
            console.error(e);
        }
    }

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
        const data= await fetchComposition(prefCode);
        if(!( prefCode in prefectureData)){        
            setPrefectureData(prev =>{
                return {...prev, [prefCode]: data};
            }
            );
        }
    }
    return (
        // console.log(prefecture.prefName)
        <>
        {
            console.log(prefectureData)
        }
                {prefectures.length > 0 ? (
                  <div className="checkbox-container">
                    {prefectures.map((prefecture) => (
                      <div key={prefecture.prefCode} className='checkbox-item'>
                        <label>
                          <input type="checkbox" name="prefecture" value={prefecture.prefCode} onChange={()=> handleCheckbox(prefecture.prefCode)}/>
                          {prefecture.prefName}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>Loading...</div>
                )}

        {/* {prefectureData.map((data, index) => (
            <ComposedChart
            key={index}
            width={1200}
            height={250}
            data={data[0].data}
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
        {/* <ComposedChart
            width={1200}
            height={250}
            data={prefectureData}
            >
        <XAxis
        dataKey={'year'}
        type="category"
        // ticks={allYears}
        />
        <YAxis/>
        <Tooltip/>
        <Line //面積を表すグラフ
            // type="monotone"  //グラフが曲線を描くように指定。default値は折れ線グラフ
            dataKey="value" //Array型のデータの、Y軸に表示したい値のキーを指定
            // stroke="#00aced" ////グラフの線の色を指定
            // fillOpacity={1}  ////グラフの中身の薄さを指定
            // fill="rgba(0, 172, 237, 0.2)"  //グラフの色を指定
        />
        </ComposedChart> */}
        </>
  );
}

export default App;
