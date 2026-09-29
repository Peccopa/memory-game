import { describe, it, expect } from 'vitest';
import StateKit from '../index';

describe('StateKit - initialization', () => {
  it('should return initial state via getState', () => {
    const initialState = { count: 0 };

    const stateKit = new StateKit(initialState);

    const state = stateKit.getState();

    expect(state).toEqual(initialState);
  });

  it('should not mutate initial state reference', () => {
    const initialState = { count: 0 };

    const stateKit = new StateKit(initialState);

    const state = stateKit.getState();

    expect(state).toBe(initialState);
  });
});
