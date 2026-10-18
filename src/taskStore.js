// A tiny in-memory store for tasks. No database needed for this demo.
function createTaskStore() {
  const tasks = [];
  let nextId = 1;

  return {
    list() {
      return tasks.slice();
    },
    get(id) {
      return tasks.find((task) => task.id === id) || null;
    },
    add(title) {
      const task = { id: nextId++, title: title.trim(), done: false };
      tasks.push(task);
      return task;
    },
  };
}

module.exports = { createTaskStore };
