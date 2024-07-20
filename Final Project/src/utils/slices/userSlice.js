import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const getAll = async () => {
  const url = "https://crud-api-storage.p.rapidapi.com/notes?offset=0&limit=50";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953",
      "x-rapidapi-host": "crud-api-storage.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
const getOne = async () => {
  const url = "https://crud-api-storage.p.rapidapi.com/notes/0";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953",
      "x-rapidapi-host": "crud-api-storage.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
const addUser = async () => {
  const url = "https://crud-api-storage.p.rapidapi.com/notes";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953",
      "x-rapidapi-host": "crud-api-storage.p.rapidapi.com",
      "Content-Type": "text/plain",
    },
    body: '{\n	"title": "Note title",\n	"text": "Some note content"\n}',
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
const deleteUser = async () => {
  const url = "https://crud-api-storage.p.rapidapi.com/notes/0";
  const options = {
    method: "DELETE",
    headers: {
      "x-rapidapi-key": "c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953",
      "x-rapidapi-host": "crud-api-storage.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: {},
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
const editUser = async () => {
  const url = "https://crud-api-storage.p.rapidapi.com/notes/0";
  const options = {
    method: "PUT",
    headers: {
      "x-rapidapi-key": "c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953",
      "x-rapidapi-host": "crud-api-storage.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: {
      key1: "value",
      key2: "value",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
