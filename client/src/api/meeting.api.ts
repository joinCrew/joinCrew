import { httpClient } from "./http";
interface MeetingData {
  title: string;
  content: string;
  max_members: number;
  location: string;
  gender: string;
  ages: string;
}
export const createMeeting = async (data: MeetingData) => {
  const response = await httpClient.post("/events", data);
  return response.data;
};