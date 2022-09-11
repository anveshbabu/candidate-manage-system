import { Pagination, Select, MenuItem,InputLabel,FormControl } from '@mui/material';
import './normalTable.scss'
export const NormalTable = (props) => {

    let {
        className = String,
        columnData = Array,
        rowData = Array,
        rowRender = Number,
        pageNo = Number | 1,
        rowsPerPage = Number | 25,
        count = Number | 0,
        onChangePagination = Function
    } = props;
    return (
        <div className='normalTable'>
            <table class={`table ${className}`}>
                <thead>
                    <tr>
                        {columnData.map((data) =>
                            <th >{data.label}</th>
                        )}


                    </tr>
                </thead>
                <tbody>
                    {!rowRender && rowData.map((data, i) =>
                        <tr>
                            {columnData.map((colDate) =>

                                colDate.key === 'index' ? <td>{i + 1}</td> : <td>{data[colDate.key]}</td>

                            )}


                        </tr>
                    )}


                    {rowRender(rowData)}
                </tbody>
            </table>
            {/* <div className='d-flex'>
            <FormControl size="small">
             <Select
                className='normal-table-pagination-select'

                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <Pagination className='normal-table-pagination' onChange={onChangePagination} count={(count / rowsPerPage)} />
            </div> */}
           
         
        </div>

    )


}