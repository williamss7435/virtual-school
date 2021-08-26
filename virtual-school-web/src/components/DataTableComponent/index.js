import MUIDataTable from "mui-datatables";

export default function DataTableComponent({title, data, columns, options}){
    return (
        <MUIDataTable
                title={title}
                data={data}
                columns={columns}
                options={options}
        />
    );
}