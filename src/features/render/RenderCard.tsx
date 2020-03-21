import React from 'react';
import {
  Box, Card, CardActions, CardContent, CardHeader, Typography,
} from '@material-ui/core';
import {
  Circle, Layer, Stage, Text,
} from 'react-konva';
import { Provider, ReactReduxContext, useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { ExecState } from './execSlice';
import { NodePosition, RenderPayload } from '../../model/EventBus';

type MapCoordinates = (x: number, y: number) => { x: number; y: number };

interface NodeCirclesProps {
  stageWidth: number;
  stageHeight: number;
}

function stringToColour(str: string): string {
  let i;
  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  // eslint-disable-next-line no-plusplus
  for (i = 0; i < 3; i++) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xFF;
    colour += (`00${value.toString(16)}`).substr(-2);
  }
  return colour;
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
          ?.map(({
            id, x: originalX, y: originalY, value,
          }, i) => {
            const { x, y } = transform?.(originalX, originalY) ?? { x: originalX, y: originalY };
            if (!isVisible(x, y)) console.warn(`Node ${id} (${i}/${nodes?.length}) is not visible`); // fixme
            return (
              <Circle
                id={id}
                key={id}
                x={x}
                y={y}
                radius={5}
                fill={value !== '' ? stringToColour(value) : 'black'}
              />
            );
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

const NodeValues: React.FC = () => {
  const nodes: NodePosition[] | null = useSelector((state: RootState) => state.exec.execution.drawing?.nodes ?? null);
  const dummy: string = (nodes?.map((v) => v.value)?.join('')?.substr(0, 10) ?? '') || 'empty';

  return <h6>{nodes && `Value is: ${dummy}`}</h6>;
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
      <CardActions>
        <NodeValues />
      </CardActions>
    </Card>
  );
};

export default RenderCard;
