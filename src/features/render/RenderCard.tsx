import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import {
  Circle,
  Layer,
  Stage,
  Text,
} from 'react-konva';
import { Provider, ReactReduxContext, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { ExecState, NodePosition } from './execSlice';

interface NodeCirclesProps {
  /**
   * Checks if a node is visible or not.
   * @param x - the x coordinate
   * @param y - the y coordinate
   * @returns true if visible
   */
  isVisible: (x: number, y: number) => boolean;
  /**
   * Optional transformation function that maps the coordinates of nodes.
   * @param x - the x coordinate
   * @param y - the y coordinate
   * @returns the new coordinates
   */
  transform?: (x: number, y: number) => { x: number; y: number };
}

/** Component that draws a Konva Circle for each node in Redux Store. */
const NodeCircles: React.FC<NodeCirclesProps> = ({ isVisible, transform }) => {
  const nodes = useSelector<RootState, NodePosition[] | null>((state) => state.exec.execution.drawing);

  return (
    <Layer>
      {
        nodes
          ?.map(({ id, x: originalX, y: originalY }, i) => {
            const { x, y } = transform?.(originalX, originalY) ?? { x: originalX, y: originalY };
            if (!isVisible(x, y)) console.warn(`Node ${id} (${i}/${nodes?.length}) is not visible`); // fixme
            return <Circle id={id} key={id} x={x} y={y} radius={5} fill="black" />;
          })
        || <Text fill="white" text="NO NODES FOUND" />
      }
    </Layer>
  );
};

const ExecInfo: React.FC = () => {
  const { id, status } = useSelector<RootState, ExecState['execution']>((state: RootState) => state.exec.execution);

  return (
    <>
      <Typography variant="h6">
        Execution&nbsp;
        {id && 'of '}
        {id && <i>{id}</i>}
        {id && ' has '}
        status:&nbsp;
        <b>{status}</b>
      </Typography>
    </>
  );
};

const RenderCard: React.FC = () => {
  const stageWidth = window.innerWidth * 0.4;
  const stageHeight = window.innerHeight * 0.7;

  return (
    <Card>
      <CardHeader
        title={(
          <Box display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="center" alignItems="center">
            <ExecInfo />
          </Box>
        )}
      />
      <CardContent>
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <Stage width={stageWidth} height={stageHeight}>
              <Provider store={store}>
                <NodeCircles
                  isVisible={(x, y) => x <= stageWidth && y <= stageHeight}
                  transform={(x, y) => ({ x: x + (stageWidth / 2), y: y + stageHeight })}
                />
              </Provider>
            </Stage>
          )}
        </ReactReduxContext.Consumer>
      </CardContent>
    </Card>
  );
};

export default RenderCard;
