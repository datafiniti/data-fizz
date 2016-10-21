import { expect } from '../test_helper';
import {
  SAVE_COMMENT,
  CHANGE_AUTH,
  FETCH_USERS,
} from '../../src/actions/types';
import {
  saveComment,
  authenticate,
  fetchUsers,
} from '../../src/actions';

describe('actions', () => {
  describe('saveComment', () => {
    it('has the correct type', () => {
      const action = saveComment();
      expect(action.type).to.equal(SAVE_COMMENT);
    });
    it('has the correct payload', () => {
      const action = saveComment('new comment');
      expect(action.payload).to.equal('new comment');
    });
  });
  describe('authenticate', () => {
    it('has the correct type', () => {
      const action = authenticate();
      expect(action.type).to.equal(CHANGE_AUTH);
    });
    it('has the correct payload', () => {
      const action = authenticate(true);
      expect(action.payload).to.be.true;
    });
  });
  describe('fetchUsers', () => {
    it('has the correct type', () => {
      const action = fetchUsers();
      expect(action.type).to.equal(FETCH_USERS);
    });
    it('has the correct payload', () => {
      const action = fetchUsers();
      expect(action.payload).to.be.instanceOf(Object);
    });
  });
});
