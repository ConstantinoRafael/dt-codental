import React from "react";
import { TablePagination } from "@mui/material";

interface ClientesPaginationProps {
  count: number;
  rowsPerPage: number;
  page: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (value: number) => void;
}

const ClientesPagination: React.FC<ClientesPaginationProps> = ({
  count,
  rowsPerPage,
  page,
  onChangePage,
  onChangeRowsPerPage,
}) => (
  <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={count}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={(event, newPage) => onChangePage(newPage)}
    onRowsPerPageChange={(event) =>
      onChangeRowsPerPage(parseInt(event.target.value, 10))
    }
  />
);

export default ClientesPagination;
