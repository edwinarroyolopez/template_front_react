import React, { useState, useEffect, forwardRef } from "react";

import { ThemeProvider, Grid, Card, CardHeader } from "@material-ui/core";
import theme2 from "../../assets/theme/themeconfig";
import StoreIcon from "@material-ui/icons/Store";
import { purple } from "@material-ui/core/colors";

import Avatar from "react-avatar";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const tableIcons = {
  Add: forwardRef((props: any, ref: any) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props: any, ref: any) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props: any, ref: any) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props: any, ref: any) => (
    <SaveAlt {...props} ref={ref} />
  )),
  Filter: forwardRef((props: any, ref: any) => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props: any, ref: any) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props: any, ref: any) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props: any, ref: any) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props: any, ref: any) => (
    <Clear {...props} ref={ref} />
  )),
  Search: forwardRef((props: any, ref: any) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props: any, ref: any) => (
    <ArrowDownward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props: any, ref: any) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props: any, ref: any) => (
    <ViewColumn {...props} ref={ref} />
  )),
};

const api = axios.create({
  baseURL: `https://reqres.in/api`,
});

function validateEmail(email: any) {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

const Products = () => {
  useEffect(() => {
    try {
      (async function () {
        try {
          console.log("Aqui api de carga!");
        } catch (error) {
          console.log({ error });
        }
      })();
    } catch (error) {
      console.error(error);
    }
  });

  var columns = [
    { title: "Id", field: "id", hidden: true },
    
    { title: "Nombre", field: "first_name" },
    { title: "SKU", field: "last_name" },
    { title: "Descripcion", field: "first_name" },
    { title: "valor", field: "last_name" },
    { title: "TiendaId", field: "first_name" },
    { title: "Imagen", field: "last_name" },
  ];


/*
    ID
    Nombre 
    FechaApertura
*/

  const [data, setData]: any = useState([]); //table data

  //for error handling
  const [iserror, setIserror]: any = useState(false);
  const [errorMessages, setErrorMessages]: any = useState([]);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const handleRowUpdate = (newData: any, oldData: any, resolve: any) => {
    //validation
    let errorList = [];
    if (newData.first_name === "") {
      errorList.push("Please enter first name");
    }
    if (newData.last_name === "") {
      errorList.push("Please enter last name");
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }

    if (errorList.length < 1) {
      api
        .patch("/users/" + newData.id, newData)
        .then((res) => {
          const dataUpdate: any = [...data];
          const index: any = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData: any, resolve: any) => {
    //validation
    let errorList = [];
    if (newData.first_name === undefined) {
      errorList.push("Please enter first name");
    }
    if (newData.last_name === undefined) {
      errorList.push("Please enter last name");
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }

    if (errorList.length < 1) {
      //no error
      api
        .post("/users", newData)
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData: any, resolve: any) => {
    api
      .delete("/users/" + oldData.id)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <>
      <br />
      <br />
      <ThemeProvider theme={theme2}>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <Grid>
                <CardHeader
                  style={{ background: purple[50] }}
                  avatar={<StoreIcon aria-label=""></StoreIcon>}
                  title="Productos"
                  subheader="Listado de los productos"
                />
              </Grid>
            </Card>
            <br />
            <Card elevation={3}>
              <div id="container-store" className="">

                  <Grid container spacing={1}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={10}>
                      <div>
                        {iserror && (
                          <Alert severity="error">
                            {errorMessages.map((msg: any, i: any) => {
                              return <div key={i}>{msg}</div>;
                            })}
                          </Alert>
                        )}
                      </div>
                      <MaterialTable
                        title="Tiendas"
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        editable={{
                          onRowUpdate: (newData: any, oldData: any) =>
                            new Promise((resolve) => {
                              handleRowUpdate(newData, oldData, resolve);
                            }),
                          onRowAdd: (newData: any) =>
                            new Promise((resolve) => {
                              handleRowAdd(newData, resolve);
                            }),
                          onRowDelete: (oldData: any) =>
                            new Promise((resolve) => {
                              handleRowDelete(oldData, resolve);
                            }),
                        }}
                      />
                    </Grid>
                    <Grid item xs={1}></Grid>
                  </Grid>
                </div>

              <br />
              <br />
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Products;
