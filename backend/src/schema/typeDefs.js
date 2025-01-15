import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: Int!
    firstname: String
    lastname: String
    phone: String
    email: String!

    projects: [Project]

    tasks: [Task]
  }

  type Project {
    id: Int!
    name: String!
    description: String

    responsible: User!

    tasks: [Task]

    startDate: DateTime!
    endDate: DateTime
  }

  type Task {
    id: Int!
    title: String!
    status: String!
    percentage: Int

    project: Project!

    assignedTo: User!

    startDate: DateTime!
    endDate: DateTime
  }

  type Query {
    users: [User]
    user(id: Int!): User
    projects: [Project]
    project(id: Int!): Project
    tasks: [Task!]!
    task(id: Int!): Task
  }

  type Mutation {
    createUser(
      firstname: String!
      lastname: String!
      phone: String
      email: String!
    ): User!
    updateUser(
      id: Int!
      firstname: String
      lastname: String
      phone: String
      email: String
    ): User!
    deleteUser(id: Int!): User!

    createProject(
      name: String!
      description: String
      responsibleId: Int!
      startDate: DateTime!
      endDate: DateTime
    ): Project!
    updateProject(
      id: Int!
      name: String
      description: String
      responsibleId: Int
      startDate: DateTime!
      endDate: DateTime
    ): Project!
    deleteProject(id: Int!): Project!

    createTask(
      title: String!
      status: String
      percentage: Int
      projectId: Int!
      userId: Int!
      startDate: DateTime!
      endDate: DateTime
    ): Task!
    updateTask(
      id: Int!
      title: String
      status: String
      percentage: Int
      projectId: Int
      userId: Int
      startDate: DateTime!
      endDate: DateTime
    ): Task!
    deleteTask(id: Int!): Task!
  }
`;
