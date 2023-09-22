import React, { useContext, useEffect, useState } from "react";
import "./AddTask.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { format } from "date-fns"; // استوردنا دالة format من مكتبة date-fns
//Local Component
import Todos from "../Todos/Todos";
import ToggleBtnGroup from "../FilterTodo/FilterTodo";
import { TodosContext } from "../context/TodosContext";
import { v4 as uuidv4 } from "uuid";
const AddTask = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const [inputs, setInputs] = useState({
    title: "", // قمت بتعديل قيمة الافتراض إلى فارغة
    details: "", // قمت بتعديل قيمة الافتراض إلى فارغة
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [priority, setPriority] = useState("");

  const { title, details } = inputs;

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTask = () => {
    const newTask = {
      id: Date.now(),
      title: title,
      details: details,
      completed: false,
      priority: priority,
      date: selectedDate,
    };

    const addTask = [...todos, newTask];
    setTodos(addTask);
    localStorage.setItem("todos", JSON.stringify(addTask));
    handleClose();

    setInputs("");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos") || []);
    setTodos(data);
  }, [setTodos]);

  return (
    <div
      className="add_task"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        margin: "30px auto",
        width: "80%",
      }}
    >
      <Button
        sx={{ display: "flex", justifyContent: "start", gap: 3 }}
        fullWidth
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        ADD NEW TASK
      </Button>

      <ToggleBtnGroup />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>

        <DialogContent
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            style={{ marginTop: "20px" }}
            value={title}
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          />
          <TextField
            id="outlined-multiline-static"
            label="Details"
            multiline
            rows={3}
            fullWidth
            value={details}
            onChange={(e) => setInputs({ ...inputs, details: e.target.value })}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              onChange={(newDate) => {
                setSelectedDate(format(newDate.$d, "MM/dd/yyyy"));
              }}
            />
          </LocalizationProvider>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priority}
                label="Priority"
                onChange={handleChange}
              >
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateTask}>Create Task</Button>
        </DialogActions>
      </Dialog>

      <Todos
        title={title}
        details={details}
        priority={priority}
        date={selectedDate}
      />
    </div>
  );
};

export default AddTask;
