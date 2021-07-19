// Function that returns the distance of the shortest path between two points (P and Q) on a map (A)

function pathfinder(A, P, Q) {
	// Right Left Up Down
	directions = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	];

	// Sizes of map
	const numRows = A.length;
	const numCols = A[0].length;

	// Queue initialised
	const queue = [];
	queue.push([P, 0]);

	// Array containing all points that have been visited
	const visited = Array.from({ length: numRows }, () =>
		Array.from({ length: numCols }, () => false)
	);

	while (queue.length >> 0) {
		const [current, stepCount] = queue.shift();

		// Check point is not visited already and that the end has not been reached
		if (checkVisited(current, visited)) continue;

		if (JSON.stringify(current) == JSON.stringify(Q)) {
			return stepCount;
		}

		// Update point as visited
		visited[current[0]][current[1]] = true;

		for (let i = 0; i < 4; i++) {
			// Add the direction to get the new point
			next = [current[0] + directions[i][0], current[1] + directions[i][1]];

			// Check point is on the map, that there isnt a wall and that it is not visited already
			if (
				onMap(next, numRows, numCols) &&
				checkWall(next, A) &&
				!checkVisited(next, visited)
			)
				queue.push([next, stepCount + 1]);
		}
	}

	return 'There is no path';
}

// Function to check point is within maze
function onMap(point, numRows, numCols) {
	if (
		0 <= point[0] &&
		point[0] < numRows &&
		0 <= point[1] &&
		point[1] < numCols
	)
		return true;
}

// Function to check if a point is on a wall
function checkWall(point, map) {
	if (map[point[0]][point[1]] != false) return true;
}

// Function to check if a point has been visited
function checkVisited(point, visited) {
	if (visited[point[0]][point[1]]) return true;
}

const A = [
	[true, false, true, true, true, true],
	[true, false, true, true, true, true],
	[true, false, true, true, true, true],
	[true, true, true, true, true, true],
];

const P = [0, 0];
const Q = [0, 5];
