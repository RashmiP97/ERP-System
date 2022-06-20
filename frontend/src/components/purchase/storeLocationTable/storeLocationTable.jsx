
import "../table.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const userColumns = [
  { field: "SSLID", headerName: "Supplier Location ID" },
  { field: "SID", headerName: "Supplier ID" },
  { field: "no", headerName: "No" },
  { field: "street", headerName: "Street" },
  { field: "town", headerName: "Town" },
  { field: "country", headerName: "Country" },
  
  
];

const Datatable = (props) => {
  const SID = props.SID;
  const [data, setData] = useState({});

 

  useEffect(() => {
    axios
      .get("http://localhost:5000/purchase/supplier/storeLocation/getAll/" + SID, {
        withCredentials: true,
        credentials: "include",
      })
      
      .then((res) => {
       
        let dt = res.data.map((d) => {
          return {
            id: d.SSLID,
           
            ...d,
          };
        });
        setData(dt);
        
      });

      
  }, [""]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const upLink = "/purchase/product/updatecat/"+params.row.catID;
        return (
          <div className="cellAction">
            <Link to= {upLink} style= {{textDecoration : "none"}}>
              <div className="viewButton">Delete</div>
              </Link>
            
          </div>
        );
      },
    },
  ];


  
  return (
    <div className="datatable">
      <div className="datatableTitle1">
        All Store Locations For Supplier (SID-{SID})
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
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

export default Datatable;
