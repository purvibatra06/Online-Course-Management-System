import User from '../../dblayer/Models/userModel.js';

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const getUserProfileById = async (id) => {
  return await User.findById(id);
};

export const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const joinUserToCourse = async (id, courseId) => {
  return await User.findByIdAndUpdate(
    id,
    { $push: { coursesjoin: { course: courseId } } },
    { new: true }
  );
};

export const findAllUser = async () => {
  return await User.find();
};

export const deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const getPaginatedUsers = async (page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;
  const query = {};
  if (filters.role) {
    query.role = filters.role;
  }
  if (filters.fullName) {
    query.fullName = { $regex: filters.fullName, $options: 'i' }; // case-insensitive
  }
  if (filters.email) {
    query.email = { $regex: filters.email, $options: 'i' };
  }
  const [users, total] = await Promise.all([
    User.find(query).skip(skip).limit(limit),
    User.countDocuments(query)
  ]);
  return {
    users,totalPages: Math.ceil(total / limit),currentPage: page,totalUsers: total
  };
};

export const findEmail= async (email)=>{
  return await User.findOne({email: email});
}

export const setToken=async(email,randomString)=>{
  return await User.updateOne({email: email},{$set: {token: randomString}});
}

export const findToken= async (token)=>{
    return await User.findOne({token: token});
}

export const updateForgetPassword=async(tokenData,newPassword)=>{
  return await User.findByIdAndUpdate({_id:tokenData._id},{$set:{password: newPassword, token: ''}},{new: true})
}