const fs = require('fs');
const path = require('path');
const {uniq, groupBy, unionBy, uniqBy} = require('lodash');

const REPORTS_DIRECTORY = path.resolve(__dirname, '../reports');

const COLORS = [
  '#53377A',
  '#FF97BB',
  '#62639B',

  '#DD80CC',
  '#009B76',
  '#35682D',

  '#FAD201',
  '#00FFFF',
  '#C0C0C0',

  '#AA6651',
  '#4B0082',
  '#00538A'
]


parseMetric({
    dirName: 'rps',
    groupKey: 'renderType',
    lineNameFn: (item) => item.runtime,
    extractFn: (filecontent) => filecontent.intermediate.map(({counters}) => counters?.['http.codes.200'] ?? 0).reduce((acc, curr) => Math.max(acc, curr), 0) / 10
});


parseMetric({
    dirName: 'timings',
    groupKey: 'count',
    lineNameFn: (item) => `${item.runtime}_${item.renderType}`,
    // median in ms
    extractFn: (filecontent) => filecontent['aggregate']['summaries']['http.response_time.2xx']?.['median'] ?? 0
});

function parseMetric({dirName, groupKey, extractFn, lineNameFn}) {
    const dirPath = path.resolve(REPORTS_DIRECTORY, dirName);
    const data = fs
        .readdirSync(dirPath, {encoding: 'utf8'})
        .filter((filename) => filename.endsWith('json'))
        .map((filename) => {
            const [runtime, renderType, count] = filename.replace('.json', '').split('_');
            const filecontent = JSON.parse(fs.readFileSync(path.resolve(dirPath, filename), {encoding: 'utf8'}));
            return {runtime, renderType, count: Number(count), value: extractFn(filecontent)}
        });

    fs.writeFileSync(path.resolve(REPORTS_DIRECTORY, `${dirName}.json`), JSON.stringify(groupMetric(data, groupKey, lineNameFn), null, 4), {encoding: 'utf8'});
}

function groupMetric(input, groupKey, lineNameFn) {
    const lines = uniqBy(input.map((item) => {
        const {count, value, ...rest} = item;
        return {...rest, name: lineNameFn(item)}
    }), 'name').map((item, index) => ({...item, color: COLORS[index % COLORS.length]}))

    const data = Object
      .values(groupBy(input, groupKey))
      .map((groups) => groups.reduce((acc, curr) => ({
        ...acc,
        group: String(curr[groupKey]),
        [lineNameFn(curr)]: curr.value
      }), {}));

    return {lines, data}
}