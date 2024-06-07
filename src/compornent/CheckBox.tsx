import {Prefecture} from '../types/type';
import {CheckBoxProps} from '../types/type';


export const CheckBox = (props: CheckBoxProps) => {

   const  {prefectures,handleCheckbox } = props;
    return(
        <>
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
    </>
    );
}