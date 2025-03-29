import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";
import "./App.css";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  // Get the existing item from the server
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch doors when component mounts
    fetchDoors();
  }, []);

  const fetchDoors = () => {
    setLoading(true);
    fetch(API_URI)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch doors");
        return response.json();
      })
      .then((data) => {
        setItems(data);
        if (data.length > 0 && !selectedItem) {
          setSelectedItem(data[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleItemUpdate = (updatedItem) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setSelectedItem(updatedItem);
  };

  const handleItemDelete = () => {
    setSelectedItem(null);
    fetchDoors();
  };

  if (loading) return <div>Loading doors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app-container">
      <h1>Door Management</h1>

      <div className="content-layout">
        <div className="door-list">
          <h2>Select a Door</h2>
          <ul>
            {items.map((door) => (
              <li
                key={door.id}
                className={selectedItem?.id === door.id ? "selected" : ""}
                onClick={() => setSelectedItem(door)}
              >
                {door.name} -{" "}
                <span className={`status ${door.status}`}>{door.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="door-edit-panel">
          {selectedItem ? (
            <UpdateItem
              item={selectedItem}
              onItemUpdated={handleItemUpdate}
              onItemDeleted={handleItemDelete}
            />
          ) : (
            <p>Please select a door from the list</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
