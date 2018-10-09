import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// add RelativeTime plugin
dayjs.extend(relativeTime)

export const formatMessageDisplayDate = timestamp => {
  const now = dayjs()
  const time = dayjs(timestamp)
  const diff = now.valueOf() - timestamp

  if (time.isBefore(now.startOf('day'))) {
    return time.format('M/DD/YY h:mm a')
  }

  return diff > 60000 ? time.format('h:mm a') : time.fromNow()
}
