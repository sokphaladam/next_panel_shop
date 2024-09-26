'use client';
//@ts-ignore
import * as xlsx from 'xlsx';

function fitToColumn(arrayOfArray: string[][]) {
  return arrayOfArray[0].map((_, i) => ({
    wch: Math.max(...arrayOfArray.map((a2) => (a2[i] ? a2[i].toString().length : 0))),
  }));
}

export default function downloadExcelFile(fileName: string, sheetName: string, rows: string[][]) {
  //Convert number type data into number if any
  const newData = rows.map((row) =>
    row.map((value) => {
      return isNumber(value) && Number(value) < 100000 ? Number(value) : value;
    }),
  );

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.sheet_add_aoa(wb, newData);

  xlsx.utils.book_append_sheet(wb, ws, sheetName);
  ws['!cols'] = fitToColumn(rows);

  const b = xlsx.write(wb, { type: 'array', bookType: 'xlsx' });
  const data = URL.createObjectURL(new Blob([b], { type: 'application/octet-stream' }));

  const link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);

  link.click();
  link.remove();
}

function isNumber(value: unknown) {
  return !isNaN(Number(value));
}
