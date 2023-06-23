import React from "react";
import {
  Drawer,
  TextField,
  Checkbox,
  TextareaAutosize,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormHelperText,
  Card,
} from "@mui/material";

export function ListItemDrawer(props: any) {
  const {
    selectedItem,
    drawerOpen,
    handleCloseDrawer,
    handleSave,
    handleInputChange,
    handleCheckboxChange,
    handleRadioChange,
    handleRemoveItem,
    handleAddItem,
    nameError,
    descriptionError,
    statusError,
    errorMessages,
  } = props;

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleCloseDrawer}
      sx={{
        width: "400px",
        "& .MuiDrawer-paper": {
          width: "400px",
        },
      }}
    >
      {selectedItem && (
        <div style={{ padding: 20 }}>
          <h2>{selectedItem.name}</h2>
          <form>
            <TextField
              label="Name"
              name="name"
              value={selectedItem.name}
              onChange={handleInputChange}
              fullWidth
              required
              inputProps={{ maxLength: 32 }}
              error={nameError}
              sx={{ marginBottom: "10px" }}
            />
            {nameError && (
              <FormHelperText error>{errorMessages.name}</FormHelperText>
            )}
            <Checkbox
              checked={selectedItem.viewed}
              onChange={handleCheckboxChange}
              sx={{ marginBottom: "10px" }}
            />
            <label style={{ marginBottom: "10px" }}>Viewed</label>
            <br />
            <TextareaAutosize
              placeholder="Description"
              name="description"
              value={selectedItem.description}
              onChange={handleInputChange}
              rows={4}
              cols={40}
              maxLength={100}
              style={{ marginTop: "10px", marginBottom: 25, height: 100 }}
              error={descriptionError}
            />
            {descriptionError && (
              <FormHelperText error>{errorMessages.description}</FormHelperText>
            )}

            <Card
              sx={{
                backgroundColor: "#E6F1F9",
                padding: "10px",
                marginBottom: "30px",
              }}
            >
              <RadioGroup
                aria-label="Status"
                name="status"
                value={selectedItem.status}
                onChange={handleRadioChange}
                onError={statusError}
                sx={{ fontSize: 8 }}
              >
                <FormControlLabel value="new" control={<Radio />} label="New" />
                <FormControlLabel
                  value="complete"
                  control={<Radio />}
                  label="Complete"
                  disabled={selectedItem.status === "complete"}
                />
                <FormControlLabel
                  value="in progress"
                  control={<Radio />}
                  label="In Progress"
                />
                <FormControlLabel
                  value="on hold"
                  control={<Radio />}
                  label="On Hold"
                />
                <FormControlLabel
                  value="archived"
                  control={<Radio />}
                  label="Archived"
                />
              </RadioGroup>
            </Card>
            {statusError && (
              <FormHelperText error>
                Please select a valid status.
              </FormHelperText>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddItem}
              sx={{ marginRight: "10px" }}
            >
              Add
            </Button>
            <Button
              onClick={() => handleRemoveItem(selectedItem)}
              variant="contained"
              color="secondary"
              // startIcon={<DeleteIcon />}
            >
              Remove
            </Button>
          </form>
        </div>
      )}
    </Drawer>
  );
}
