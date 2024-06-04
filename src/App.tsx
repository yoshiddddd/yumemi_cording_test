import React ,{useEffect, useState}from 'react';
import logo from './logo.svg';
import './App.css';
type Prefecture = {
    prefCode: number;
    prefName: string;
  };
function App() {
    const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
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
          }
        };
        fetchPrefectures();
      }, []);
  return (
                // console.log(prefecture.prefName)
                <>
                {prefectures.length > 0 ? (
                  <div className="checkbox-container">
                    {prefectures.map((prefecture) => (
                      <div key={prefecture.prefCode} className='checkbox-item'>
                        <label>
                          <input type="checkbox" name="prefecture" value={prefecture.prefCode} />
                          {prefecture.prefName}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </>
  );
}

export default App;
