// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller
async function createEmployee(req, res, next) {
    // console.log(req.headers);
    // console.log("Hello man dljfal;jdf;asjf");

    // Check if employee email already exists in the database
    const employeeExists = await employeeService.checkIfEmployeeExists(
        req.body.employee_email
    );
    // If employee exists, send a response to the client
    if (employeeExists) {
        res.status(400).json({
            error: "This email address is already associated with another employee!",
        });
    } else {
        try {
            const employeeData = req.body;
            // Create the employee
            const employee = await employeeService.createEmployee(employeeData);
            if (!employee) {
                res.status(400).json({
                    error: "Failed to add the employee!",
                });
            } else {
                res.status(200).json({
                    status: "true",
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

// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
    // Call the getAllEmployees method from the employee service
    const employees = await employeeService.getAllEmployees();
    // console.log(employees);
    if (!employees) {
        res.status(400).json({
            error: "Failed to get all employees!",
        });
    } else {
        res.status(200).json({
            status: "success",
            data: employees,
            user: "Zman",
        });
    }
}
// Function to delete an employee
async function deleteEmployee(req, res, next) {
    const { id } = req.params;
    console.log("paramsssss", id);
    try {
        const deleted = await employeeService.deleteEmployeeById(id);
        if (!deleted) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found" });
        }
        res.json({
            success: true,
            message: `Employee with id ${id} deleted successfully`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting employee",
            error: error.message,
        });
    }
}

// Function to edit an employee
async function editEmployee(req, res, next) {
    const { id } = req.params;
    const employee = req.body;
    try {
        const updated = await employeeService.editEmployee(id, employee);
        if (!updated) {
            return res
                .status(404)
                .json({ success: false, message: "Employee not found" });
        }
        res.json({
            success: true,
            message: `Employee with id ${id} updated successfully`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating employee",
            error: error.message,
        });
    }
}

// Export the createEmployee controller
module.exports = {
    createEmployee,
    getAllEmployees,
    deleteEmployee,
    editEmployee
};