import * as React from 'react';
import { ClickAwayListener } from '@mui/material';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useDispatch, useSelector } from 'react-redux';
import { setDateRange, setSelectedDate } from '../../redux/slice/dateRangeSlice';
import './Calendar.css';

function Calendar({ changeCalendarVisible }) {
  const dateRange = useSelector((state) => state.dateRange.dateRange);
  const dispatch = useDispatch();

  const handleDateChange = (dates) => {
    dispatch(setDateRange(dates));
    dispatch(setSelectedDate(dates[0]));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
        <DemoItem>
          <ClickAwayListener onClickAway={changeCalendarVisible}>
            <DateRangeCalendar calendars={1} value={dateRange} onChange={handleDateChange} />
          </ClickAwayListener>
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Calendar;
