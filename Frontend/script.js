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
    getLog();
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
        sendAction(this.id, 'Player one', 'X');
    }
    else if (sessionStorage.getItem('turn') === "O" && !this.innerHTML) {
        this.innerHTML = 'O';
        sessionStorage.setItem('turn', "X");
        values[this.id] = 'O'
        sendAction(this.id, 'Player two', 'O');
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
            document.getElementById('overlay').style.display = "flex";
            document.getElementById('playerOne').style.display = "flex";
            sendAction('won', 'Player one');
            SetNewGame();
        }
        else if (values[condition[0]] === "O" && values[condition[1]] === "O" && values[condition[2]] === "O") {
            document.getElementById('overlay').style.display = "flex";
            document.getElementById('playerTwo').style.display = "flex";
            sendAction('won', 'Player two');
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
    sendAction('new');
}

function closeOverlay(name) {
    document.getElementById('overlay').style.display = "none";
    document.getElementById(name).style.display = "none";
}

function getLog() {
    fetch('https://aleksxx9-tic-tac-toe.herokuapp.com/get')
        .then(res => res.json())
        .then(data => {
            const log = document.getElementById('log');
            log.innerHTML = "";
            data.forEach(move => {
                log.append(move);
                log.append(document.createElement('br'));
            })
        })
}

function sendAction(move, player, sign) {
    let action = getAction(move, player, sign);

    fetch('https://aleksxx9-tic-tac-toe.herokuapp.com/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "action": action })
    })

    getLog();
}

function getAction(move, player, sign) {
    let action;
    switch (move) {
        case '0':
            action = `${player} placed ${sign} on first row first cell`
            break;
        case '1':
            action = `${player} placed ${sign} on first row second cell`
            break;
        case '2':
            action = `${player} placed ${sign} on first row third cell`
            break;
        case '3':
            action = `${player} placed ${sign} on second row first cell`
            break;
        case '4':
            action = `${player} placed ${sign} on second row second cell`
            break;
        case '5':
            action = `${player} placed ${sign} on second row third cell`
            break;
        case '6':
            action = `${player} placed ${sign} on third row first scell`
            break;
        case '7':
            action = `${player} placed ${sign} on third row second cell`
            break;
        case '8':
            action = `${player} placed ${sign} on third row third cell`
            break;
        case 'won':
            action = `${player} won the game!`
            break;
        case 'new':
            action = `New game has begun!`
            break;
    }
    return action;
}