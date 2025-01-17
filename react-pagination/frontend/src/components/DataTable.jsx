import React, { useState, useEffect } from "react";
import { useTable, usePagination, flexRender } from "react-table";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [limit, setLimit] = useState(10);

  const fetchData = async ({ pageIndex, search, limit }) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/users?page=${
          pageIndex + 1
        }&limit=${limit}&search=${search}`
      );
      setData(response.data.users);
      setPageCount(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData({ pageIndex, search, limit });
  }, [pageIndex, search, limit]);

  const columns = React.useMemo(
    () => [
      {
        id: 1,
        Header: "ID",
        accessor: "id",
      },
      {
        id: 2,
        Header: "Name",
        accessor: "name",
      },
      {
        id: 3,
        Header: "Email",
        accessor: "email",
      },
      {
        id: 4,
        Header: "Actions",
        accessorKey: "name",
        Cell: ({ row }) => (
          <div>
            <button
              className={`px-3 py-1 rounded border border-green-600 bg-green-100`}
              onClick={() => {}}
            >
              Edit
            </button>
            &nbsp;
            <button
              className={`px-3 py-1 rounded border border-red-600 bg-red-100`}
              onClick={() => {}}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    gotoPage,
    state: { pageIndex: tablePageIndex },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount,
      initialState: { pageIndex },
    },
    usePagination
  );

  // Handle search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPageIndex(0);
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Table with Search, Limit, and Pagination
        </h1>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
          <select
            className="border border-gray-300 rounded px-4 py-2 ml-4"
            value={limit}
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num} per page
              </option>
            ))}
          </select>
        </div>

        <table
          className="w-full border-collapse border border-gray-300"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                className="bg-gray-200"
                key={headerGroup.id}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    className="border border-gray-300 px-4 py-2"
                    {...column.getHeaderProps()}
                    key={column.id}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {loading ? (
              <tr className="hover:bg-gray-100">
                <td colSpan={columns.length}>Loading...</td>
              </tr>
            ) : rows.length > 0 ? (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className="hover:bg-gray-100"
                    key={row.id}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => (
                      <td
                        key={cell.id}
                        {...cell.getCellProps()}
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center mb-4">
          <div>
            <button
              className={`px-3 py-1 rounded border border-gray-300`}
              onClick={() => {
                setPageIndex(pageIndex - 1);
                previousPage();
              }}
              disabled={!canPreviousPage}
            >
              Previous
            </button>
            <span className="mx-2 my-2">
              Page {tablePageIndex + 1} of {pageOptions.length}
            </span>
            <button
              className={`px-3  py-1 rounded border border-gray-300`}
              onClick={() => {
                setPageIndex(pageIndex + 1);
                nextPage();
              }}
              disabled={!canNextPage}
            >
              Next
            </button>
          </div>
          <div className="mt-2">
            <span>
              <input
                type="number"
                className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
                defaultValue={tablePageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                  setPageIndex(page);
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
