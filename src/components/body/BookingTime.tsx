import React, { useState, useEffect, useRef } from "react";
import "./BookingTime.css";
import BookingModal from "./BookingModal";

// Define interfaces for state and props
interface TimeRange {
  start: string;
  end: string;
}

interface Address {
  id: number;
  img: string;
  locationVi: string;
  towerAddress: string;
  price: string;
  seats: string;
}

interface SavedData {
  title: string;
  TimeRange: TimeRange;
  tableIndex: number;
  selectedCells: number[];
  mergedCell: {
    startCell: number;
    endCell: number;
  };
}

const getDefaultTimes = () => ({
  startTime: 7,
  endTime: 14,
  cellsPerHour: 4,
});

const BookingTime: React.FC = () => {
  const [selectedCells, setSelectedCells] = useState<number[][]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSelecting, setIsSelecting] = useState(true);
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [draggingCell, setDraggingCell] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>({
    start: "",
    end: "",
  });
  const [activeTable, setActiveTable] = useState<number | null>(null);
  const [durationString, setDurationString] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [savedData, setSavedData] = useState<SavedData[]>([]);

  const { startTime, endTime, cellsPerHour } = getDefaultTimes();
  const modalRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const addressData: Address[] = [
    // ... (Define your address data here as in your original file)
  ];

  useEffect(() => {
    setSelectedCells(new Array(addressData.length).fill([]));

    const handleClickOutside = (event: MouseEvent) => {
      if (
        isModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
      if (
        !isModalOpen &&
        tableContainerRef.current &&
        !tableContainerRef.current.contains(event.target as Node)
      ) {
        setSelectedCells((prevSelected) => {
          return prevSelected.map((tableCells, tableIndex) => {
            const savedCells = savedData
              .filter((data) => data.tableIndex === tableIndex)
              .flatMap((data) => data.selectedCells);
            return tableCells.filter((cell) => savedCells.includes(cell));
          });
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addressData.length, isModalOpen, savedData]);

  const getTimeFromCellIndex = (index: number): string => {
    const hour = Math.floor(index / cellsPerHour) + startTime;
    const minute = (index % cellsPerHour) * (60 / cellsPerHour);
    return `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
  };

  const getDuration = (selectedCells: number[]): string => {
    if (selectedCells.length === 0) return "0h00";

    const startCellIndex = selectedCells[0];
    const endCellIndex = selectedCells[selectedCells.length - 1];

    const startMinutes =
      Math.floor(startCellIndex / cellsPerHour) * 60 +
      (startCellIndex % cellsPerHour) * (60 / cellsPerHour);
    const endMinutes =
      Math.floor(endCellIndex / cellsPerHour) * 60 +
      (endCellIndex % cellsPerHour) * (60 / cellsPerHour);
    const durationMinutes = endMinutes - startMinutes + 60 / cellsPerHour;

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours}h${minutes.toString().padStart(2, "0")}`;
  };

  const getTimeRangeFromCells = (cells: number[]): TimeRange => {
    if (cells.length === 0) return { start: "", end: "" };
    const sortedCells = [...cells].sort((a, b) => a - b);
    return {
      start: getTimeFromCellIndex(sortedCells[0]),
      end: getTimeFromCellIndex(sortedCells[sortedCells.length - 1] + 1),
    };
  };

  const handleCellClick = (tableIndex: number, index: number) => {
    setSelectedCells((prevSelected) => {
      const newSelection = [...prevSelected];
      if (newSelection[tableIndex].includes(index)) {
        newSelection[tableIndex] = newSelection[tableIndex].filter(
          (i) => i !== index
        );
      } else {
        newSelection[tableIndex] = [...newSelection[tableIndex], index].sort(
          (a, b) => a - b
        );
      }
      setDurationString(getDuration(newSelection[tableIndex]));
      return newSelection;
    });
  };

  const handleMouseDown = (tableIndex: number, index: number) => {
    setIsDragging(true);
    setStartIndex(index);
    setDraggingCell(index);
    setActiveTable(tableIndex);

    if (selectedCells[tableIndex].includes(index)) {
      setIsSelecting(false);
    } else {
      setIsSelecting(true);
    }
    handleCellClick(tableIndex, index);
  };

  const handleMouseOver = (tableIndex: number, index: number) => {
    if (isDragging && draggingCell !== index && activeTable === tableIndex) {
      setDraggingCell(index);
      const range = getRange(startIndex!, index);

      if (isSelecting) {
        setSelectedCells((prevSelected) => {
          const newSelection = [...prevSelected];
          newSelection[tableIndex] = Array.from(
            new Set([...newSelection[tableIndex], ...range])
          ).sort((a, b) => a - b);
          return newSelection;
        });
      } else {
        setSelectedCells((prevSelected) => {
          const newSelection = [...prevSelected];
          newSelection[tableIndex] = newSelection[tableIndex].filter(
            (i) => !range.includes(i)
          );
          return newSelection;
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartIndex(null);
    setDraggingCell(null);
    setActiveTable(null);
  };

  const handleDoubleClick = (tableIndex: number, index: number) => {
    if (selectedCells[tableIndex].includes(index)) {
      const { start, end } = getTimeRangeFromCells(selectedCells[tableIndex]);
      setSelectedTimeRange({ start, end });
      setIsModalOpen(true);
      setActiveTable(tableIndex);
    }
  };

  const getRange = (start: number, end: number): number[] => {
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    const range = [];
    for (let i = min; i <= max; i++) {
      range.push(i);
    }
    return range;
  };

  const getCellClassName = (tableIndex: number, index: number): string => {
    const saved = savedData.find(
      (data) =>
        data.tableIndex === tableIndex &&
        index >= data.mergedCell.startCell &&
        index <= data.mergedCell.endCell
    );

    if (saved) {
      return "cell saved";
    }

    if (isDragging && draggingCell === index && activeTable === tableIndex) {
      return "cell dragging";
    }

    if (!selectedCells[tableIndex].includes(index)) return "cell";

    const isFirst = !selectedCells[tableIndex].includes(index - 1);
    const isLast = !selectedCells[tableIndex].includes(index + 1);

    if (isFirst && isLast) return "cell selected single";
    if (isFirst) return "cell selected first";
    if (isLast) return "cell selected last";
    return "cell selected middle";
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const handleSave = () => {
    const newSavedData: SavedData = {
      title: inputTitle,
      TimeRange: selectedTimeRange,
      tableIndex: activeTable!,
      selectedCells: [...selectedCells[activeTable!]],
      mergedCell: {
        startCell: Math.min(...selectedCells[activeTable!]),
        endCell: Math.max(...selectedCells[activeTable!]),
      },
    };

    setSavedData((prevData) => [...prevData, newSavedData]);
    setSelectedCells((prevSelected) => {
      const newSelection = [...prevSelected];
      newSelection[activeTable!] = [];
      return newSelection;
    });
    setIsModalOpen(false);
    setSelectedTimeRange({ start: "", end: "" });
    setInputTitle("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTimeRange({ start: "", end: "" });
    setInputTitle("");
  };

  return (
    <div className="container">
      <div className="table-container" ref={tableContainerRef}>
        {addressData.map((address, tableIndex) => (
          <div key={address.id} className="table">
            <div className="table-header">
              <div className="image-container">
                <img src={address.img} alt="location" />
              </div>
              <h3>{address.locationVi}</h3>
              <p>{address.towerAddress}</p>
              <p>{address.price}</p>
              <p>{address.seats}</p>
            </div>
            <div
              className="table-grid"
              onMouseLeave={() => setDraggingCell(null)}
            >
              {Array.from(
                { length: (endTime - startTime) * cellsPerHour },
                (_, i) => (
                  <div
                    key={i}
                    className={getCellClassName(tableIndex, i)}
                    onMouseDown={() => handleMouseDown(tableIndex, i)}
                    onMouseOver={() => handleMouseOver(tableIndex, i)}
                    onMouseUp={handleMouseUp}
                    onDoubleClick={() => handleDoubleClick(tableIndex, i)}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal" ref={modalRef}>
          <BookingModal
            isOpen={isModalOpen} // Pass isOpen prop
            onClose={closeModal}
            onSave={handleSave}
            activeTable={activeTable ?? 0} // Pass activeTable prop with a default value
            addressData={addressData} // Pass addressData prop
            selectedTimeRange={selectedTimeRange}
            durationString={durationString}
            inputTitle={inputTitle} // Pass inputTitle prop
            title={inputTitle} // Pass title as needed
            handleTitle={handleTitle}
            startDate={new Date().toISOString().split("T")[0]} // Pass startDate as today's date in YYYY-MM-DD format
            handleSave={handleSave}
          />
        </div>
      )}
    </div>
  );
};

export default BookingTime;
