import { httpClient } from "./http";

export interface ResponseMeeting {
    id: number;
    event_date: string;
    location: string;
    gender: string;
    ages: string;
    title: string;
    discript: string;
    max_members: number; // 최대 인원
    now_members : number;
}
export interface ReqeustMeeting{
    id: number;
    event_date: string;
    location: string;
    gender: string;
    ages: string;
    title: string;
    discript: string;
    max_members: number;
}

interface getParams{
    current_date : string | null
}

export const getMeetings = async () =>{
    try {const response = await httpClient.get<ResponseMeeting[]>('/events');
    return response.data
    }
    catch(error){
        return [];
    }
}

export const getPersonal = async () =>{
    try{
        const response = await httpClient.get<ResponseMeeting[]>("/mypage");
        return response.data
    } catch(error){
        return [];
    }
}