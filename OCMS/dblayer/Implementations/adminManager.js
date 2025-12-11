import Admin from "../Models/adminModel.js"

export const createAdmin = async (adminData) => {
  const admin = new Admin(adminData);
  return await admin.save();
}

export const findAdminByEmail = async (email) => {
  return await Admin.findOne({ email });
}

export const findAdminById = async (id) => {
  return await Admin.findById(id);
}

export const findAllAdmins = async () => {
  return await Admin.find();
}

export const updateAdminById = async (id, updateData) => {
  return await Admin.findByIdAndUpdate(id, { ...updateData, updatedAt: Date.now() }, { new: true });
}

export const deleteAdminById = async (id) => {
  return await Admin.findByIdAndDelete(id);
}