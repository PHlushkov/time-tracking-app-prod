import { Box, Container } from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../../redux/slice/dateRangeSlice';
import styles from './TimeTrackingTable.module.css';

export const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    dates.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};

function TimeTrackingTable() {
  const dateRange = useSelector((state) => state.dateRange.dateRange);
  const selectedDate = useSelector((state) => state.dateRange.selectedDate);
  const tasks = useSelector((state) => state.tasks.tasks);
  const initialDates = getDatesInRange(dateRange[0], dateRange[1]);
  const dispatch = useDispatch();

  const calculateTotalTime = (date) => {
    return tasks
      .filter((task) => dayjs(task.date, 'DD.MM.YYYY').isSame(date, 'day'))
      .reduce((total, task) => total + task.time, 0);
  };

  const calculateTotalTimeForAllDates = () => {
    return initialDates.reduce((total, date) => total + calculateTotalTime(date), 0);
  };

  const totalTimeForAllDates = calculateTotalTimeForAllDates();
  const formattedTotalTime = new Date(totalTimeForAllDates * 1000).toISOString().substr(11, 8);

  return (
    <Container sx={{ marginTop: '40px', overflowX: 'auto' }} maxWidth="lg">
      <Box sx={{ display: 'flex', gap: '5px', width: '100%', justifyContent: 'space-between' }}>
        {initialDates.map((value, index) => {
          const isSelected = value.isSame(selectedDate, 'day');
          const totalTime = calculateTotalTime(value);
          const formattedTime = new Date(totalTime * 1000).toISOString().substr(11, 8);

          return (
            <div
              key={index}
              className={`${styles.dayOfTheWeek} ${isSelected ? styles.selected : ''}`}
              onClick={() => {
                dispatch(setSelectedDate(value));
              }}>
              {value.format('ddd')}
              <p>{formattedTime}</p>
            </div>
          );
        })}
        <div className={styles.total__time}>
          <h3>Total: {formattedTotalTime}</h3>
        </div>
      </Box>
    </Container>
  );
}

export default TimeTrackingTable;
