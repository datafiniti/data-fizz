import { renderComponent, expect } from '../test_helper';

import App from '../../src/components/app';

describe('App', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(App)
  })

  it('shows a comment box', () => {
    //expect(component.find('')).to.exist;
  })
})