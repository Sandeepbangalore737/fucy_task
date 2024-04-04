import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import "./homepage.css";
import { useState } from "react";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    height: "100vh",
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    overflowY: "auto",
  },
}));
function Sidebar({ addComponent, items }) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [componentName, setComponentName] = useState("");
  const [componentProperties, setComponentProperties] = useState("");

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleAddComponent = () => {
    addComponent({
      name: componentName,
      properties: componentProperties,
    });
    setDialogOpen(false);
    setComponentName("");
    setComponentProperties("");
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Toolbar />

      <List sx={{ mt: 5, display: "block" }}>
        <ListItemButton>
          <ListItemText sx={{ textAlign: "center" }}>
            <Typography className="listItemActiveText">Model View</Typography>
          </ListItemText>
        </ListItemButton>
        {items.map((item, index) => (
          <ListItemButton key={index}>
            <ListItemText sx={{ textAlign: "center" }}>
              <Typography className="listItemText">{item}</Typography>
            </ListItemText>
          </ListItemButton>
        ))}

        <ListItemButton
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleDialogOpen}
        >
          <Button
            variant="outlined"
            sx={{ borderColor: "blue", color: "blue" }}
          >
            Create Component
          </Button>
        </ListItemButton>
      </List>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Component</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={componentName}
            onChange={(e) => setComponentName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Properties"
            fullWidth
            value={componentProperties}
            onChange={(e) => setComponentProperties(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddComponent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
}

export default Sidebar;
