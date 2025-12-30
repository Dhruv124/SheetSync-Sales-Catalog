// Google Apps Script for Internal Sales Catalogue
// Deploy this as a Web App with "Execute as: Me" and "Who has access: Anyone"

function doPost(e) {
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);

    // Open the spreadsheet (replace with your actual sheet ID)
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // You'll need to replace this
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName('Orders') || spreadsheet.getSheets()[0];

    // Prepare the data for the sheet
    const timestamp = new Date().toLocaleString();
    const customerInfo = data.customer || {};
    const cartItems = data.cart || [];
    const orderTotal = data.total || 0;

    // Create rows for each cart item
    const rows = [];
    cartItems.forEach((item, index) => {
      rows.push([
        timestamp,
        customerInfo.name || '',
        customerInfo.email || '',
        customerInfo.phone || '',
        customerInfo.company || '',
        item.name || '',
        item.quantity || 0,
        item.price || 0,
        item.quantity * item.price,
        index === 0 ? orderTotal : '', // Only show total on first row
        data.notes || ''
      ]);
    });

    // If no cart items, still create a row with customer info
    if (rows.length === 0) {
      rows.push([
        timestamp,
        customerInfo.name || '',
        customerInfo.email || '',
        customerInfo.phone || '',
        customerInfo.company || '',
        'No items',
        0,
        0,
        0,
        orderTotal,
        data.notes || ''
      ]);
    }

    // Append all rows to the sheet
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Order submitted successfully',
        orderId: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error processing order: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: GET endpoint for testing
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'OK',
      message: 'Internal Sales Catalogue API is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
