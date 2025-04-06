// src/resolvers/employeeResolver.js
const Employee = require('../models/Employee');

const employeeResolver = {
  Query: {
    getAllEmployees: async (_, __, { user }) => {
      // Optionally, check if user is authenticated
      if (!user) throw new Error('Unauthorized');
      return await Employee.find();
    },
    getEmployeeById: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await Employee.findById(id);
    },
    searchEmployeeByDeptDesg: async (_, { department, designation }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      const filter = {};
      if (department) filter.department = department;
      if (designation) filter.designation = designation;
      return await Employee.find(filter);
    },
  },
  Mutation: {
    addEmployee: async (_, args, { user }) => {
      if (!user) throw new Error('Unauthorized');
      const newEmployee = new Employee(args);
      await newEmployee.save();
      return newEmployee;
    },
    updateEmployeeById: async (_, { id, ...updateData }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      updateData.updated_at = new Date();
      const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true });
      return updatedEmployee;
    },
    deleteEmployeeById: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      await Employee.findByIdAndDelete(id);
      return `Employee with id ${id} deleted successfully.`;
    },
  },
};

module.exports = employeeResolver;
