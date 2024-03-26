// Import the service
const serviceService = require("../services/service.service");

// Create the add service controller
async function createService(req, res, next) {
  // Check if service name already exists in the database
  const serviceExists = await serviceService.checkIfServiceExists(
    req.body.service_name
  );
  // If service exists, send a response to the client
  if (serviceExists) {
    res.status(400).json({
      error: "This service name is already associated with another service!",
    });
  } else {
    try {
      const serviceData = req.body;
      // Create the service
      const service = await serviceService.createService(serviceData);
      if (!service) {
        res.status(400).json({
          error: "Failed to add the service!",
        });
      } else {
        res.status(200).json({
          status: "true",
          message: "Service added successfully!",
        });
      }
    } catch (error) {
      // console.log(err);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}
// A function to get all services
async function getAllServices(req, res, next) {
  // Call the getAllServices method from the service service
  const services = await serviceService.getAllServices();
  // console.log(services);
  if (!services) {
    res.status(400).json({
      error: "Failed to get all services!",
    });
  } else
    res.status(200).json({
      status: "success",
      data: services,
      user: "Zman",
    });
}
// A function to get a service by id
async function getServiceById(req, res, next) {
  // Get the service id from the request parameters
  const id = req.params.id;
  // Call the getServiceById method from the service service
  const service = await serviceService.getServiceById(id);
  if (!service) {
    res.status(400).json({
      error: "Failed to get the service!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: service,
      user: "Zman",
    });
  }
}

// A function to delete a service
async function deleteService(req, res, next) {
  // Get the service id from the request parameters
  const id = req.params.id;
  // Call the deleteService method from the service service
  const service = await serviceService.deleteService(id);
  if (!service) {
    res.status(400).json({
      error: "Failed to delete the service!",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "Service deleted",
    });
  }
}

// A function to edit a service
async function editService(req, res, next) {
  // Get the service id from the request parameters
  const id = req.params.id;
  // Get the service data from the request body
  const serviceData = req.body;
  // Call the editService method from the service service
  const service = await serviceService.editService(id, serviceData);
  if (!service) {
    res.status(400).json({
      error: "Failed to edit the service!",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: "Service edited",
    });
  }
}

// Export the createEmployee controller
module.exports = {
  createService,
  getAllServices,
  getServiceById,
  deleteService,
  editService,
};
