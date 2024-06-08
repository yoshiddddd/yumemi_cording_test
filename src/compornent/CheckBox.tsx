import {Prefecture} from '../types/type';
import {CheckBoxProps} from '../types/type';
import { regions } from '../types/utils';
import '../style/CheckBox.css';

  export const CheckBox = (props: CheckBoxProps) => {
    const { prefectures, handleCheckbox } = props;
  
    const getRegionName = (prefCode: number) => {
      for (const [region, codes] of Object.entries(regions)) {
        if (codes.includes(prefCode)) {
          return region;
        }
      }
      return '';
    };
  
    const groupedPrefectures = prefectures.reduce((acc, prefecture) => {
      const regionName = getRegionName(prefecture.prefCode);
      if (!acc[regionName]) {
        acc[regionName] = [];
      }
      acc[regionName].push(prefecture);
      return acc;
    }, {} as { [key: string]: Prefecture[] });
  
    return (
      <>
        {prefectures.length > 0 ? (
          <div className="checkbox-container">
            {Object.entries(groupedPrefectures).map(([region, prefs]) => (
              <div key={region} className="region-group">
                <h3>{region}</h3>
                {prefs.map((prefecture) => (
                  <div key={prefecture.prefCode} className="checkbox-item">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        name="prefecture"
                        value={prefecture.prefCode}
                        onChange={() => handleCheckbox(prefecture.prefCode)}
                      />
                      {prefecture.prefName}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  };

// export const CheckBox = (props: CheckBoxProps) => {

//    const  {prefectures,handleCheckbox } = props;
//     return(
//         <>
//                 {prefectures.length > 0 ? (
//                   <div className="checkbox-container">
//                     {prefectures.map((prefecture) => (
//                       <div key={prefecture.prefCode} className='checkbox-item'>
//                         <label>
//                           <input type="checkbox" className='checkbox' name="prefecture" value={prefecture.prefCode} onChange={()=> handleCheckbox(prefecture.prefCode)}/>
//                           {prefecture.prefName}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div>Loading...</div>
//                 )}
//     </>
//     );
// }