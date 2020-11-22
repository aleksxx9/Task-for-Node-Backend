(function () {
    const field = document.getElementById('tictactoe');
    generateField(field);
    if (!sessionStorage.getItem('values')) {
        SetNewGame();
    }
    else {
        const values = JSON.parse(sessionStorage.getItem('values'));
        for (let i = 0; i < 9; i++) {
            document.getElementById(i).innerHTML = values[i];
        }
    }
})()

function generateField(field) {
    const table = document.createElement('table');
    let cellId = 0;
    for (let i = 0; i < 3; i++) {
        const tableRow = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const tableCell = document.createElement('td');
            tableCell.addEventListener('click', HandleClick)
            tableCell.id = cellId;
            cellId++;
            tableRow.append(tableCell);
        }
        table.append(tableRow);
        field.append(table);
    }
}

function HandleClick() {
    const values = JSON.parse(sessionStorage.getItem('values'));
    if (sessionStorage.getItem('turn') === "X" && !this.innerHTML) {
        this.innerHTML = 'X';
        sessionStorage.setItem('turn', "O");
        values[this.id] = 'X';
    }
    else if (sessionStorage.getItem('turn') === "O" && !this.innerHTML) {
        this.innerHTML = 'O';
        sessionStorage.setItem('turn', "X");
        values[this.id] = 'O'
    }
    sessionStorage.setItem('values', JSON.stringify(values));

    CheckWinner(values);
}

function CheckWinner(values) {
    // table cell id's
    // 012
    // 345
    // 678
    const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    winningConditions.forEach(condition => {
        if (values[condition[0]] === "X" && values[condition[1]] === "X" && values[condition[2]] === "X") {
            console.log('player one has won');
            SetNewGame();
        }
        else if (values[condition[0]] === "O" && values[condition[1]] === "O" && values[condition[2]] === "O") {
            console.log('player two has won');
            SetNewGame();
        }
    })
}

function SetNewGame() {
    const filledFields = ['', '', '', '', '', '', '', '', ''];
    sessionStorage.setItem('turn', 'X');
    sessionStorage.setItem('values', JSON.stringify(filledFields));
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerHTML = "";
    }
}