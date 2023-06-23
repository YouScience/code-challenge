import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import ReactLoading from "react-loading";
import Joi from "joi";
import { ListItemDrawer } from "../ListItemDrawer";
import "../../styles.css";

// Define the data structure and sample data
type Status = "new" | "complete" | "in progress" | "on hold" | "archived";

type Item = {
  id: number; // Added id field
  name: string;
  viewed: boolean;
  description: string;
  status: Status;
};

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
const API_BASE_URL = "http://localhost:3000";

export const CustomList = () => {
  const [data, setData] = useState<Item[]>([]); // Store the data array
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); // Store the selected item
  const [drawerOpen, openDrawer] = useState(true);
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const defaultState: Item = {
    id: 0,
    name: "",
    viewed: false,
    description: "",
    status: "new",
  };

  const itemSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).max(32).required(),
    description: Joi.string().min(3).max(100),
    status: Joi.string()
      .valid("new", "complete", "in progress", "on hold", "archived")
      .required(),
    viewed: Joi.boolean(),
  });

  // useEffect(() => {
  //   // Mock asynchronous GET request using a delay of 2 seconds
  //   const fetchData = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     setData(initialData);
  //     setLoading(false); // Set loading state to false after data is fetched
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/list`);
      const jsonData = await response.json();
      console.log(jsonData, "-----jsonData");
      setData(jsonData);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle row/item click event
  const handleRowClick = (item: Item) => {
    setSelectedItem(item);
    openDrawer(true);
  };

  const handleCloseDrawer = () => {
    openDrawer(false);
    resetErrors();
  };

  const handleOpenDrawer = () => {
    openDrawer(true);
    setSelectedItem(defaultState);
    resetErrors();
  };

  // To handle adding a new item
  const handleAddItem = async () => {
    const errors = validateItem(selectedItem);
    setErrorMessages(errors);
    console.log(errors, "errorss");
    if (Object.keys(errors).length === 0) {
      // Validation passed, proceed with adding the item
      try {
        const response = await fetch(`${API_BASE_URL}/api/item`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedItem),
        });
        if (response.ok) {
          fetchData();
          handleCloseDrawer();
        }
      } catch (error) {
        console.error("Error adding item:", error);
      }
    } else {
      // Validation failed, update the error state
      setNameError(errors.name || false);
      setDescriptionError(errors.description || false);
      setStatusError(errors.status || false);
    }
  };

  // To handle form update

  const handleSave = async () => {
    console.log(selectedItem, "-----selectedItem");
    const errors = validateItem(selectedItem);
    console.log(errors, "-----errors");

    setErrorMessages(errors);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/item/${selectedItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedItem),
          }
        );
        if (response.ok) {
          fetchData();
          handleCloseDrawer();
        }
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      setNameError(errors.hasOwnProperty("name"));
      setDescriptionError(errors.hasOwnProperty("description"));
      setStatusError(errors.hasOwnProperty("status"));
    }
  };

  // To handle form input changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setSelectedItem((prevSelectedItem) => {
      if (prevSelectedItem) {
        return {
          ...prevSelectedItem,
          [name]: value,
        };
      }
      return null;
    });
  };

  // To handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    console.log(checked, "-----checked");
    setSelectedItem((prevSelectedItem) => {
      if (prevSelectedItem) {
        return {
          ...prevSelectedItem,
          viewed: checked,
        };
      }
      return null;
    });
  };

  // To handle radio button change
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedItem((prevSelectedItem) => {
      if (prevSelectedItem) {
        return {
          ...prevSelectedItem,
          status: value as Status,
        };
      }
      return null;
    });
  };

  const handleRemoveItem = async (item: Item) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/item/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchData();
        setSelectedItem(null);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const resetErrors = () => {
    setNameError(false);
    setDescriptionError(false);
    setStatusError(false);
  };

  // To validate the selected item using Joi
  const validateItem = (item: Item) => {
    const { error } = itemSchema.validate(item, { abortEarly: false });
    if (error) {
      const errors = {};
      for (let item of error.details) {
        errors[item.context.key] = item.message;
      }
      return errors;
    }
    return {};
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          {" "}
          <ReactLoading
            type="balls"
            color="blue"
            height={"15%"}
            width={"15%"}
          />
        </div> // Render a loading indicator while data is being fetched
      ) : (
        <>
          <TableContainer style={{ marginTop: 50 }}>
            <Table>
              <TableHead
                style={{
                  backgroundColor: "#87CEEB",
                }}
              >
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", fontSize: 14 }}>
                    Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: 14 }}>
                    Viewed
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: 14 }}>
                    Description
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: 14 }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((item: Item) => (
                  <TableRow
                    key={item.name}
                    onClick={() => handleRowClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.viewed ? "Yes" : "No"}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            style={{ marginTop: 10 }}
            onClick={handleOpenDrawer}
            variant="contained"
            color="primary"
          >
            Add Item
          </Button>
          <ListItemDrawer
            selectedItem={selectedItem}
            drawerOpen={drawerOpen}
            handleCloseDrawer={handleCloseDrawer}
            handleSave={handleSave}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleRadioChange={handleRadioChange}
            handleRemoveItem={handleRemoveItem}
            handleAddItem={handleAddItem}
            nameError={nameError}
            descriptionError={descriptionError}
            statusError={statusError}
            errorMessages={errorMessages}
          />
        </>
      )}
    </div>
  );
};
