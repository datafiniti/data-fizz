import React from 'react';
import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

/* --- Set up testing environment to run like a browser on the command line --- */
// global.document inside the terminal is the equivalent of window.document in the browser
global.document = jsdom.jsdom('<!DOCTYPE html><html lang="en"><body></body></html>');
global.window = global.document.defaultView;
propagateToGlobal(global.window); // take properties of global window object and attach it to global object
const $ = jquery(global.window); // don't try to get access to DOM; just use global.window

/* --- Build 'renderComponent' helper that should render a given react class --- */
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
  return $(ReactDOM.findDOMNode(componentInstance)); // return produced HTML
}

/* --- Take all properties of the global window object and also attach it to the global object --- */
// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}

/* --- Build helper for simulating events and add as function to jQuery --- */
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
}

/* --- Set up chai-jquery --- */
chaiJquery(chai, chai.util, $);

/* --- Export helper methods --- */
export { renderComponent, expect };
