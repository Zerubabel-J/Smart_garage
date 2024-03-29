// Import the customer service
const customerService = require("../services/customer.service");

// Create the add customer controller
async function createCustomer(req, res, next) {
  // console.log("Customerr Form", req.body);
  // Check if customer email already exists in the database
  const customerExists = await customerService.checkIfCustomerExists(
    req.body.customer_email
  );
  // console.log(customerExists);

  // If customer exists, send a response to the client
  if (customerExists) {
    res.status(400).json({
      error: "This email address is already associated with another customer!",
    });
  } else {
    try {
      // const customerData = req.body;
      console.log("customerData", customerData);
      // Create the customer
      const customer = await customerService.createCustomer(customerData);
      // console.log("Smart Cutomerrrr", customer);
      if (!customer) {
        res.status(400).json({
          error: "Failed to add the customer!",
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

// Create the getAllCustomers controller
async function getAllCustomers(req, res, next) {
  // Call the getAllCustomers method from the customer service
  const customers = await customerService.getAllCustomers();
  if (!customers) {
    res.status(400).json({
      error: "Failed to get all customers!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: customers,
    });
  }
}

// A function to get a customer by id
async function getCustomerById(req, res, next) {
  const { id } = req.params;
  try {
    const customer = await customerService.getCustomerById(id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching customer",
      error: error.message,
    });
  }
}

// Function to delete a customer
async function deleteCustomer(req, res, next) {
  const { id } = req.params;
  try {
    const deleted = await customerService.deleteCustomerById(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.json({
      success: true,
      message: `Customer with id ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting customer",
      error: error.message,
    });
  }
}

// Function to edit a customer
async function editCustomer(req, res, next) {
  const { id } = req.params;
  const customer = req.body;
  try {
    const updated = await customerService.editCustomer(id, customer);
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.json({
      success: true,
      message: `Customer with id ${id} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating customer",
      error: error.message,
    });
  }
}

// Export the customer controllers
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  editCustomer,
};
