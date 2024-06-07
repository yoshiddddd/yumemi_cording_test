
type SelectPopulationProps = {
    selectedKey: number;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { [key: number]: string };

}


export const SelectPopulation = (props: SelectPopulationProps) => {
    const {selectedKey, handleChange, options} = props;
    return(
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

    );
}