import {
  EventBusMessage,
  EventBusMsgHandler,
  ProtelisUpdateMessage,
  RenderPayload,
} from '../model/EventBus';

export function eventBusMsgHandleBuilder<T>(handler: (payload: T) => void): EventBusMsgHandler<T>['callback'] {
  return (error: Error, message: EventBusMessage<T>) => {
    if (error || !message) {
      console.error(error);
    } else {
      handler(message.body);
    }
  };
}

/**
 * Transform a JSON-serialized Kotlin ProtelisUpdateMessage data object into an array of NodePositions.
 * @param msg - the object received from EventBus
 * @returns the useful data
 */
export function mapUpdate(msg: ProtelisUpdateMessage): RenderPayload {
  const { first: width, second: height } = msg.envSize;
  return {
    env: { width, height },
    nodes: msg
      .nodes
      .map(({ id, coordinates: { first, second }, value }) => ({
        id,
        x: first,
        y: second,
        value,
      })),
  };
}
