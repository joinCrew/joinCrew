import { httpClient } from "./http";

export interface ResponseMeeting {
    id: number;
    date: string;
    location: string;
    gender: string;
    ages: string;
    title: string;
    discript: string;
    max_member: number; // 최대 인원
    now_member : number;
}
export interface ReqeustMeeting{
    id: number;
    date: string;
    location: string;
    gender: string;
    ages: string;
    title: string;
    discript: string;
    max_member: number;
}

interface getParams{
    current_date : string | null
}

export const getMeetings = async (params : getParams) =>{
    try {const response = await httpClient.get<ResponseMeeting[]>('/events', {params : params});
    return response.data
    }
    catch(error){
        return [];
    }
}

export const getPersonal = async (params : getParams) =>{
    try{
        const response = await httpClient.get<ResponseMeeting[]>("/mypage");
        return response.data
    } catch(error){
        return [];
    }
}