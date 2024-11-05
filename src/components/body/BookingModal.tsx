import React from "react";
import "./BookingModal.css";
import { title } from "process";

interface TimeRange {
  start: string;
  end: string;
}

interface Address {
  img: string;
  locationVi: string;
  price: string;
  seats: string;
  towerAddress: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  activeTable: number;
  addressData: Address[];
  selectedTimeRange: TimeRange;
  durationString: string;
  inputTitle: string;
  title: string; 
  handleTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startDate: string;
  handleSave: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  activeTable,
  addressData,
  selectedTimeRange,
  durationString,
  handleTitle,
  startDate,
  handleSave,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-left">
          <img src={addressData[activeTable]?.img} alt="Meeting room" />
        </div>
        <div className="modal-right">
          <div className="modal-header">
            <div className="modal-address-name">
              <h2>{addressData[activeTable]?.locationVi}</h2>
            </div>
            <div className="modal-address-information">
              <div>
                <p>
                  {addressData[activeTable]?.price} VND/h -{" "}
                  {addressData[activeTable]?.seats} seats
                </p>
                <p>{addressData[activeTable]?.towerAddress}</p>
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div className="modal-body-left">
              <div className="modal-body-left-title">
                <label>
                  <p>Title</p>
                </label>
                <div className="inputTitle">
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    className="input-bordered"
                  />
                </div>
              </div>
              <div className="modal-body-left-time">
                <div className="modal-body-left-time-detail">
                  <p>Time</p>
                  <p>
                    {selectedTimeRange.start} - {selectedTimeRange.end}
                  </p>
                </div>
                <div className="modal-body-left-time-duration">
                  <p>Duration</p>
                  <p>{durationString}</p>
                </div>
              </div>
              <div className="modal-body-email">
                <label htmlFor="email" className="input-email">
                  Email to:
                </label>
                <input type="email" id="email" className="input-email-field" />
              </div>
              <div className="modal-body-recurrence">
                <label className="input-RP">Recurrence Pattern:</label>
                <div className="choosingRP">
                  <label>
                    <input type="radio" name="recurrence" value="only" /> Only
                  </label>
                  <label>
                    <input type="radio" name="recurrence" value="daily" /> Daily
                  </label>
                  <label>
                    <input type="radio" name="recurrence" value="weekly" />{" "}
                    Weekly
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-body-right">
              <div className="modal-body-right-time">
                <p>Date: {startDate}</p>
              </div>
              <div className="modal-body-right-content">
                <label htmlFor="contentBrief" className="input-CB">
                  Content Brief:
                </label>
                <textarea id="contentBrief" name="contentBrief"></textarea>
                <div className="save-button">
                  <button onClick={handleSave}>Lưu</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <span
          className="close-button"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        >
          &times;
        </span>
      </div>
    </div>
  );
};

export default BookingModal;
