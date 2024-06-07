import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Button, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from '../../UI/Calendar/Calendar';
import MySelect from '../../UI/MySelect/MySelect';
import { logoutUser } from '../../redux/slice/authSlice';
import { setSelectedDate } from '../../redux/slice/dateRangeSlice';
import CategoryModal from '../CategoryModal/CategoryModal';
import { getDatesInRange } from '../TimeTrackingTable/TimeTrackingTable';
import styles from './Navigation.module.css';

function Navigation({ selectedCategory, setSelectedCategory, handleOpenRegisterModal }) {
  const [open, setOpen] = useState(false);

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const selectedDate = useSelector((state) => state.dateRange.selectedDate);
  const dateRange = useSelector((state) => state.dateRange.dateRange);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const initialDates = getDatesInRange(dateRange[0], dateRange[1]);

  const handleOpen = () => setOpen(true);

  function changeCalendarVisible() {
    isCalendarVisible ? setIsCalendarVisible(false) : setIsCalendarVisible(true);
  }
  const toogleDate = (direction) => {
    if (direction === 'prev' && !selectedDate.isSame(initialDates[0])) {
      dispatch(setSelectedDate(selectedDate.subtract(1, 'day')));
    }
    if (direction === 'next' && !selectedDate.isSame(initialDates.at(-1))) {
      dispatch(setSelectedDate(selectedDate.add(1, 'day')));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <div className={styles.navigation}>
          <div className={styles.navigation__left}>
            <div className={styles.navigation__buttons}>
              <Button
                disabled={selectedDate.isSame(initialDates[0])}
                variant="contained"
                onClick={() => toogleDate('prev')}>
                <ArrowBackIcon />
              </Button>
              <Button
                disabled={selectedDate.isSame(initialDates.at(-1))}
                variant="contained"
                onClick={() => toogleDate('next')}>
                <ArrowForwardIcon />
              </Button>
            </div>

            <h2 className="navigation__title">{selectedDate?.format('dddd, DD MMM')}</h2>
          </div>

          <div className={styles.navigation__right}>
            <IconButton onClick={changeCalendarVisible}>
              <CalendarMonthIcon />
            </IconButton>
            <div
              className={
                isCalendarVisible ? styles.navigation__calendarActive : styles.navigation__calendar
              }>
              {isCalendarVisible && (
                <Calendar changeCalendarVisible={changeCalendarVisible} />
              )}
            </div>
            <MySelect
              electedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <Button onClick={handleOpen}>Add CAtegory</Button>
            <CategoryModal open={open} setOpen={setOpen} />
            {user ? (
              <Button variant="contained" color="primary" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleOpenRegisterModal}>
                Login
              </Button>
            )}
          </div>
        </div>
      </Box>
    </Container>
  );
}

export default Navigation;
