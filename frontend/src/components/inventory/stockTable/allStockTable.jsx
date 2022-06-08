import "../table.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const userColumns = [
  { field: "ID", headerName: "ID",  width: 200},
  { field: "WID", headerName: "Warehouse ID",  width: 200},
  { field: "PID", headerName: "Product ID", width: 200 },
  { field: "qty", headerName: "Quantity", width: 200 },
  { field: "qualityLevel", headerName: "Quality Level", width: 200 },

];

const AllStockTable = (props) => {
  const [data, setData] = useState({});
  // console.log("props",props);

  useEffect(() => {
    axios
      .get("http://localhost:5000/inventory/stockLevel/getAll/", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        let dt = res.data.map((d) => {
          return { id: d.ID, ...d };
        });
        setData(dt);
        // console.log(dt);
      });
  }, [""]);

 
 /* const actionColumn = [
    {
      headerName: "Change Quality Level",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/inventory/warehouse/changeQualityLevel" style={{ textDecoration: "none" }}>
              <div className="viewButton">Change</div>
            </Link>
          </div>
        );
      },
    },
  ];*/
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Stock Details
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
};

export default AllStockTable;