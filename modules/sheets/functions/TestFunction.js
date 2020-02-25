const { google } = require('googleapis');

module.exports = function (auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: '1W5L5B7OM8HimP2cLcWTWWoK9cM14STtEvmseFDYw_pg',
        range: 'TestRange'
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data.values);
    });
}
