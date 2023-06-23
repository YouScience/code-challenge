# Backend API

This is a RESTful API built with Node.js and Express to handle item management.

## Installation

1. Clone the repository to your local machine:

https://github.com/Divyarani3020/code-challenge.git

2. Navigate to the project directory:

cd backend

3. Install the dependencies:

npm i

## Usage

1. Start the server:

npm run dev

2. The server will start running on `http://localhost:3000`.

## API Endpoints

The following API endpoints are available:

- GET `/list`: Returns a list of all item names and their status.

- GET `/item/:id`: Returns all fields for a specific item.

- POST `/item`: Creates a new item.

- PUT `/item/:id`: Updates an existing item.

- DELETE `/item/:id`: Removes an item.

### Item Structure

Each item has the following properties:

- `name`: string (Required and Unique)
- `description`: string (Optional)
- `status`: string (Required)
- `viewed` : boolean (Required)
- Allowed values: "new" | "complete" | "in progress" | "on hold" | "archived";

## Data Storage

The data is stored in memory and does not persist if you restart the server. The unique `id` property serves as the identifier for each item.

## License

This project is licensed under the [MIT License](LICENSE).
