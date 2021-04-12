import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from "moment";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Trainings() {
  const [trainings, setTrainings] = useState([]);
 
  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  const columns = [
    { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
    { headerName: 'Date', field: 'date', sortable: true, filter: true, 

    cellRendererFramework: params => {
          return moment(params.value).format("DD.MM.yyyy HH:mm")
        } 
 
      }, 
    { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true },
    { headerName: 'First Name', field: 'customer.firstname', sortable: true, filter: true},
    { headerName: 'Last Name', field: 'customer.lastname', sortable: true, filter: true },      
  ]
 


  return (
    <div className="Trainings">

        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
          <AgGridReact
            defaultColDef={{
              flex: 1,
              minWidth: 150,
              filter: true,
              sortable: true,
              floatingFilter: true,
            }}                     
            rowData={trainings}
            columnDefs={columns}
            animateRows={true}
            pagination={true}
            paginationPageSize={5}
            // poistetaan solujen valinta
            suppressCellSelection={true}
          />
        </div>      
    </div>
  );
  
}

export default Trainings;