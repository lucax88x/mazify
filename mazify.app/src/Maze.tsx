/** @jsx jsx */
import { jsx } from '@emotion/core';
import { map, range, chain, values, head } from 'ramda';
import { useMemo, useRef } from 'react';
import useInterval from '@use-it/interval';

import { MazeRoom } from './code/MazeRoom';
import { MazeSquare } from './MazeSquare';
import { Man } from './Man';
import reduce from 'ramda/es/reduce';

const styles = {
  container: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mazeContainer: {
    position: 'relative' as 'relative',
    width: '60vw',
    height: '60vh',
  },
  maze: {
    display: 'grid',
    gridAutoRows: 'auto',
    height: '100%',
  },
};

export const Maze: React.FC = () => {
  const rows = 10;
  const columns = 10;

  const indexedRooms = useRef(
    reduce<number, MazeRoomDictionary>(
      (rowAcc, row) => {
        const columnObject = reduce<number, MazeRoomEntry>(
          (columnAcc, column) => {
            columnAcc[column] = new MazeRoom(row, column);
            return columnAcc;
          },
          {},
          range(0, columns),
        );

        rowAcc[row] = columnObject;

        return rowAcc;
      },
      {},
      range(0, rows),
    ),
  );

  const rooms = useMemo(() => chain(room => values(room), values(indexedRooms.current)), [indexedRooms]);

  useMemo(() => {
    for (const row in indexedRooms.current) {
      if (!indexedRooms.hasOwnProperty(row)) {
        continue;
      }
      const rowRooms = indexedRooms.current[row];
      for (const column in rowRooms) {
        if (!rowRooms.hasOwnProperty(column)) {
          continue;
        }

        const room = rowRooms[column];

        room.top = tryGetRoom(indexedRooms.current, room.row - 1, room.column);
        room.right = tryGetRoom(indexedRooms.current, room.row, room.column + 1);
        room.bottom = tryGetRoom(indexedRooms.current, room.row + 1, room.column);
        room.left = tryGetRoom(indexedRooms.current, room.row, room.column - 1);
      }
    }
  }, []);

  const headRoom = head(rooms) as MazeRoom;
  useInterval(() => {
    headRoom.depth = 1;
  }, 1500);

  return (
    <div css={styles.container}>
      <div css={styles.mazeContainer}>
        <Man room={head(rooms) as MazeRoom} />
        <div
          css={styles.maze}
          style={{
            gridTemplateColumns: `repeat(${columns}, auto)`,
          }}
        >
          {map(
            room => (
              <MazeSquare key={`${room.row}-${room.column}`} room={room} />
            ),
            rooms,
          )}
        </div>
      </div>
    </div>
  );
};

function tryGetRoom(indexedRooms: MazeRoomDictionary, row: number, col: number): MazeRoom | null {
  const roomRow = indexedRooms[row];

  if (!!roomRow) {
    return roomRow[col];
  }

  return null;
}

type MazeRoomEntry = { [col: number]: MazeRoom };
type MazeRoomDictionary = { [row: number]: MazeRoomEntry };
