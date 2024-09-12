import ExcelJS from 'exceljs';

export const exportToExcel = (data, fileName) => {
  // Step 1: Create a new workbook and a new worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  // Step 1.1: Add two rows before the table for the title
  worksheet.addRow([]); // Add an empty row
  worksheet.addRow(['My Table']); // Add a row with the title

  // Step 1.2: Merge cells for the title row to span across all columns
  worksheet.mergeCells('A2:D2'); // Adjust 'A2:D2' to span the range of your table columns
  worksheet.getCell('A2').font = { size: 16, bold: true }; // Customize the title font size and style
  worksheet.getCell('A2').alignment = {
    vertical: 'middle',
    horizontal: 'center',
  }; // Center the title

  // Step 2: Manually Add Headers as the Next Row After the Title
  worksheet.addRow(['Arrival Time', 'Departure Time', 'Hello', 'Items']);
  worksheet.getRow(3).font = { bold: true }; // Make headers bold

  // Step 3: Add the rows to the worksheet
  data.forEach((item) => {
    worksheet.addRow([
      item.ata,
      item.tot,
      'hello', // Add "hello" in each row under the "Hello" column
      item.items
        .map((subItem) => `${subItem.color} ${subItem.brand}`)
        .join(', '), // Convert the items array into a string or a more readable format
    ]);
  });

  // Step 4: Export the workbook to a file without using file-saver
  workbook.xlsx.writeBuffer().then((buffer) => {
    // Create a Blob from the buffer
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Create a link element to trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    a.click();

    // Clean up and release object URL
    URL.revokeObjectURL(url);
  });
};

// import ExcelJS from 'exceljs';

// // Define a generic type T for the data argument
// export const exportToExcel = <T extends Record<string, any>>(
//   data: T[],
//   fileName: string
// ) => {
//   // Step 1: Create a new workbook and a new worksheet
//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet('Sheet1');

//   // Step 1.1: Add two rows before the table for the title
//   worksheet.addRow([]); // Add an empty row
//   worksheet.addRow(['My Table']); // Add a row with the title

//   // Step 1.2: Merge cells for the title row to span across all columns
//   worksheet.mergeCells('A2:D2'); // Adjust 'A2:D2' to span the range of your table columns
//   worksheet.getCell('A2').font = { size: 16, bold: true }; // Customize the title font size and style
//   worksheet.getCell('A2').alignment = {
//     vertical: 'middle',
//     horizontal: 'center',
//   }; // Center the title

//   // Step 2: Manually Add Headers as the Next Row After the Title
//   worksheet.addRow(['Arrival Time', 'Departure Time', 'Hello', 'Items']);
//   worksheet.getRow(3).font = { bold: true }; // Make headers bold

//   // Step 3: Add the rows to the worksheet
//   data.forEach((item) => {
//     worksheet.addRow([
//       item.ata,
//       item.tot,
//       'hello', // Add "hello" in each row under the "Hello" column
//       (item as any).items // Convert items to string format; adjust based on your data structure
//         .map((subItem: any) => `${subItem.color} ${subItem.brand}`)
//         .join(', '),
//     ]);
//   });

//   // Step 4: Export the workbook to a file without using file-saver
//   workbook.xlsx.writeBuffer().then((buffer) => {
//     // Create a Blob from the buffer
//     const blob = new Blob([buffer], {
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//     });

//     // Create a link element to trigger the download
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${fileName}.xlsx`;
//     a.click();

//     // Clean up and release object URL
//     URL.revokeObjectURL(url);
//   });
// };

// exportToExcel<DataType>(data, 'ExportedData');
