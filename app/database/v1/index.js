import Task from './Task'
import UpcomingTask from './UpcomingTask'
import TodayTask from './TodayTask'
import DoneTask from './DoneTask'

const schema = {
  schemaVersion: 1,
  schema: [
    Task,
    UpcomingTask,
    TodayTask,
    DoneTask,
  ],
}

export default schema
