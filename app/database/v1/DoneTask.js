class DoneTask {
  static schema = {
    name: 'DoneTask',
    properties: {
      task: { type: 'Task' },
    },
  }
}

export default DoneTask
