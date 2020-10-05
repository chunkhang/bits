class TodayTask {
  static schema = {
    name: 'TodayTask',
    properties: {
      task: { type: 'Task' },
    },
  }
}

export default TodayTask
