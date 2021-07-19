from collections import deque
import numpy as np

# Function that returns the distance of the shortest path between two points (P and Q) on a map (A)


def pathfinder(A, P, Q):

    # Right Left Up Down
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    # Sizes of map
    numRows = len(A)
    numCols = len(A[0])

    # Queue initialised
    queue = deque()
    queue.append(((P), 0))

    # Array containing all points that have been visited
    visited = np.zeros((numRows, numCols), dtype=bool)

    while queue:
        current, stepCount = queue.popleft()

        # Check point is not visited already and that the end has not been reached
        if checkVisited(current, visited):
            continue
        if current == Q:
            return stepCount

        # Update point as visited
        visited[current[0]][current[1]] = True

        for i in range(4):
            # Add the direction to get the new point
            next = [current[0] + directions[i][0],
                    current[1] + directions[i][1]]
            # Check point is on the map, that there isnt a wall and that it is not visited already
            if onMap(next, numRows, numCols) and checkWall(next, A) and not checkVisited(next, visited):
                queue.append((next, stepCount+1))

    return 'There is no path'

# Function to check point is within maze


def onMap(point, numRows, numCols):
    if 0 <= point[0] and point[0] < numRows and 0 <= point[1] and point[1] < numCols:
        return True

# Function to check if a point is on a wall


def checkWall(point, map):
    if map[point[0]][point[1]] != False:
        return True

# Function to check if a point has been visited


def checkVisited(point, visited):
    if visited[point[0]][point[1]]:
        return True


A = [
    [True, False, True, True, True, True],
    [True, False, True, True, True, True],
    [True, False, True, True, True, True],
    [True, True, True, True, True, True]
]

P = [0, 0]
Q = [0, 5]

print(pathfinder(A, P, Q))
