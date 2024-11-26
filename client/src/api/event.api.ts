import { httpClient } from "./http";

export const fetchDetail = async (id: number) => {
  try {
    const response = await httpClient.get(`/events/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};
