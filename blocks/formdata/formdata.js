export default async function decorate(block) {
    const formDataContainer = block.closest('.formdata-container');
    if(formDataContainer){
        let dataUrl = block.closest('.formdata-container').dataset.dataurl,
        columnsUrl = block.closest('.formdata-container').dataset.columnurl;
        if(dataUrl && columnsUrl){
            let Pdata = fetch(dataUrl),
            Pcolumn = fetch(columnsUrl),
            result  = await  Promise.all([Pdata, Pcolumn]),
            columns = await result[0].json(),
            data =  await result[1].json();
            if(columns, data){
                let table = buildTable(columns.data, data.data);
                block.innerHTML = '';
                block.append(table);
            }
            }

        }
       
}

export function buildTable(colNames, data) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    buildHeading(thead, colNames);
    buildBody(tbody, data)
    return table;
}

function buildHeading(thead, colNames) {
    const row = document.createElement('tr');
    colNames.forEach((colName)=> {
        if(colName.Type !== 'submit'){
            const cell = buildCell(true);
            cell.innerHTML = colName.Label;
            row.append(cell);
        }
    })
    thead.append(row);
}
function buildBody(tbody, data) {
    data.forEach((rowData)=> {
        const row = document.createElement('tr');
        for (let key in rowData){
            const cell = buildCell();
            cell.innerHTML = rowData[key];
            row.append(cell);
        }
        tbody.append(row);
    })
    
}

function buildCell(isHeading) {
    const cell = !isHeading ? document.createElement('td') : document.createElement('th');
    if (isHeading) cell.setAttribute('scope', 'col');
    return cell;
}
