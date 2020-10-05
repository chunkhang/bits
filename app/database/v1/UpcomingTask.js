class UpcomingTask {
  static schema = {
    name: 'UpcomingTask',
    properties: {
      task: { type: 'Task' },
    },
  }
}

export default UpcomingTask
