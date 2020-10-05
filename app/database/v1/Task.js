class Task {
  static schema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      created_at: { type: 'date', default: new Date() },
    },
  }

  get prefixedName() {
    return `@${this.name}`
  }
}

export default Task
