import React, { useContext, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TodosContext } from "../context/TodosContext";

const Todo = ({ todo }) => {
  const { id, title, details, completed, priority, date } = todo;
  const [inputs, setInputs] = useState({ ...todo });

  const { todos, setTodos } = useContext(TodosContext);

  const priorityColors = {
    Low: "#faf089",
    Medium: "#68d391",
    High: "#e53e3e",
  };

  // EVENT HANDLERS
  function handleEditTask() {
    const updatedTodos = todos.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          title: inputs.title,
          priority: inputs.priority,
          details: inputs.details,
          date: inputs.date,
        };
      }
      return t;
    });

    setTodos(updatedTodos);
    handleClose();
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteTask() {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleCheck() {
    let checkTodo = todos.forEach((t) => {
      if (t.id === id) {
        return (t.completed = !t.completed);
      }
    });

    setInputs({ ...inputs, completed: checkTodo });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // DIALOG EVENTS
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, priority: e.target.value });
  };

  return (
    <div
      className="todo"
      style={{
        borderRadius: "20px",
        border: `solid 3px ${priorityColors[priority]}`,
        display: "flex",
        alignItems: "center",
        gap: "20px",
        margin: "10px auto",
        backgroundColor: "black",
        color: "white",
        justifyContent: "space-around",
        padding: "10px 20px",
      }}
    >
      <div
        className="highlight"
        style={{
          overflow: "hidden",
          borderRadius: "10px",
          flex: 1,
          minWidth: "30%",
       
        }}
      >
        <Accordion
          sx={{ background: "inherit", color: "inherit", textAlign: "start" }}
        >
          <AccordionSummary
            sx={{ padding: "10px 20px" }}
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{title}</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ padding: "5px 20px" }}>
            <Typography>{details}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div
        className="date_icons"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingRight: "20px",
          gap: "7px",
        }}
      >
        <div
          className="date"
          style={{ color: priorityColors[priority], textAlign: "end" }}
        >
          {date}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "3px",
          }}
          className="btn-edit_delete-check_group"
        >
          <IconButton
            onClick={handleClickOpen}
            sx={{ color: "#3182ce" }}
            aria-label="edit"
            size="medium"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            sx={{ color: "#c53030" }}
            onClick={handleDeleteTask}
            aria-label="delete"
            size="medium"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="check"
            onClick={handleCheck}
            size="medium"
            sx={{ color: "#2f855a" }}
            style={{
              color: completed ? "white" : "#2f855a",
              backgroundColor: completed ? "#2f855a" : "transparent",
            }}
          >
            <CheckIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>

      {/* DIALOG START */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Edit Title"
            type="text"
            fullWidth
            variant="standard"
            value={inputs.title}
            onChange={(e) => {
              setInputs({ ...inputs, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="details"
            label="Edit Details"
            type="text"
            value={inputs.details}
            fullWidth
            variant="standard"
            onChange={(e) => {
              setInputs({ ...inputs, details: e.target.value });
            }}
          />

          <TextField
            style={{ marginTop: 10 }}
            label="Due Date"
            fullWidth
            type="date"
            value={inputs.date}
            onChange={(e) => setInputs({ ...inputs, date: e.target.value })}
          />

          {/* Priority selection input */}
          <FormControl fullWidth style={{ marginTop: 10 }}>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={inputs.priority}
              label="Priority"
              onChange={handleChange}
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
          </FormControl>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditTask}>Edit</Button>
        </DialogActions>
      </Dialog>
      {/* END DIALOG */}
    </div>
  );
};

export default Todo;
