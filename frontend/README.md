# Smart Garage

Smart Garage is a comprehensive management system designed for auto service centers to streamline their operations, manage employees, customers, orders, vehicles, and services efficiently.

## Core Functionalities

1. **Employee Management:**
   - View all employees.
   - Add, edit, and delete employees.
   - Activate or deactivate employees.
2. **Service Management:**
   - View all services.
   - Add, edit, and delete services.
   - Activate or deactivate services.
3. **Customer Management:**
   - View all customers.
   - Add, edit, and delete customers.
   - Activate or deactivate customers.
4. **Order Management:**
   - View all orders.
   - Add, edit, and delete orders.
   - Mark orders as completed or pending.
   - Associate services with orders for detailed tracking.
5. **Vehicle Management:**
   - View all vehicles.
   - Add, edit, and delete vehicles.
   - Activate or deactivate vehicles.
6. **Vehicles Per Customer:**
   - View vehicles associated with a specific customer.

## Installation

To use Smart Garage locally, follow these steps:

1. **Fork and Clone the Repository:**

   - Fork the [Smart Garage repository](https://github.com/Zerubabel-J/Smart_garage) on GitHub.
   - Clone your forked repository to your local machine:
     ```
     git clone https://github.com/your-username/Smart_garage.git
     ```

2. **Navigate to the Project Directory:**

cd Smart_garage

3. **Install Dependencies:**

npm install

4. **Set Up Database:**

- Create a MySQL database named `smart_garage`.
- Import the SQL dump file `smart_garage.sql` into your database.

5. **Configure Environment Variables:**

- Create a `.env` file in the root directory.
- Add the following environment variables:
  ```
  DB_HOST=localhost
  DB_USER=<your_mysql_username>
  DB_PASSWORD=<your_mysql_password>
  DB_NAME=smart_garage
  ```

6. **Start the Server:**
   npm run dev

7. **Access the Application:**

- Open your web browser and go to `http://localhost:8080`.

## Usage

Once the server is running and the database is set up, you can start using Smart Garage by navigating through the various functionalities provided in the web application interface.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
