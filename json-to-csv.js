import fs from 'fs';
import { getInputFilenameFromArgs, buildArrayOfEmptyString, isStringNumberBoolean } from './helper.js';

export const exportJsonArrayToCsv = (inputFilename) => {
    try {
        const data = fs.readFileSync(inputFilename);
        const records = JSON.parse(data);

        // get all columns
        const columns = [];
        const columnKeyIndex = {};
        for (const record of records) {
            for (const key in record) {
                if (columns.indexOf(key) === -1) {
                    columns.push(key);
                    columnKeyIndex[key] = columns.length - 1;
                }
            }
        }

        // build csv
        const csv = [[columns.join(',')]];
        for (const record of records) {
            const row = buildArrayOfEmptyString(columns.length);
            for (const key in record) {
                let data = record[key];
                if (data && !isStringNumberBoolean(data)) {
                    data = `${JSON.stringify(data).replace(/"/g, '')}`;
                }

                data = `"${data}"`;
                row[columnKeyIndex[key]] = data;
            }

            csv.push([row.join(',')]);
        }

        // write to file
        fs.writeFileSync(`outputs/${inputFilename}.csv`, csv.join('\n'));
    } catch (error) {
        console.error(error);
    }
};

const inputFilename = getInputFilenameFromArgs();
console.log('input filename: ', inputFilename)
exportJsonArrayToCsv(inputFilename);