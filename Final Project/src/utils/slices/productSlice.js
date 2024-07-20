import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const getAll = async () => {
  const url = "https://crud-operations2.p.rapidapi.com/api/v1";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953",
      "x-rapidapi-host": "crud-operations2.p.rapidapi.com",
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
const getProductbyID = async (id) => {
  const url = `https://crud-operations2.p.rapidapi.com/api/v1/${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953",
      "x-rapidapi-host": "crud-operations2.p.rapidapi.com",
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
const deleteProduct = async (id) => {
  const url = `https://crud-operations2.p.rapidapi.com/api/v1/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "x-rapidapi-key": "c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953",
      "x-rapidapi-host": "crud-operations2.p.rapidapi.com",
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
const editProduct = async (id,obj) => {
    const url = `https://crud-operations2.p.rapidapi.com/api/v1/${id}`;
    const options = {
        method: 'PATCH',
        headers: {
            'x-rapidapi-key': 'c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953',
            'x-rapidapi-host': 'crud-operations2.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: {
            name:"Affaq",
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};
const addProduct = async (obj) => {
    const url = 'https://crud-operations2.p.rapidapi.com/api/v1';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': 'c4643961d8msh88903015ee6e6bbp108dfbjsnd395b8c1b953',
		'x-rapidapi-host': 'crud-operations2.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: obj
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
};
