import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPersonal, ResponseMeeting } from "../api/meetings.api";

export const useMymeetings = ()=>{
    let location = useLocation();
    let [meetings, setMeetings] = useState<ResponseMeeting[]>([]);
    useEffect(()=>{
        getPersonal().then((res)=>{
            setMeetings(res);
        });
    
    },[]);
    return {meetings};

}