import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingInformation.css';
import { FaRegCalendar } from "react-icons/fa";
import BookingModal from './BookingModal';

const BookingInformation: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [numberOfSeats, setNumberOfSeats] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Duration options
  const getDurationOptions = () => {
    const options = [5, 10, 15, 20, 30, 60];
    return options.map((duration) => (
      <option key={duration} value={duration}>{duration} phút</option>
    ));
  };

  // Address options
  const getAddressOptions = () => {
    const options = ["Địa chỉ 1", "Địa chỉ 2", "Địa chỉ 3", "Địa chỉ 4", "Địa chỉ 5"];
    return options.map((address) => (
      <option key={address} value={address}>{address}</option>
    ));
  };

  // Filter handler
  const handleFilter = () => {
    console.log({ startTime, duration, numberOfSeats, address, roomName });
  };

  // Reset handler
  const handleReset = () => {
    setStartTime('');
    setDuration('');
    setNumberOfSeats('');
    setAddress('');
    setRoomName('');
    setStartDate(new Date());
  };

  return (
    <div className="room_filter">
      <div className='booking_date_zone'>
        <div className='date_picker'>
          <label>
            <DatePicker
              selected={startDate}
              placeholderText='Choose day booking'
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              calendarClassName="custom_calendar"
            />
            <div className='calendar_icon'>
              <FaRegCalendar />
            </div>
          </label>
        </div>
      </div>

      <div className='booking_time_zone'>
        <label>
          <input
            type="time"
            placeholder='Start Time'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
      </div>

      <div className='booking_duration_zone'>
        <label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Duration</option>
            {getDurationOptions()}
          </select>
        </label>
      </div>

      <div className='booking_seat_zone'>
        <label>
          <input
            type="number"
            placeholder='Number of Seat'
            value={numberOfSeats}
            onChange={(e) => setNumberOfSeats(e.target.value)}
          />
        </label>
      </div>

      <div className='booking_address_zone'>
        <label>
          <select 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
          >
            <option value="">Address</option>
            {getAddressOptions()}
          </select>
        </label>
      </div>

      <div className='find_by_room_name'>
        <label>
          <input
            type="text"
            placeholder='Search by room name'
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </label>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {isModalOpen && (
        <BookingModal
          startDate={startDate}
          setStartDate={setStartDate}
        />
      )}
    </div>
  );
};

export default BookingInformation;
