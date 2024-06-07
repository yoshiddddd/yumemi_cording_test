export type Prefecture = {
    prefCode: number;
    prefName: string;
  };
  export type PopulationCompositionWithLabel = {
    label: string;
    data: {
        year: number;
        value: number;
    }[];
};

export type ChartProps = {
    selectedPrefectures: number[];
    prefectures: { prefCode: number; prefName: string }[];
    showPrefectureData: PopulationCompositionWithLabel[][];
    selectedKey: number;
}

export type CheckBoxProps = {
    prefectures: Prefecture[];
    handleCheckbox: (prefCode: number) => void;
  };


export type SelectPopulationProps = {
    selectedKey: number;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { [key: number]: string };

}