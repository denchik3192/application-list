import React, { JSX } from "react";
import DataTable from "../components/dataTable";
import StoreProvider from "../storeProvider";

function Applications(): JSX.Element {
  return (
    <>
      <StoreProvider>
        <DataTable />;
      </StoreProvider>
    </>
  );
}

export default Applications;
