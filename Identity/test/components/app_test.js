import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app'; // App class or component

/* ---
NOTE: My specs test what gets rendered as opposed to individual methods to allow
      for other developers or myself to easily refactor my code
--- */

// Use 'describe' to group together similar tests
describe('App', () => {
  // before each spec (inc. nested specs), create an instance of App
  let component;
  beforeEach(() => {
    component = renderComponent(App);
  });
  /* --- All of the specs for the App component --- */
  // Use 'it' to test a single attribute of/fact about a target (singular)
  // Use 'expect' to make an 'assertion' (declarative text) about a target (singular)
  it('shows a header', () => {
    expect(component.find('.header')).to.exist;
  });
});
