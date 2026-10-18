const { createTaskStore } = require('../src/taskStore');

describe('taskStore', () => {
  test('add() trims the title and assigns increasing ids', () => {
    const store = createTaskStore();
    const first = store.add('  first  ');
    const second = store.add('second');
    expect(first).toEqual({ id: 1, title: 'first', done: false });
    expect(second.id).toBe(2);
  });

  test('get() returns null for an unknown id', () => {
    const store = createTaskStore();
    expect(store.get(42)).toBeNull();
  });
});
