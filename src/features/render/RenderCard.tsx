import React from 'react';
import {
  Box, Card, CardContent, CardHeader, Typography,
} from '@material-ui/core';
import {
  Circle, Layer, Stage, Text,
} from 'react-konva';
import { Provider, ReactReduxContext, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { ExecState } from './execSlice';
import { NodePosition, RenderPayload } from '../../utils/eventBusUtils';

type MapCoordinates = (x: number, y: number) => { x: number; y: number };

interface NodeCirclesProps {
  stageWidth: number;
  stageHeight: number;
}

/** Component that draws a Konva Circle for each node in Redux Store. */
const NodeCircles: React.FC<NodeCirclesProps> = ({ stageWidth, stageHeight }) => {
  const nodes: NodePosition[] | null = useSelector((state: RootState) => state.exec.execution.drawing?.nodes ?? null);
  const env: RenderPayload['env'] | null = useSelector((state: RootState) => state.exec.execution.drawing?.env ?? null);
  const width = env?.width ?? 1;
  const height = env?.height ?? 1;

  const isVisible = (x: number, y: number): boolean => x <= stageWidth && y <= stageHeight;

  const rescale: MapCoordinates = (x, y) => ({ x: (x * stageWidth) / width, y: (y * stageHeight) / height });
  const fromCenterToTopLeft: MapCoordinates = (x, y) => ({ x: x + (stageWidth / 2), y: y + (stageHeight / 2) });

  const transform: MapCoordinates = (x, y) => {
    const { x: rx, y: ry } = rescale(x, y);
    return fromCenterToTopLeft(rx, ry);
  };

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
                  stageWidth={stageWidth}
                  stageHeight={stageHeight}
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
