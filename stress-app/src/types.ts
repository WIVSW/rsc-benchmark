interface Line {
    runtime: string;
    renderType: string;
    name: string;
    color: string;
};

type Group = {
    group: string;
} & Partial<Record<string, string | number>>;


type ChartData = {
    lines: Line[];
    data: Group[];
};

export type {Line, Group, ChartData};