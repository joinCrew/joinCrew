import { httpClient } from "./http";

export const fetchDetail = async (id: number) => {
  try {
    const response = await httpClient.get(`/events/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};

export const deleteEvent = async (id: number, token: string, title: string) => {
  try {
    const response = await httpClient.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { title },
    });
    return response.data;
  } catch (err) {
    throw new Error("모임 삭제에 실패했습니다.");
  }
};
