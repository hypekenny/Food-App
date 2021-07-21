import { createRecipe, getRecipes } from './index.js';

describe('Action Creators', () => {
    test('should return an action type CREATE_RECIPE', () => {
      const payload = { title: 'milanesa', summary: 'xxx' };
      return expect(createRecipe(payload)).resolves.toBe({
        type: 'CREATE_RECIPE',
        payload: {
          ...payload,
          title: 'milanesa',
          summary: 'xxx',          
        }
      })
    });
    test('should return an action type GET_RECIPES and a payload', () => {
      return expect(getRecipes('pasta')).resolves.toBe({
        type: 'get_recipes',
        payload: 'data'
      })

    })
})