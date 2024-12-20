import { useState, useEffect } from "react";
import axios from "axios";

const link = "http://127.0.0.1:3000";
// const link = "https://wins-family.onrender.com";

export const useFetchGet = async (endpoint, query) => {
  let [data, setData] = useState([]);
  let [status, setStatus] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(false);
  let options = {
    method: "GET",
    url: `${link}/${endpoint}`,
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
      setStatus(response.data.status);
    } catch (error) {
      setError(error);
      alert("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  const reqres = { data, status, isLoading, error };
  console.log(reqres);
  return reqres;
};

export const useFetchPost = async (endpoint, query, resquestBody) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const options = {
    method: "POST",
    url: `${link}/${endpoint}`,
    params: { ...query },
    body: resquestBody,
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};
