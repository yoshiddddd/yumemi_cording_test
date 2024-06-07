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