import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';

/* ---
NOTE: My specs test what gets rendered as opposed to individual methods to allow
      for other developers or myself to easily refactor my code
--- */

describe('CommentList', () => {
  // before each spec (inc. nested specs), create an instance of CommentBox
  let component;
  beforeEach(() => {
    const initState = { comments: ['New Comment', 'Other New Comment'] };
    component = renderComponent(CommentList, null, initState);
  })
  /* --- All of the specs for the CommentBox component --- */
  // Use 'it' to test a single attribute of/fact about a target (singular)
  // Use 'expect' to make an 'assertion' (declarative text) about a target (singular)
  it('shows an <li> for each comment', () => {
    expect(component.find('li').length).to.equal(2); // given two comments (above); # of <li>s should be 2
  });
  it('shows each comment that is provided', () => {
    expect(component).to.contain('New Comment'); // Comment 1
    expect(component).to.contain('Other New Comment'); // Comment 2
  });
});
