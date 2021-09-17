const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parents, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parents, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { user, token };
    },

    removeBook: async (parents, { bookId }, context) => {
      if (context.user) {
        const removedBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return removedBook;
      }
      throw new AuthenticationError("You are not logged in");
    },

    saveBook: async (parents, { bookId }, context) => {
      if (context.user) {
        const savedBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: { bookId } } },
          { new: true }
        );
        return savedBook;
      }
      throw new AuthenticationError("You are not logged in");
    },
  },
};

module.exports = resolvers;
