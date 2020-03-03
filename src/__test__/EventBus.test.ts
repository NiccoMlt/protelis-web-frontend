import { eventBusMsgHandleBuilder, mapUpdate } from '../utils/eventBusUtils';
import { EventBusMessage, ProtelisUpdateMessage, RenderPayload } from '../model/EventBus';

describe('Vert.x EventBus', () => {
  it('eventBusMsgHandleBuilder resolves a body correctly', () => {
    const message: ProtelisUpdateMessage = {
      envSize: {
        first: 5,
        second: 5,
      },
      nodes: [],
    };

    const ebMessage: EventBusMessage = {
      body: message,
      type: 'foo',
      address: 'bar',
      headers: {},
    };

    const ebHandler = eventBusMsgHandleBuilder<ProtelisUpdateMessage>((msg) => {
      expect(msg).not.toBeUndefined();
      expect(msg).toBe(message);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    ebHandler(null, ebMessage);
  });

  it('eventBusMsgHandleBuilder fails if no body', () => {
    const message: ProtelisUpdateMessage = {
      envSize: {
        first: 5,
        second: 5,
      },
      nodes: [],
    };

    const ebMessage: EventBusMessage<ProtelisUpdateMessage> = {
      body: message,
      type: 'foo',
      address: 'bar',
      headers: {},
    };

    const ebHandler = eventBusMsgHandleBuilder<ProtelisUpdateMessage>(() => {});

    expect(() => ebHandler(Error('foo'), ebMessage)).toThrow();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => ebHandler(Error('foo'), null)).toThrow();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(() => ebHandler(Error('foo'), undefined)).toThrow();
  });

  it('should map updates correctly', () => {
    const message: ProtelisUpdateMessage = {
      envSize: {
        first: 5,
        second: 5,
      },
      nodes: [
        {
          id: 'foo',
          coordinates: {
            first: 1,
            second: 2,
          },
        },
      ],
    };

    const payload: RenderPayload = {
      env: {
        width: message.envSize.first,
        height: message.envSize.second,
      },
      nodes: [
        {
          id: message.nodes[0].id,
          x: message.nodes[0].coordinates.first,
          y: message.nodes[0].coordinates.second,
        },
      ],
    };
    expect(mapUpdate(message)).toStrictEqual(payload);
  });
});
