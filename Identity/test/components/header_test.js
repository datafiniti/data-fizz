import { renderComponent, expect } from '../test_helper';
import Header from '../../src/components/header';

describe('Header', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(Header);
  })
  it('has the correct links', () => {
    expect(component).to.contain('Home');
    expect(component).to.contain('Resources');
    expect(component).to.contain('Sign In');
  });
});
