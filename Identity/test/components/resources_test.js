import { renderComponent, expect } from '../test_helper';
import Resources from '../../src/components/resources';

describe('Resources', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(Resources);
  });
  it('shows a comment box', () => {
    expect(component.find('.comment-box')).to.exist;
  });
  it('shows a comment list', () => {
    expect(component.find('.comment-list')).to.exist;
  });
});
