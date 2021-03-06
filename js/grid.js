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
	if (typeof text === 'number')
		output.innerHTML = 'The shortest path is ' + text + ' blocks long';
	else output.innerHTML = text;
}

// Gets array and runs shortest path algorithm
document.getElementById('run').onclick = function () {
	const cells = document.getElementById('grid').getElementsByTagName('div');
	const rows = document.getElementById('rows').value;
	const cols = document.getElementById('cols').value;

	const start = [];
	const end = [];

	// Declaring boolean array of correct size
	const array = new Array(parseInt(rows));

	for (let i = 0; i < array.length; i++) {
		array[i] = new Array(parseInt(cols)).fill(true);
	}

	// Loop through all cells
	for (let i = 0; i < cells.length; i++) {
		// Get position from div
		let position = cells[i].textContent.replace(/[^0-9]/g, '').split('');

		// Finding start, end and wall divs
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

	// String to int
	const P = [parseInt(start[0]), parseInt(start[1])];
	const Q = [parseInt(end[0]), parseInt(end[1])];

	// Run pathfinding function
	output(pathfinder(array, P, Q));
};
