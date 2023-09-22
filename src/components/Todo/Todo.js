// MATERIAL UI
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const Todo = ({ todo }) => {
  const { id, title, details, completed, priority, date } = todo;
  console.log(id, title, details, completed, priority, date);

  let priorityHighlight =
    priority === "Low"
      ? " #faf089"
      : priority === "High"
      ? "#e53e3e"
      : priority === "Medium"
      ? "#68d391"
      : "white";

  // EVENT HANDLERS
  function handleEditTask() {}
  function handleDeleteTask() {}

  return (
    <div
      style={{
        borderRadius: "20px",
        border: "solid 2px #202124",
        borderLeftColor: priorityHighlight,
        display: "flex",
        alignItems: "center",
        gap: "20px",
        margin: "10px auto",
        backgroundColor: "#202124",
        color: "white",
        justifyContent: "space-around",
      }}
    >
      <div
        className="highlight"
        style={{
          overflow: "hidden",
          borderRadius: "10px",
          "--after-background-color": priorityHighlight,
          flex: 1,
          minWidth: "30%",
          padding: "10px",
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
          paddingRight: " 20px",
        }}
      >
        {" "}
        <div
          className="date"
          style={{ color: priorityHighlight, textAlign: "end" }}
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
            onClick={handleEditTask}
            sx={{ color: "#3182ce" }}
            aria-label="edit"
            size="large"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            sx={{ color: "#c53030" }}
            onClick={handleDeleteTask}
            aria-label="delete"
            size="large"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="check" size="large" sx={{ color: "#2f855a" }}>
            <CheckIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Todo;
