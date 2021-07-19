import unittest
import bfs
import numpy as np


class TestBfs(unittest.TestCase):

    def test_3x3(self):
        A = [
            [True, True, True],
            [True, True, True],
            [True, True, True]
        ]
        P = [0, 0]
        Q = [2, 2]
        result = bfs.pathfinder(A, P, Q)
        self.assertEqual(result, 4)

    def test_blockedPath(self):
        A = [
            [True, False, True],
            [True, False, True],
            [True, False, True]
        ]
        P = [0, 0]
        Q = [0, 2]
        result = bfs.pathfinder(A, P, Q)
        self.assertEqual(result, 'There is no path')

    def test_startWall(self):
        A = [
            [False, True, True],
            [True, True, True],
            [True, True, True]
        ]
        P = [0, 0]
        Q = [0, 2]
        result = bfs.pathfinder(A, P, Q)
        self.assertEqual(result, 'Start point is wall')

    def test_endWall(self):
        A = [
            [True, True, False],
            [True, True, True],
            [True, True, True]
        ]
        P = [0, 0]
        Q = [0, 2]
        result = bfs.pathfinder(A, P, Q)
        self.assertEqual(result, 'End point is wall')

    def test_sameStartEnd(self):
        A = [
            [True, True, True],
            [True, True, True],
            [True, True, True]
        ]
        P = [0, 0]
        Q = [0, 0]
        result = bfs.pathfinder(A, P, Q)
        self.assertEqual(result, 'Start and end are the same point')

    def test_basicWithWall(self):
        A = [
            [True, False, True],
            [True, False, True],
            [True, True, True]
        ]
        P = [0, 0]
        Q = [2, 2]
        result = bfs.pathfinder(A, P, Q)
        self.assertEqual(result, 4)

    def test_6x6(self):
        A = [
            [True, False, True, True, True, True],
            [True, False, True, False, False, True],
            [True, False, True, False, True, True],
            [True, False, True, False, True, True],
            [True, False, True, False, True, True],
            [True, True, True, False, True, True]
        ]
        P = [0, 0]
        Q = [5, 5]
        result = bfs.pathfinder(A, P, Q)
        self.assertEqual(result, 20)

    def test_20x20(self):
        A = np.ones((20, 20), dtype=bool)
        A[5][6] = False
        A[6][6] = False
        A[7][6] = False
        A[8][6] = False
        A[9][6] = False
        A[10][6] = False
        P = [10, 10]
        Q = [2, 18]
        result = bfs.pathfinder(A, P, Q)
        self.assertEqual(result, 16)

    def test_200x200(self):
        A = np.ones((200, 200), dtype=bool)
        P = [150, 150]
        Q = [0, 0]
        result = bfs.pathfinder(A, P, Q)
        self.assertEqual(result, 300)
