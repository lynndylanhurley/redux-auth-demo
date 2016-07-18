import { assert } from 'chai';
import { updateDemoTheme, updateDemoEndpoint } from '../../src/actions/demo-ui';
import { makeStore } from '../helper';

describe('demo-ui redux', () => {
  it('should update the demo theme', async () => {
    const { store } = await makeStore();
    assert.equal(
      'materialUi',
      store.getState().demoUi.get('theme')
    );

    store.dispatch(updateDemoTheme('bootstrap'));

    assert.equal(
      'bootstrap',
      store.getState().demoUi.get('theme')
    );
  });

  it('should update the demo endpoint', async () => {
    const { store } = await makeStore();
    assert.equal(
      'default',
      store.getState().demoUi.get('endpoint')
    );

    store.dispatch(updateDemoEndpoint('evilUser'));

    assert.equal(
      'evilUser',
      store.getState().demoUi.get('endpoint')
    );
  });
});
