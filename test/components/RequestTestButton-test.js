import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import { makeStore, apiUrl } from '../helper';
import RequestTestButton from '../../src/components/RequestTestButton';

function renderButton(store) {
  return (
    <Provider store={store}>
      <RequestTestButton
        path="/demo/members_only"
        endpointKey="default"
      />
    </Provider>
  );
}

describe('RequestTestButton', () => {
  it('should render the button', async () => {
    const { store } = await makeStore();
    const btnContainer = mount(renderButton(store));
    expect(btnContainer.find('button[type="button"]').length).to.equal(1);
  });

  it('should make requests when button is pressed', async done => {
    global.window.__API_URL__ = apiUrl;
    const targetUrl = `${apiUrl}/demo/members_only`;
    fetchMock.mock(targetUrl, {
      status: 200,
      body: { message: 'Welcome' }
    });
    const { store } = await makeStore();
    const btnContainer = mount(renderButton(store));
    btnContainer.find('button').simulate('click');
    expect(fetchMock.called(targetUrl)).to.equal(true);
    fetchMock.reset();
    done();
  });
});
