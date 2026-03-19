import React from "react";
import DataTable from "react-data-table-component";
import type { TableColumn } from "react-data-table-component";

export type IFDRow = {
  duration_minutes: number;
  values_mm_per_hr: {
    [key: string]: string;
  };
};

type Props = {
  columns: TableColumn<IFDRow>[];
  data: IFDRow[];
  loading: boolean;
};

const IFDDataTable: React.FC<Props> = ({
  columns,
  data,
  loading,
}) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      highlightOnHover
      striped
      responsive
      fixedHeader
      fixedHeaderScrollHeight="400px"
    />
  );
};

export default IFDDataTable;