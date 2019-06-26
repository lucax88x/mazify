/** @jsx jsx */
import { jsx } from '@emotion/core';
import { number } from 'prop-types';
import classnames from 'classnames';
import { MazeRoom } from './code/MazeRoom';

const styles = {
  container: {
    backgroundColor: 'transparent',
    borderRight: '1px solid #fff',
    borderBottom: '1px solid #fff',
    width: '100%',
    height: '100%',
    '&.has-top': {
      borderTop: '1px solid #fff',
    },
    '&.has-left': {
      borderLeft: '1px solid #fff',
    },
    '&.is-top-open': {
      borderTop: 'none',
    },
    '&.is-right-open': {
      borderRight: 'none',
    },
    '&.is-bottom-open': {
      borderBottom: 'none',
    },
    '&.is-left-open': {
      borderLeft: 'none',
    },
    '&.depth-1': { backgroundColor: '#1da2d8' },
    '&.depth-2': { backgroundColor: '#7fcdff' },
    '&.depth-3': { backgroundColor: '#76b6c4' },
    '&.depth-4': { backgroundColor: '#064273' },
  },
};

export interface MazeSquareProps {
  room: MazeRoom;
}

export const MazeSquare: React.FC<MazeSquareProps> = ({ room }) => {
  console.log(room.depth);
  return (
    <div
      css={styles.container}
      className={classnames({
        'has-top': room.row === 0,
        'has-left': room.column === 0,
        'is-top-open': room.isTopOpen,
        'is-right-open': room.isRightOpen,
        'is-bottom-open': room.isBottomOpen,
        'is-left-open': room.isLeftOpen,
        [`depth-${room.depth}`]: !!room.depth,
      })}
    />
  );
};
