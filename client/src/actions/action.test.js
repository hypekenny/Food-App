import { createRecipe, getDiets } from './index.js';

describe('Action Creators', () => {
    it('should return an action type CREATE_RECIPE and a payload', () => {
      const payload = { title: 'milanesa', summary: 'xxx' };
      expect(createRecipe(payload)).toEqual({
        type: 'create_recipe',
        payload: {
          ...payload,
          title: 'milanesa',
          summary: 'xxx',          
        }
      })
    });
})