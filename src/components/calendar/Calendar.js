import React, { useState, useEffect, useCallback } from "react";
import "./calendar.css";

const formatDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");
  const [taskCategory, setTaskCategory] = useState("content");
  const [taskFile, setTaskFile] = useState(null);
  const [taskList, setTaskList] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [viewMode, setViewMode] = useState("month");
  const [draggedTask, setDraggedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const [today, setToday] = useState(new Date());

  const userName = "User";

  const categories = {
    content: { label: "Content", color: "#4285f4" },
    linkbuilding: { label: "Link Building", color: "#ea4335" },
    technical: { label: "Technical SEO", color: "#34a853" },
    meeting: { label: "Meeting", color: "#fbbc05" },
    audit: { label: "Audit", color: "#9c27b0" },
  };

  useEffect(() => {
    const formattedToday = formatDate(today);
    setTasks((prev) => ({
      ...prev,
      [formattedToday]: prev[formattedToday] || [],
    }));
    setSelectedDate(today);
    setCurrentDate(today);

    const getTimeUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return midnight.getTime() - now.getTime();
    };

    const updateToday = () => {
      const newToday = new Date();
      setToday(newToday);
      const formattedNewToday = formatDate(newToday);
      setTasks((prev) => ({
        ...prev,
        [formattedNewToday]: prev[formattedNewToday] || [],
      }));
    };

    const timeout = setTimeout(() => {
      updateToday();
      const interval = setInterval(updateToday, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, getTimeUntilMidnight());

    return () => clearTimeout(timeout);
  }, []);

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const getWeekNumber = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstMonday =
      firstDayOfMonth.getDay() === 1
        ? firstDayOfMonth
        : new Date(
            firstDayOfMonth.setDate(
              firstDayOfMonth.getDate() + ((8 - firstDayOfMonth.getDay()) % 7)
            )
          );
    const dayOfMonth = date.getDate();
    const daysSinceFirstMonday =
      firstMonday.getDate() <= dayOfMonth
        ? dayOfMonth - firstMonday.getDate()
        : getDaysInMonth(date.getFullYear(), date.getMonth() - 1) -
          firstMonday.getDate() +
          dayOfMonth;
    return Math.floor(daysSinceFirstMonday / 7) + 1;
  };

  const getWeekDays = (date) => {
    const start = new Date(date);
    const weekNumber = getWeekNumber(start);
    const firstDayOfMonth = new Date(start.getFullYear(), start.getMonth(), 1);
    const firstMonday =
      firstDayOfMonth.getDay() === 1
        ? firstDayOfMonth
        : new Date(
            firstDayOfMonth.setDate(
              firstDayOfMonth.getDate() + ((8 - firstDayOfMonth.getDay()) % 7)
            )
          );

    const weekStart = new Date(firstMonday);
    weekStart.setDate(firstMonday.getDate() + (weekNumber - 1) * 7);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      return d;
    });
  };

  const navigateMonth = (direction) =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );

  const navigateToToday = () => {
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleTaskSubmit = () => {
    if (!selectedDate || !newTask.trim()) return;
    const formattedDate = formatDate(selectedDate);
    const taskObj =
      modalMode === "add"
        ? {
            id: Date.now(),
            text: newTask,
            category: taskCategory,
            file: taskFile,
            list: taskList
              ? taskList.split("\n").filter((item) => item.trim())
              : [],
            notes: taskNotes,
          }
        : {
            ...editingTask,
            text: newTask,
            category: taskCategory,
            file: taskFile || editingTask.file,
            list: taskList
              ? taskList.split("\n").filter((item) => item.trim())
              : editingTask.list || [],
            notes: taskNotes || editingTask.notes,
          };

    setTasks((prev) => ({
      ...prev,
      [formattedDate]:
        modalMode === "add"
          ? [...(prev[formattedDate] || []), taskObj]
          : prev[formattedDate].map((t) =>
              t.id === editingTask.id ? taskObj : t
            ),
    }));

    if (modalMode === "add") {
      setNotification({
        show: true,
        message: `Task "${newTask}" successfully scheduled for ${selectedDate.toLocaleDateString(
          "en-US",
          { month: "long", day: "numeric", year: "numeric" }
        )}.`,
      });
      setTimeout(
        () => setNotification((prev) => ({ ...prev, show: false })),
        3000
      );
    }

    setNewTask("");
    setTaskCategory("content");
    setTaskFile(null);
    setTaskList("");
    setTaskNotes("");
    setEditingTask(null);
    setShowModal(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setTaskFile(URL.createObjectURL(file));
  };

  const deleteTask = (date, taskId) => {
    const formattedDate = formatDate(date);
    setTasks((prev) => ({
      ...prev,
      [formattedDate]: prev[formattedDate].filter((t) => t.id !== taskId),
    }));
  };

  const editTask = (date, task) => {
    setSelectedDate(date);
    setEditingTask(task);
    setNewTask(task.text);
    setTaskCategory(task.category);
    setTaskFile(task.file || null);
    setTaskList(task.list?.join("\n") || "");
    setTaskNotes(task.notes || "");
    setModalMode("edit");
    setShowModal(true);
  };

  const handleDragStart = (date, taskId) => {
    const formattedDate = formatDate(date);
    setDraggedTask({
      originalDate: formattedDate,
      task: tasks[formattedDate].find((t) => t.id === taskId),
    });
  };

  const handleDrop = (e, date) => {
    e.preventDefault();
    if (!draggedTask) return;

    const targetDate = formatDate(date);
    if (targetDate === draggedTask.originalDate) return;

    setTasks((prev) => {
      const updated = { ...prev };
      updated[draggedTask.originalDate] = updated[
        draggedTask.originalDate
      ].filter((t) => t.id !== draggedTask.task.id);

      if (!updated[draggedTask.originalDate].length) {
        delete updated[draggedTask.originalDate];
      }

      updated[targetDate] = [...(updated[targetDate] || []), draggedTask.task];
      return updated;
    });

    setDraggedTask(null);

    setNotification({
      show: true,
      message: `Task "${
        draggedTask.task.text
      }" moved to ${date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}.`,
    });
    setTimeout(
      () => setNotification((prev) => ({ ...prev, show: false })),
      3000
    );
  };

  const openAddTaskModal = (date) => {
    setSelectedDate(date);
    setNewTask("");
    setTaskCategory("content");
    setTaskFile(null);
    setTaskList("");
    setTaskNotes("");
    setEditingTask(null);
    setModalMode("add");
    setShowModal(true);
  };

  const getWeeklySummary = () => {
    const weekDays = getWeekDays(currentDate);
    const weekTasks = weekDays
      .map((date) => tasks[formatDate(date)] || [])
      .flat();
    const totalTasks = weekTasks.length;

    const tasksByCategory = {};
    Object.keys(categories).forEach((cat) => {
      tasksByCategory[cat] = weekTasks.filter(
        (task) => task.category === cat
      ).length;
    });

    return { totalTasks, tasksByCategory };
  };

  const getOverallSummary = () => {
    const allTasks = Object.values(tasks).flat();
    const totalTasks = allTasks.length;
    const tasksWithFiles = allTasks.filter((task) => task.file).length;
    const tasksWithLists = allTasks.filter((task) => task.list?.length).length;
    const tasksWithNotes = allTasks.filter((task) => task.notes).length;

    const tasksByCategory = {};
    Object.keys(categories).forEach((cat) => {
      tasksByCategory[cat] = allTasks.filter(
        (task) => task.category === cat
      ).length;
    });

    return {
      totalTasks,
      tasksWithFiles,
      tasksWithLists,
      tasksWithNotes,
      tasksByCategory,
    };
  };

  const renderCalendarHeader = () => (
    <div className="calendar-header">
      <div className="calendar-controls">
        <button onClick={() => navigateMonth(-1)} className="nav-button">
          {"<"}
        </button>
        <h2>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={() => navigateMonth(1)} className="nav-button">
          {">"}
        </button>
      </div>
      <div className="view-controls">
        {["month", "week", "day"].map((mode) => (
          <button
            key={mode}
            className={`view-button ${viewMode === mode ? "active" : ""}`}
            onClick={() => setViewMode(mode)}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setShowSummaryModal(true)}
          className="summary-button"
        >
          Summary
        </button>
        <button onClick={navigateToToday} className="today-button">
          Today
        </button>
      </div>
    </div>
  );

  const renderDayNames = () => (
    <div className="day-names">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="day-name">
          {day}
        </div>
      ))}
    </div>
  );

  const renderTaskList = (taskItems, date) => (
    <ul className="task-list">
      {taskItems.map((task) => (
        <li
          key={task.id}
          className="task-item"
          draggable
          onDragStart={() => handleDragStart(date, task.id)}
        >
          <div
            className="task-category-indicator"
            style={{ backgroundColor: categories[task.category].color }}
          />
          <div className="task-content">
            <span className="task-text">{task.text}</span>
            <span className="task-category">
              {categories[task.category].label}
            </span>
            {task.file && (
              <img
                src={task.file}
                alt="Task attachment"
                className="task-attachment"
              />
            )}
            {task.list?.length > 0 && (
              <ul className="task-sublist bullet-list">
                {task.list.map((item, index) => (
                  <li key={index} className="bullet-item">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {task.notes && <p className="task-notes">{task.notes}</p>}
          </div>
          <div className="task-actions">
            <button
              className="task-action-button edit"
              onClick={() => editTask(date, task)}
              title="Edit task"
            >
              ✎
            </button>
            <button
              className="task-action-button delete"
              onClick={() => deleteTask(date, task.id)}
              title="Delete task"
            >
              ×
            </button>
          </div>
        </li>
      ))}
    </ul>
  );

  const renderNoTasks = () => <p className="no-tasks">No tasks scheduled.</p>;

  const renderView = () => {
    const todayFormatted = formatDate(today);
    switch (viewMode) {
      case "month":
        const daysInMonth = getDaysInMonth(
          currentDate.getFullYear(),
          currentDate.getMonth()
        );
        const firstDay = getFirstDayOfMonth(
          currentDate.getFullYear(),
          currentDate.getMonth()
        );
        const days = [];
        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++)
          days.push(
            new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
          );
        while (days.length % 7 !== 0) days.push(null);

        return (
          <div className="calendar-grid">
            {renderDayNames()}
            <div className="calendar-days">
              {days.map((date, i) => {
                if (!date)
                  return <div key={i} className="calendar-day other-month" />;
                const formattedDate = formatDate(date);
                const isToday = formattedDate === todayFormatted;
                const dayTasks = tasks[formattedDate] || [];
                return (
                  <div
                    key={formattedDate}
                    className={`calendar-day ${isToday ? "today" : ""} ${
                      selectedDate && formattedDate === formatDate(selectedDate)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => setSelectedDate(date)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, date)}
                  >
                    <div className="day-number">{date.getDate()}</div>
                    {dayTasks.map((task) => (
                      <div
                        key={task.id}
                        className="task-indicator"
                        style={{
                          backgroundColor: categories[task.category].color,
                        }}
                        title={task.text}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "week":
        const weekDays = getWeekDays(currentDate);
        const { totalTasks, tasksByCategory } = getWeeklySummary();
        const weekNumber = getWeekNumber(currentDate);
        const weekOrdinal =
          weekNumber === 1
            ? "1st"
            : weekNumber === 2
            ? "2nd"
            : weekNumber === 3
            ? "3rd"
            : `${weekNumber}th`;
        return (
          <div className="week-view">
            <div className="week-header">
              <h3>{`${weekOrdinal} Week of ${currentDate.toLocaleString(
                "default",
                { month: "long" }
              )}`}</h3>
              {weekDays.some((day) => formatDate(day) === todayFormatted) && (
                <span className="today-label">Today</span>
              )}
            </div>
            <div className="week-summary">
              <div className="summary-section">
                <h4>Weekly Summary</h4>
                <p>Total Tasks: {totalTasks}</p>
                <div className="category-summary">
                  {Object.entries(tasksByCategory).map(([cat, count]) =>
                    count > 0 ? (
                      <div key={cat} className="category-stat">
                        <div
                          className="category-dot"
                          style={{ backgroundColor: categories[cat].color }}
                        ></div>
                        <span>
                          {categories[cat].label}: {count}
                        </span>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
            <div className="week-content custom-scrollbar">
              {weekDays.map((date) => {
                const formattedDate = formatDate(date);
                const isToday = formattedDate === todayFormatted;
                const dayTasks = tasks[formattedDate] || [];
                return (
                  <div
                    key={formattedDate}
                    className={`week-day ${isToday ? "today" : ""}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, date)}
                  >
                    <h4>
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      {isToday && <span className="today-label">Today</span>}
                    </h4>
                    {dayTasks.length
                      ? renderTaskList(dayTasks, date)
                      : renderNoTasks()}
                    <button
                      className="add-task-button"
                      onClick={() => openAddTaskModal(date)}
                    >
                      + Add Task
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "day":
        const formattedDate = formatDate(currentDate);
        const isToday = formattedDate === todayFormatted;
        const dayTasks = tasks[formattedDate] || [];
        return (
          <div className="day-view">
            <div className="day-header">
              <h3>
                {currentDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              {isToday && <span className="today-label">Today</span>}
            </div>
            <div className="day-tasks custom-scrollbar">
              {dayTasks.length
                ? renderTaskList(dayTasks, currentDate)
                : renderNoTasks()}
              <button
                className="add-task-button"
                onClick={() => openAddTaskModal(currentDate)}
              >
                + Add Task
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderTaskPanel = () => {
    if (!selectedDate) return null;
    const formattedDate = formatDate(selectedDate);
    const dayTasks = tasks[formattedDate] || [];
    return (
      <div className="task-panel custom-scrollbar">
        <h3>
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h3>
        {dayTasks.length
          ? renderTaskList(dayTasks, selectedDate)
          : renderNoTasks()}
        <button
          className="add-task-button"
          onClick={() => openAddTaskModal(selectedDate)}
        >
          + Add Task
        </button>
      </div>
    );
  };

  const renderTaskModal = () =>
    showModal && (
      <div className="modal-overlay" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h3>
            {modalMode === "add" ? "Add" : "Edit"} Task for{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <div className="form-group">
            <label>Task Description</label>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task description"
              className="task-input"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <div className="category-selector">
              {Object.entries(categories).map(([key, { label, color }]) => (
                <div
                  key={key}
                  className={`category-option ${
                    taskCategory === key ? "selected" : ""
                  }`}
                  onClick={() => setTaskCategory(key)}
                >
                  <div
                    className="category-color"
                    style={{ backgroundColor: color }}
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Attach File (Optional)</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="file-input"
            />
            {taskFile && (
              <div className="file-preview-container">
                <img src={taskFile} alt="Preview" className="file-preview" />
                <button
                  className="remove-file"
                  onClick={() => setTaskFile(null)}
                  title="Remove file"
                >
                  <span className="remove-file-x">×</span>
                </button>
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Add List (Optional, one item per line)</label>
            <textarea
              value={taskList}
              onChange={(e) => setTaskList(e.target.value)}
              placeholder="Enter list items, one per line"
              className="task-input"
              rows="3"
            />
            {taskList && (
              <div className="list-preview">
                <strong>Preview:</strong>
                <ul className="bullet-list">
                  {taskList
                    .split("\n")
                    .filter((item) => item.trim())
                    .map((item, index) => (
                      <li key={index} className="bullet-item">
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Add Notes (Optional)</label>
            <textarea
              value={taskNotes}
              onChange={(e) => setTaskNotes(e.target.value)}
              placeholder="Enter additional notes"
              className="task-input"
              rows="3"
            />
          </div>
          <div className="modal-actions">
            <button
              className="cancel-button"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="save-button"
              onClick={handleTaskSubmit}
              disabled={!newTask.trim()}
            >
              {modalMode === "add" ? "Add" : "Update"} Task
            </button>
          </div>
        </div>
      </div>
    );

  const renderSummaryModal = () => {
    if (!showSummaryModal) return null;
    const {
      totalTasks,
      tasksWithFiles,
      tasksWithLists,
      tasksWithNotes,
      tasksByCategory,
    } = getOverallSummary();
    return (
      <div className="modal-overlay" onClick={() => setShowSummaryModal(false)}>
        <div
          className="modal summary-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>Task Summary</h3>
          <div className="summary-content">
            <p>
              <strong>Total Tasks:</strong> {totalTasks}
            </p>
            <p>
              <strong>Tasks with Files:</strong> {tasksWithFiles}
            </p>
            <p>
              <strong>Tasks with Lists:</strong> {tasksWithLists}
            </p>
            <p>
              <strong>Tasks with Notes:</strong> {tasksWithNotes}
            </p>
            <h4>Tasks by Category</h4>
            <div className="category-summary">
              {Object.entries(tasksByCategory).map(([cat, count]) => (
                <div key={cat} className="category-stat">
                  <div
                    className="category-dot"
                    style={{ backgroundColor: categories[cat].color }}
                  ></div>
                  <span>
                    {categories[cat].label}: {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button
              className="cancel-button"
              onClick={() => setShowSummaryModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderNotification = () => {
    if (!notification.show) return null;
    return (
      <div className="notification">
        <p>{notification.message}</p>
      </div>
    );
  };

  return (
    <div className="calendar-container">
      {renderCalendarHeader()}
      <div className="calendar-content">
        {renderView()}
        {(viewMode === "month" || viewMode === "week") &&
          selectedDate &&
          renderTaskPanel()}
      </div>
      {renderTaskModal()}
      {renderSummaryModal()}
      {renderNotification()}
    </div>
  );
};

export default Calendar;
