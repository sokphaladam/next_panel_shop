"use client";
//@ts-ignore
import * as xlsx from "xlsx";
import ExcelJS from "exceljs";

function fitToColumn(arrayOfArray: string[][]) {
  return arrayOfArray[0].map((_, i) => ({
    wch: Math.max(
      ...arrayOfArray.map((a2) => (a2[i] ? a2[i].toString().length : 0))
    ),
  }));
}

export default function downloadExcelFile(
  fileName: string,
  sheetName: string,
  rows: string[][]
) {
  //Convert number type data into number if any
  const newData = rows.map((row) =>
    row.map((value) => {
      return isNumber(value) && Number(value) < 100000 ? Number(value) : value;
    })
  );

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.sheet_add_aoa(wb, newData);

  xlsx.utils.book_append_sheet(wb, ws, sheetName);
  ws["!cols"] = fitToColumn(rows);

  const b = xlsx.write(wb, { type: "array", bookType: "xlsx" });
  const data = URL.createObjectURL(
    new Blob([b], { type: "application/octet-stream" })
  );

  const link = document.createElement("a");
  link.setAttribute("href", data);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);

  link.click();
  link.remove();
}

function isNumber(value: unknown) {
  return !isNaN(Number(value));
}

export async function onGetExportExcel(
  data: unknown,
  title?: string,
  worksheetname?: string,
  options?: { boldRows?: string[]; title?: string }
) {
  try {
    if (data && Array.isArray(data)) {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(worksheetname || "Sheet1");

      if (data.length > 0) {
        if (options?.title) {
          // Add title row
          const titleRow = worksheet.addRow([options.title]);
          titleRow.font = { bold: true, size: 16 };
          titleRow.alignment = { vertical: "middle", horizontal: "center" };
          worksheet.mergeCells(
            1,
            1,
            1,
            Object.keys(data[0] as Record<string, unknown>).length
          );
        }

        // Get column headers from the first object
        const headers = Object.keys(data[0] as Record<string, unknown>);

        // Add headers
        worksheet.addRow(headers);

        // Add data rows with proper data types
        data.forEach((item) => {
          const row = headers.map((header) => {
            const value = (item as Record<string, unknown>)[header];

            // Handle null/undefined
            if (value === null || value === undefined) {
              return null;
            }

            // Keep numbers as numbers
            if (typeof value === "number") {
              return value;
            }

            // Keep booleans as booleans
            if (typeof value === "boolean") {
              return value;
            }

            // Handle dates
            if (value instanceof Date) {
              return value;
            }

            // Convert everything else to string
            return String(value);
          });
          const addedRow = worksheet.addRow(row);

          // Apply bold formatting for specific row types
          const typeValue = (item as Record<string, unknown>)["Type"];
          if (
            options?.boldRows &&
            typeof typeValue === "string" &&
            options.boldRows.includes(typeValue)
          ) {
            addedRow.font = { bold: true };
          }
        });

        // Auto-size columns and apply formatting
        worksheet.columns.forEach((column, index) => {
          const header = headers[index];
          column.width = Math.max(header.length, 15);

          // Check data type from first row to apply formatting
          if (data.length > 0) {
            const firstValue = (data[0] as Record<string, unknown>)[header];

            // Format numbers
            if (typeof firstValue === "number") {
              // Check if it's likely a decimal number
              if (firstValue % 1 !== 0) {
                column.numFmt = "#,##0.00"; // Two decimal places with thousands separator
              } else {
                column.numFmt = "#,##0"; // Integer with thousands separator
              }
            }

            // Format dates
            if (firstValue instanceof Date) {
              column.numFmt = "yyyy-mm-dd hh:mm:ss";
            }
          }
        });

        // Style the header row
        const headerRow = worksheet.getRow(options?.title ? 2 : 1);
        headerRow.font = { bold: true };
        headerRow.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFE6E6FA" },
        };
      }

      // Generate buffer and trigger download in browser
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.xlsx`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`Exported data to ${title}.xlsx`);
    } else {
      console.log("#==================Export Error");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("#==================Export Error", error.message);
    } else {
      console.log("#==================Export Error", String(error));
    }
  }
}
