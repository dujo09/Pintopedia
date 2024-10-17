import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import React, { useEffect, useState, useMemo } from "react";

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function EnhancedTableHead(props) {
  const { headCells, order, orderBy, rowCount, onRequestSort, columnWidths } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            style={
              headCell.flexGrow
                ? {
                    flexGrow: headCell.flexGrow,
                    minWidth: `${columnWidths[headCell.id] || 100}px`,
                  }
                : { width: `${columnWidths[headCell.id] || 100}px` }
            }
            key={String(headCell.id)}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function SharedTable({
  rows,
  headCells,
  selectedItem,
  onRowSelect,
}) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [selected, setSelected] = useState(-1);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [columnWidths, setColumnWidths] = useState({});

  function calculateColumnWidths(rows) {
    const maxWidth = 500;
    const minWidth = 80;
    const scaleFactor = 6;
    const columnWidths = {};

    headCells.forEach((headCell) => {
      const cellLabelCharacterCount = String(headCell.label).length + 10;
      const cellWidth = Math.min(
        maxWidth,
        Math.max(minWidth, cellLabelCharacterCount * scaleFactor),
      );
      columnWidths[headCell.id] = cellWidth;
    });

    rows.forEach((row) => {
      headCells.forEach((headCell) => {
        const cellCharacterCount = String(row[headCell.id]).length;
        const cellWidth = Math.min(
          maxWidth,
          Math.max(minWidth, cellCharacterCount * scaleFactor),
        );
        if (!columnWidths[headCell.id]) {
          columnWidths[headCell.id] = cellWidth;
        } else if (
          columnWidths[headCell.id] !== undefined &&
          columnWidths[headCell.id] < cellWidth
        ) {
          columnWidths[headCell.id] = cellWidth;
        }
      });
    });
    return columnWidths;
  }

  useEffect(() => {
    setColumnWidths(calculateColumnWidths(rows));
  }, [rows, order]);

  useEffect(() => {
    setSelected(selectedItem?.id || -1);
  }, [selectedItem]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(0);
  };

  const handleClick = (event, row) => {
    let newSelected;
    if (selected === row.id) newSelected = -1;
    else newSelected = row.id;

    setSelected(newSelected);
    onRowSelect(newSelected !== -1 ? row : null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected === id;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      rows
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <>
      <div className="shared-table-container">
        <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
          <EnhancedTableHead
            headCells={headCells}
            order={order}
            columnWidths={columnWidths}
            orderBy={String(orderBy)}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              // const labelId = enhanced - table - checkbox - ${index};
              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  {headCells.map((headCell, indexCell) => (
                    <TableCell
                      align={headCell.numeric ? "right" : "left"}
                      key={`shared-table-row-${index}-cell-${String(headCell.id)}`}
                      padding="normal"
                      scope="row"
                      component="th"
                    >
                      {String(row[headCell.id])}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        className="shared-table-pagination"
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
