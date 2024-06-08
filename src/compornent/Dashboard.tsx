import React ,{useEffect, useState}from 'react';
// import '../App.css';
import '../style/Dashboard.css';
import { CheckBox } from './CheckBox';
import { SelectPopulation } from './SelectPopulation';
import { Chart } from './Chart';
import { Prefecture, PopulationCompositionWithLabel } from '../types/type';
import { options } from '../types/utils';

export const Dashboard = () => {
    const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
    const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
    const [prefectureData, setPrefectureData] = useState<Record<number,PopulationCompositionWithLabel[]>>({});
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const [showPrefectureData, setShowPrefectureData] = useState<PopulationCompositionWithLabel[][]>([]);
    const [Loading, setLoading] = useState<boolean>(true);
    const API_KEY = process.env.REACT_APP_RESAS_API_KEY

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
        console.log(newShowPrefectureData);
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


    return (
        <>
        <header>人口推移グラフ</header>
        <h2>都道府県を選択</h2>
        <CheckBox prefectures={prefectures} handleCheckbox={handleCheckbox} />
        <SelectPopulation selectedKey={selectedKey} handleChange={handleChange} options={options} />
        <Chart selectedPrefectures={selectedPrefectures} prefectures={prefectures} showPrefectureData={showPrefectureData} selectedKey={selectedKey}/>
        </>
  );
}