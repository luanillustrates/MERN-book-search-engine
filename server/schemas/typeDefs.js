const typeDefs = `
    type Book {
        bookId: String!
        authors: [String]
        title: String!
        description: String
        image: String
        link: String
    }

    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        user(userId: ID!): User
    }

    input BookTypes {
        bookId: String!
        authors: [String]
        title: String!
        description: String
        image: String
        link: String
    }

    type Mutation {
        saveBook(userId: ID!, bookInfo: BookTypes!): User
        deleteBook(userId: ID!, bookId: String!): User
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
