import todosSlice, {initialState, setTodosCount} from './todosSlice';

describe('todosSlice', () => {
    it('should set todos count', function () {
        const action = {type: setTodosCount.type, payload: 1}
        const result = todosSlice(initialState, action)
        console.log(result)
        expect(result).toBe(1)
    });
})