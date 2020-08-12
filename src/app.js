import Amplify, { API, graphqlOperation } from "@aws-amplify/api";
import {getPlayerData} from "./httpClient"
import awsconfig from "./aws-exports";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";

Amplify.configure(awsconfig);

async function createNewTodo() {
  const todo = {
    name: "Use AppSync",
    description: `Realtime and Offline (${new Date().toLocaleString()})`,
  };

  return await API.graphql(graphqlOperation(createTodo, { input: todo }));
}   

const MutationButton = document.getElementById("btnSubmit");
const MutationResult = document.getElementById("MutationResult");
const QueryResult = document.getElementById("QueryResult");


MutationButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  getPlayerData();
});