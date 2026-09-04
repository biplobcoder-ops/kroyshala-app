import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Table = ({
  // --------------------------------
  // Data
  // --------------------------------
  columns = [],
  data = [],
  rowKey = "id",

  // --------------------------------
  // Appearance
  // --------------------------------
  variant = "default",
  size = "md",

  // --------------------------------
  // Behavior
  // --------------------------------
  hoverable = true,
  stickyHeader = false,

  // --------------------------------
  // Row
  // --------------------------------
  onRowClick,
  isRowDisabled,

  // --------------------------------
  // Actions
  // --------------------------------
  onAction,

  // --------------------------------
  // Selection
  // --------------------------------
  selectable = false,
  selectedRowKeys,
  defaultSelectedRowKeys = [],
  onSelectionChange,

  // --------------------------------
  // Sorting
  // --------------------------------
  sortable = false,
  sortBy,
  defaultSortBy = null,
  onSortChange,

  // --------------------------------
  // Loading / Empty
  // --------------------------------
  loading = false,
  loadingMessage = "Loading data...",
  emptyMessage = "No data found.",

  // --------------------------------
  // Custom classes
  // --------------------------------
  className = "",
  tableClassName = "",
  headerClassName = "",
  headerCellClassName = "",
  bodyClassName = "",
  rowClassName = "",
  cellClassName = "",
  emptyClassName = "",
  loadingClassName = "",

  ...props
}) => {
  // --------------------------------
  // Selection
  // --------------------------------

  const [internalSelectedKeys, setInternalSelectedKeys] =
    useState(defaultSelectedRowKeys);

  const isSelectionControlled =
    selectedRowKeys !== undefined;

  const currentSelectedKeys =
    isSelectionControlled
      ? selectedRowKeys
      : internalSelectedKeys;

  // --------------------------------
  // Sorting
  // --------------------------------

  const [internalSort, setInternalSort] =
    useState(defaultSortBy);

  const isSortControlled =
    sortBy !== undefined;

  const currentSort =
    isSortControlled
      ? sortBy
      : internalSort;

  // --------------------------------
  // Select all ref
  // --------------------------------

  const selectAllRef = useRef(null);

  // --------------------------------
  // Sizes
  // --------------------------------

  const sizes = {
    sm: {
      header:
        "px-3 py-2.5 text-xs",

      cell:
        "px-3 py-2.5 text-xs",

      checkbox:
        "h-3.5 w-3.5",
    },

    md: {
      header:
        "px-4 py-3 text-xs",

      cell:
        "px-4 py-3.5 text-sm",

      checkbox:
        "h-4 w-4",
    },

    lg: {
      header:
        "px-5 py-4 text-sm",

      cell:
        "px-5 py-4 text-base",

      checkbox:
        "h-4 w-4",
    },
  };

  // --------------------------------
  // Variants
  // --------------------------------

  const variants = {
    // ==============================
    // 1. DEFAULT
    // ==============================

    default: {
      wrapper: `
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-sm
      `,

      table: "bg-white",

      header: `
        border-b
        border-slate-200
        bg-slate-50/80
        text-slate-500
      `,

      row: `
        border-b
        border-slate-100
        text-slate-700
      `,

      hover:
        "hover:bg-slate-50",

      selected:
        "bg-blue-50/70",

      disabled:
        "bg-slate-50/70",

      footer: `
        border-t
        border-slate-200
      `,
    },

    // ==============================
    // 2. MINIMAL
    // ==============================

    minimal: {
      wrapper: `
        bg-transparent
      `,

      table: "bg-transparent",

      header: `
        border-b
        border-slate-200
        bg-transparent
        text-slate-500
      `,

      row: `
        border-b
        border-slate-100
        text-slate-700
      `,

      hover:
        "hover:bg-slate-50/70",

      selected:
        "bg-blue-50/60",

      disabled:
        "bg-slate-50/50",

      footer:
        "border-t border-slate-200",
    },

    // ==============================
    // 3. BORDERED
    // ==============================

    bordered: {
      wrapper: `
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
      `,

      table: "bg-white",

      header: `
        border-b
        border-slate-200
        bg-slate-50
        text-slate-600
      `,

      row: `
        border-b
        border-slate-200
        text-slate-700
      `,

      hover:
        "hover:bg-slate-50",

      selected:
        "bg-blue-50",

      disabled:
        "bg-slate-50",

      footer:
        "border-t border-slate-200",
    },

    // ==============================
    // 4. STRIPED
    // ==============================

    striped: {
      wrapper: `
        overflow-hidden
        rounded-xl
        border
        border-slate-200
        bg-white
      `,

      table: "bg-white",

      header: `
        border-b
        border-slate-200
        bg-slate-50
        text-slate-500
      `,

      row: `
        border-b
        border-slate-100
        text-slate-700
      `,

      hover:
        "hover:bg-slate-100/70",

      selected:
        "bg-blue-50",

      disabled:
        "bg-slate-50",

      footer:
        "border-t border-slate-200",
    },

    // ==============================
    // 5. CARD
    // ==============================

    card: {
      wrapper: `
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      `,

      table: "bg-white",

      header: `
        border-b
        border-slate-200
        bg-white
        text-slate-500
      `,

      row: `
        border-b
        border-slate-100
        text-slate-700
      `,

      hover:
        "hover:bg-slate-50",

      selected:
        "bg-blue-50",

      disabled:
        "bg-slate-50",

      footer:
        "border-t border-slate-200",
    },
  };

  const currentSize =
    sizes[size] || sizes.md;

  const currentVariant =
    variants[variant] ||
    variants.default;

  // --------------------------------
  // Row key
  // --------------------------------

  const getRowKey = (row, index) => {
    if (typeof rowKey === "function") {
      return rowKey(row, index);
    }

    return row[rowKey] ?? index;
  };

  // --------------------------------
  // Disabled row
  // --------------------------------

  const checkRowDisabled = (
    row,
    index
  ) => {
    return (
      isRowDisabled?.(
        row,
        index
      ) ?? false
    );
  };

  // --------------------------------
  // Sorting
  // --------------------------------

  const handleSort = (column) => {
    if (
      !sortable ||
      !column.sortable
    ) {
      return;
    }

    let direction = "asc";

    if (
      currentSort?.key ===
        column.key &&
      currentSort.direction ===
        "asc"
    ) {
      direction = "desc";
    }

    const nextSort = {
      key: column.key,
      direction,
    };

    if (!isSortControlled) {
      setInternalSort(nextSort);
    }

    onSortChange?.(
      nextSort
    );
  };

  // --------------------------------
  // Process data
  // --------------------------------

  const processedData = useMemo(() => {
    if (
      !sortable ||
      !currentSort
    ) {
      return data;
    }

    const column =
      columns.find(
        (item) =>
          item.key ===
          currentSort.key
      );

    if (!column) {
      return data;
    }

    return [...data].sort(
      (a, b) => {
        const aValue =
          column.sortValue
            ? column.sortValue(a)
            : a[column.key];

        const bValue =
          column.sortValue
            ? column.sortValue(b)
            : b[column.key];

        if (
          aValue == null
        ) {
          return 1;
        }

        if (
          bValue == null
        ) {
          return -1;
        }

        if (
          typeof aValue ===
            "number" &&
          typeof bValue ===
            "number"
        ) {
          return currentSort.direction ===
            "asc"
            ? aValue -
                bValue
            : bValue -
                aValue;
        }

        return currentSort.direction ===
          "asc"
          ? String(
              aValue
            ).localeCompare(
              String(
                bValue
              )
            )
          : String(
              bValue
            ).localeCompare(
              String(
                aValue
              )
            );
      }
    );
  }, [
    data,
    columns,
    sortable,
    currentSort,
  ]);

  // --------------------------------
  // Selection
  // --------------------------------

  const selectableRows =
    processedData.filter(
      (row, index) =>
        !checkRowDisabled(
          row,
          index
        )
    );

  const selectedCount =
    selectableRows.filter(
      (row, index) =>
        currentSelectedKeys.includes(
          getRowKey(
            row,
            index
          )
        )
    ).length;

  const allSelected =
    selectableRows.length >
      0 &&
    selectedCount ===
      selectableRows.length;

  const someSelected =
    selectedCount > 0 &&
    selectedCount <
      selectableRows.length;

  // --------------------------------
  // Indeterminate
  // --------------------------------

  useEffect(() => {
    if (
      selectAllRef.current
    ) {
      selectAllRef.current.indeterminate =
        someSelected;
    }
  }, [someSelected]);

  // --------------------------------
  // Selection update
  // --------------------------------

  const updateSelection = (
    nextKeys
  ) => {
    if (
      !isSelectionControlled
    ) {
      setInternalSelectedKeys(
        nextKeys
      );
    }

    onSelectionChange?.(
      nextKeys
    );
  };

  // --------------------------------
  // Select all
  // --------------------------------

  const handleSelectAll = () => {
    if (allSelected) {
      updateSelection(
        currentSelectedKeys.filter(
          (key) =>
            !selectableRows.some(
              (row, index) =>
                getRowKey(
                  row,
                  index
                ) === key
            )
        )
      );

      return;
    }

    const keys =
      selectableRows.map(
        (row, index) =>
          getRowKey(
            row,
            index
          )
      );

    updateSelection(
      Array.from(
        new Set([
          ...currentSelectedKeys,
          ...keys,
        ])
      )
    );
  };

  // --------------------------------
  // Single selection
  // --------------------------------

  const handleRowSelect = (
    row,
    index
  ) => {
    if (
      checkRowDisabled(
        row,
        index
      )
    ) {
      return;
    }

    const key =
      getRowKey(
        row,
        index
      );

    const selected =
      currentSelectedKeys.includes(
        key
      );

    const nextKeys =
      selected
        ? currentSelectedKeys.filter(
            (item) =>
              item !== key
          )
        : [
            ...currentSelectedKeys,
            key,
          ];

    updateSelection(
      nextKeys
    );
  };

  // --------------------------------
  // Action handling
  // --------------------------------

  const handleAction = (
    action,
    row,
    rowIndex
  ) => {
    onAction?.(
      action,
      row,
      rowIndex
    );
  };

  // --------------------------------
  // Cell rendering
  // --------------------------------
const renderCell = (
  column,
  row,
  rowIndex
) => {
  if (column.render) {
    return column.render(
      row[column.key],
      row,
      rowIndex,
      handleAction,
      column.actions || []
    );
  }

  return row[column.key];
};

  // --------------------------------
  // Alignment
  // --------------------------------

  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  // --------------------------------
  // Render
  // --------------------------------

  return (
    <div
      className={twMerge(
        clsx(
          "w-full",

          "overflow-x-auto",

          currentVariant.wrapper,

          className
        )
      )}
      {...props}
    >
      <table
        className={twMerge(
          clsx(
            "w-full",
            "min-w-max",
            "border-collapse",

            currentVariant.table,

            tableClassName
          )
        )}
      >
        {/* ============================
            HEADER
        ============================ */}

        <thead
          className={twMerge(
            clsx(
              stickyHeader &&
                "sticky top-0 z-10",

              currentVariant.header,

              headerClassName
            )
          )}
        >
          <tr>
            {/* Select all */}

            {selectable && (
              <th
                scope="col"
                className={twMerge(
                  clsx(
                    "w-12",
                    currentSize.header,
                    headerCellClassName
                  )
                )}
              >
                <input
                  ref={
                    selectAllRef
                  }
                  type="checkbox"
                  checked={
                    allSelected
                  }
                  onChange={
                    handleSelectAll
                  }
                  disabled={
                    selectableRows.length ===
                    0
                  }
                  aria-label="Select all rows"
                  className={
                    currentSize.checkbox
                  }
                />
              </th>
            )}

            {/* Columns */}

            {columns.map(
              (column) => {
                const sorted =
                  currentSort?.key ===
                  column.key;

                return (
                  <th
                    key={
                      column.key
                    }
                    scope="col"
                    style={{
                      width:
                        column.width,
                    }}
                    aria-sort={
                      sorted
                        ? currentSort.direction ===
                          "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                    onClick={() =>
                      handleSort(
                        column
                      )
                    }
                    className={twMerge(
                      clsx(
                        "whitespace-nowrap",

                        "font-semibold",

                        currentSize.header,

                        alignment[
                          column.align ||
                            "left"
                        ],

                        sortable &&
                          column.sortable &&
                          "cursor-pointer select-none",

                        headerCellClassName
                      )
                    )}
                  >
                    {column.header
                      ? column.header(
                          column,
                          currentSort
                        )
                      : column.label}

                    {sortable &&
                      column.sortable &&
                      sorted && (
                        <span className="ml-1.5">
                          {currentSort.direction ===
                          "asc"
                            ? "↑"
                            : "↓"}
                        </span>
                      )}
                  </th>
                );
              }
            )}
          </tr>
        </thead>

        {/* ============================
            BODY
        ============================ */}

        <tbody
          className={twMerge(
            clsx(
              bodyClassName
            )
          )}
        >
          {/* Loading */}

          {loading && (
            <tr>
              <td
                colSpan={
                  columns.length +
                  (selectable
                    ? 1
                    : 0)
                }
                className={twMerge(
                  clsx(
                    "px-4",
                    "py-12",
                    "text-center",
                    "text-sm",
                    "text-slate-500",

                    loadingClassName
                  )
                )}
              >
                {loadingMessage}
              </td>
            </tr>
          )}

          {/* Empty */}

          {!loading &&
            processedData.length ===
              0 && (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (selectable
                      ? 1
                      : 0)
                  }
                  className={twMerge(
                    clsx(
                      "px-4",
                      "py-12",
                      "text-center",
                      "text-sm",
                      "text-slate-500",

                      emptyClassName
                    )
                  )}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

          {/* Rows */}

          {!loading &&
            processedData.map(
              (
                row,
                rowIndex
              ) => {
                const key =
                  getRowKey(
                    row,
                    rowIndex
                  );

                const disabled =
                  checkRowDisabled(
                    row,
                    rowIndex
                  );

                const selected =
                  currentSelectedKeys.includes(
                    key
                  );

                return (
                  <tr
                    key={key}
                    aria-selected={
                      selected
                    }
                    className={twMerge(
                      clsx(
                        "group",

                        currentVariant.row,

                        currentVariant.row,

                        variant ===
                          "striped" &&
                          rowIndex %
                            2 ===
                            1 &&
                          "bg-slate-50/70",

                        hoverable &&
                          !disabled &&
                          currentVariant.hover,

                        selected &&
                          currentVariant.selected,

                        disabled &&
                          currentVariant.disabled,

                        disabled &&
                          "cursor-not-allowed",

                        onRowClick &&
                          !disabled &&
                          "cursor-pointer",

                        rowClassName
                      )
                    )}
                    onClick={() =>
                      !disabled &&
                      onRowClick?.(
                        row,
                        rowIndex
                      )
                    }
                  >
                    {/* Checkbox */}

                    {selectable && (
                      <td
                        className={
                          currentSize.cell
                        }
                        onClick={(
                          event
                        ) =>
                          event.stopPropagation()
                        }
                      >
                        <input
                          type="checkbox"
                          checked={
                            selected
                          }
                          disabled={
                            disabled
                          }
                          onChange={() =>
                            handleRowSelect(
                              row,
                              rowIndex
                            )
                          }
                          aria-label={`Select row ${key}`}
                          className={
                            currentSize.checkbox
                          }
                        />
                      </td>
                    )}

                    {/* Cells */}

                    {columns.map(
                      (
                        column
                      ) => (
                        <td
                          key={
                            column.key
                          }
                          style={{
                            width:
                              column.width,
                          }}
                          className={twMerge(
                            clsx(
                              currentSize.cell,

                              alignment[
                                column.align ||
                                  "left"
                              ],

                              "align-middle",

                              cellClassName
                            )
                          )}
                        >
                          {renderCell(
                            column,
                            row,
                            rowIndex
                          )}
                        </td>
                      )
                    )}
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;