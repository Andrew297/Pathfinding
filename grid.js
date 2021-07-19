const grid = document.getElementById('grid');

// Builds the grid based on the size inputted
document.getElementById('build').onclick = function () {
	grid.innerHTML = '';

	const rows = document.getElementById('rows').value;
	const cols = document.getElementById('cols').value;

	grid.style.setProperty('--grid-rows', rows);
	grid.style.setProperty('--grid-cols', cols);

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let cell = document.createElement('div');
			cell.innerText = '(' + i + ', ' + j + ')';
			grid.appendChild(cell).className = 'grid-item';
		}
	}
};

// Clicking on the cells adds start, end and walls
grid.onclick = (e) => {
	if (
		document.getElementById('start2').checked &&
		e.target.className == 'grid-item'
	) {
		e.target.className = 'grid-item start';
	} else if (
		document.getElementById('end2').checked &&
		e.target.className == 'grid-item'
	) {
		e.target.className = 'grid-item end';
	} else if (
		document.getElementById('wall2').checked &&
		e.target.className == 'grid-item'
	) {
		e.target.className = 'grid-item wall';
	} else {
		e.target.className = 'grid-item';
	}
};

// Outputs to div
function output(text) {
	const output = document.getElementById('output');
	output.innerHTML = 'The shortest path is ' + text + ' blocks long';
}

// Gets array and runs shortest path algorithm
document.getElementById('run').onclick = function () {
	const cells = document.getElementById('grid').getElementsByTagName('div');
	const rows = document.getElementById('rows').value;
	const cols = document.getElementById('cols').value;

	const array = new Array(parseInt(rows));
	const start = [];
	const end = [];

	for (let i = 0; i < array.length; i++) {
		array[i] = new Array(parseInt(cols)).fill(true);
	}

	for (let i = 0; i < cells.length; i++) {
		let position = cells[i].textContent.replace(/[^0-9]/g, '').split('');

		if (cells[i].className == 'grid-item start') {
			start.push(position[0], position[1]);
		}
		if (cells[i].className == 'grid-item end') {
			end.push(position[0], position[1]);
		}
		if (cells[i].className == 'grid-item wall') {
			array[position[0]][position[1]] = false;
		}
	}

	const P = [parseInt(start[0]), parseInt(start[1])];
	const Q = [parseInt(end[0]), parseInt(end[1])];

	output(pathfinder(array, P, Q));
};
