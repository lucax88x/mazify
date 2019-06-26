/** @jsx jsx */
import { jsx } from '@emotion/core';
import { MazeRoom } from './code/MazeRoom';

const styles = {
  container: {
    backgroundColor: 'red',
    position: 'absolute' as 'absolute',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
  },
};

export interface ManProps {
  room: MazeRoom;
}

export const Man: React.FC<ManProps> = ({ room }) => {
  return <div css={styles.container} />;
};
