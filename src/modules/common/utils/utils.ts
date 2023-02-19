import dayjs from 'dayjs'
import type { PointEstimate, DueDateInfo } from '@app-types/task'
import isToday from 'dayjs/plugin/isToday'
import calendar from 'dayjs/plugin/calendar'
import isYesterday from 'dayjs/plugin/isYesterday'
dayjs.extend(isToday)
dayjs.extend(calendar)
dayjs.extend(isYesterday)

export const text2Number = (word: PointEstimate) => {
  const numbers = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    FOUR: 4,
    EIGHT: 8,
  }
  return numbers[word]
}

export const formattedDueDate = (dueDate: string) => {
  const data: DueDateInfo = {
    formattedDate: '',
    date: dayjs(dueDate).format('MM-DD-YYYY hh:mm a'),
    status: 'ON_TIME',
  }

  if (dayjs().isBefore(dayjs(dueDate))) {
    const diff = dayjs(dueDate).diff(dayjs(), 'days')
    if (diff < 2) {
      data.status = 'ALMOST_LATE'
    } else {
      data.status = 'ON_TIME'
    }
  } else {
    data.status = 'LATE'
  }

  if (dayjs(dueDate).isYesterday()) {
    data.formattedDate = 'Yesterday'
  } else if (dayjs(dueDate).isToday()) {
    data.formattedDate = 'Today'
  } else {
    data.formattedDate = dayjs(dueDate).format('D MMMM, YYYY').toString()
  }

  return data
}
