import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box.js';

/* ---
NOTE: My specs test what gets rendered as opposed to individual methods to allow
      for other developers or myself to easily refactor my code
--- */

describe('CommentBox', () => {
  // before each spec (inc. nested specs), create an instance of CommentBox
  let component;
  beforeEach(() => {
    component = renderComponent(CommentBox);
  });
  /* --- All of the specs for the CommentBox component --- */
  // Use 'it' to test a single attribute of/fact about a target (singular)
  // Use 'expect' to make an 'assertion' (declarative text) about a target (singular)
  it('has the correct class', () => {
    expect(component).to.have.class('comment-box');
  });
  it('has a text area', () => {
    expect(component.find('textarea')).to.exist;
  });
  it('has a button', () => {
    expect(component.find('button')).to.exist;
  });
  describe('entering some text', () => {
    beforeEach(() => {
      component.find('textarea').simulate('change', 'new comment');
    });
    it('shows that text in the textarea', () => {
      expect(component.find('textarea')).to.have.value('new comment');
    });
    it('when submitted, clears the textarea', () => {
      // the component is the form itself
      // console.log('component:', component);
      component.simulate('submit');
      expect(component.find('textarea')).to.have.value('');
    });
  });
});
