import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  // Get the existing item from the server
  // const [item, setItem] = useState(null);
  // pass the item to UpdateItem as a prop

  return <UpdateItem />;
}

export default App;
