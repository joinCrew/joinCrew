import { httpClient } from "./http"; // 이미 정의된 httpClient 사용

export interface JoinCrewProps {
  is_full: boolean;
  title: string;
}

export const joinCrew = async (
  id: number,
  data: JoinCrewProps,
  token: string
) => {
  try {
    const response = await httpClient.post(`/crew/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("모임 참여에 실패했습니다.");
  }
};

export const detachCrew = async (id: number, token: string) => {
  try {
    const response = await httpClient.delete(`/crew/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("모임 탈퇴에 실패했습니다.");
  }
};

export const checkCrew = async (id: number, token: string) => {
  try {
    const response = await httpClient.get(`/crew/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("조회에 실패했습니다.");
  }
};
