const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { userId }) => {
      const data = await User.findOne({ _id: userId }).select('-__v -password');
      return data;
    },
  },

  Mutation: {
    saveBook: async (parent, { userId, bookInfo }) => {
      const data = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { savedBooks: bookInfo } },
        { new: true }
      );
      return data;
    },
    deleteBook: async (parent, { userId, bookId }) => {
      const data = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );
      return data;
    },
    createUser: async (parent, argu) => {
      const data = await User.create(argu);
      const token = signToken(data);
      return { token, data };
    },
    login: async (parent, { email, password }) => {
      const data = await User.findOne({ email });
      if (!data) {
        return;
      }
      const passCheck = data.isCorrectPassword(password);
      if (!passCheck) {
        return;
      }
      const token = signToken(data);
      return { token, data };
    },
  },
};

module.exports = resolvers;
