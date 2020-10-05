class Task {
  static schema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
    },
  }

  get prefixedName() {
    return `@${this.name}`
  }
}

export default Task
