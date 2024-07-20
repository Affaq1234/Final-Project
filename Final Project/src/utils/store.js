const getProducts = async () => {
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
getProducts()