/*tslint:disable-next-line:ban */
const hasNotesResponse = require('../api-samples/has-notes-data/notes-response.json');
import { expectedNotesState } from './has-notes-data/notes-data-expectred-state';
export const mockResponses = {
  hasNotesResponse,
};
export const expectedState = { expectedNotesState };
