import React, {Component} from 'react'
import './App.css'

const dayMap = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']

const monthMap = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const getCalendar = ({month, year}) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const lastDayOfMonth = new Date(year, month + 1, 0).getDay()
  const daysFromLastMonth = []
  const daysInThisMonth = []
  const daysFromNextMonth = []

  for (let i = 0; i < firstDayOfMonth; i++) {
    daysFromLastMonth.push(new Date(year, month, -i))
  }
  daysFromLastMonth.reverse()
  for (let i = 1; i <= daysInMonth; i++) {
    daysInThisMonth.push(new Date(year, month, i))
  }
  // Start on the day after the last day of the month
  for (let i = 1; i + lastDayOfMonth < 7; i++) {
    daysFromNextMonth.push(new Date(year, month, daysInMonth + i))
    daysFromNextMonth.reverse()
  }
  return daysFromLastMonth.concat(daysInThisMonth).concat(daysFromNextMonth)
}

const DateBox = ({date, inMonth}) =>
  <div className={`date-box ${inMonth && 'in-month'}`}>
    {date.getDate()}
  </div>

const CalendarRow = ({dates, month}) =>
  <div className="calendar-row">
    {dates.map(i => <DateBox date={i} inMonth={i.getMonth() === month} />)}
  </div>

const HeaderRow = () =>
  <div className="header-row">
    {dayMap.map(i =>
      <div className="header-box">
        {i}
      </div>
    )}
  </div>

class Calendar extends Component {
  render() {
    const dates = getCalendar(this.props)
    const {month, year} = this.props
    const firstRow = dates.slice(0, 7)
    const secondRow = dates.slice(7, 14)
    const thirdRow = dates.slice(14, 21)
    const fourthRow = dates.slice(21, 28)
    const fifthRow = dates.slice(28, 35)

    return (
      <div className="calendar">
        <h2>
          {monthMap[month]} {year}
        </h2>
        <HeaderRow />
        <CalendarRow dates={firstRow} month={this.props.month} />
        <CalendarRow dates={secondRow} month={this.props.month} />
        <CalendarRow dates={thirdRow} month={this.props.month} />
        <CalendarRow dates={fourthRow} month={this.props.month} />
        <CalendarRow dates={fifthRow} month={this.props.month} />
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()
    const now = new Date()
    this.state = {
      month: now.getMonth(),
      year: now.getFullYear()
    }
  }
  changeMonth = n => {
    const {month, year} = this.state
    if (month + n > 11) {
      this.setState({
        month: 0,
        year: year + 1
      })
    } else if (month + n < 0) {
      this.setState({
        month: 11,
        year: year - 1
      })
    } else {
      this.setState({
        month: month + n
      })
    }
  }
  submitDate = () => {
    const input = document.getElementById('date-input')
    const timestamp = parseInt(input.value)

    const newDate = new Date(timestamp)
    this.setState({month: newDate.getMonth(), year: newDate.getFullYear()})
  }
  render() {
    const {month, year} = this.state
    return (
      <div className="App">
        <input type="text" id="date-input" placeholder="enter a date" />
        <button onClick={this.submitDate}>submit</button>
        <div className="row">
          <button onClick={() => this.changeMonth(-1)}>back</button>
          <Calendar month={month} year={year} />
          <button onClick={() => this.changeMonth(1)}>forward</button>
        </div>
      </div>
    )
  }
}

export default App
