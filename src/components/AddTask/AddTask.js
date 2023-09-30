import "./AddTask.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useTodos } from "../context/TodosContext";
// Local Components
import Todos from "../Todos/Todos";

const AddTask = () => {
 const { todos, setTodos } = useTodos();

  const [inputs, setInputs] = useState({
    title: "",
    details: "",
    date: "", // تم تضمين حقل التاريخ هنا
  });

  const [priority, setPriority] = useState("");

  const { title, details, date } = inputs;

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
      title,
      details,
      completed: false,
      priority,
      date,
    };

    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    handleClose();
    setInputs({ title: "", details: "", date: "" });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(data);
  }, [setTodos]);





  return (
    <div
      className="add_task"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Button
        fullWidth
        variant="contained"
        style={{fontSize:"1.6rem"}}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add New Task
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "start",
            flexDirection: "column",
            gap: "15px",
            alignItems: "start",
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

          <TextField
            label="Due Date"
            fullWidth
            type="date"
            value={date}
            onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
          />

          {/* Priority selection input */}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              label="Priority"
              onChange={handleChange}
            >
              <MenuItem value={"Low"}>Low </MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateTask}>Create Task</Button>
        </DialogActions>
      </Dialog>

      <Todos title={title} details={details} priority={priority} date={date} />
    </div>
  );
};

export default AddTask;
