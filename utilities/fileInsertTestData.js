const fs = require('fs');
const path = require('path');

function writeToTestData(Data) {
    const testDataPath = path.resolve(__dirname, './testData.json');
    const testData = require('./testData.json');
    const updatedData = { ...testData, ...Data };

    fs.writeFileSync(testDataPath, JSON.stringify(updatedData, null, 2));
}

module.exports={ writeToTestData };