import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RenderPayload } from '../../utils/eventBusUtils';

export type EventBusStatus = 'open' | 'pending' | 'closed';
type AlchemistStatus = 'INIT' | 'READY' | 'PAUSED' | 'RUNNING' | 'TERMINATED';
export type ExecutionStatus = 'disconnected' | 'connecting' | AlchemistStatus;

export interface ExecState {
  connection: EventBusStatus;
  execution: {
    drawing: RenderPayload | null;
    id: string | null;
    status: ExecutionStatus;
  };
}

export const initialState: ExecState = {
  connection: 'closed',
  execution: {
    drawing: null,
    id: null,
    status: 'disconnected',
  },
};

const execSlice = createSlice({
  name: 'exec',
  initialState,
  reducers: {
    ebConnected(state) {
      state.connection = 'open';
    },
    ebConnecting(state) {
      state.connection = 'pending';
    },
    ebDisconnected(state) {
      state.connection = 'closed';
    },
    setId(state, action: PayloadAction<string>) {
      state.execution.id = action.payload;
      if (state.execution.status === 'disconnected') {
        state.execution.status = 'connecting';
      }
    },
    drawInit(state, action: PayloadAction<RenderPayload>) {
      state.execution = {
        status: 'RUNNING',
        drawing: action.payload,
        id: state.execution.id,
      };
    },
    drawStep(state, action: PayloadAction<RenderPayload>) {
      state.execution = {
        status: state.execution.status,
        drawing: action.payload,
        id: state.execution.id,
      };
    },
    drawEnd(state, action: PayloadAction<RenderPayload>) {
      state.execution = {
        status: 'TERMINATED',
        drawing: action.payload,
        id: state.execution.id,
      };
    },
  },
});

export const {
  drawEnd,
  drawInit,
  drawStep,
  ebConnected,
  ebConnecting,
  ebDisconnected,
  setId,
} = execSlice.actions;

export default execSlice.reducer;
