import { create } from "zustand";

interface Meeting {
  id: number;
  exerciseType: string;
  date: string;
  time: string;
  location: string;
  gender: string;
  ageRange: string;
  title: string;
  content: string;
  currentParticipants: number; // 현재 참여 인원
  maxParticipants: number; // 최대 인원
  isClosed: boolean; // 모집 마감
  imageUrl?: string; // 이미지 URL 저장 필드 추가
}

interface MeetingStore {
  meetings: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  updateMeeting: (id: number, meeting: Meeting) => void;
  deleteMeeting: (id: number) => void;
}

export const useMeetingStore = create<MeetingStore>((set) => ({
  meetings: [],
  addMeeting: (meeting) =>
    set((state) => ({
      meetings: [...state.meetings, meeting],
    })),
  updateMeeting: (id, updatedMeeting) =>
    set((state) => ({
      meetings: state.meetings.map((meeting) =>
        meeting.id === id ? updatedMeeting : meeting
      ),
    })),
  deleteMeeting: (id) =>
    set((state) => ({
      meetings: state.meetings.filter((meeting) => meeting.id !== id),
    })),
}));
