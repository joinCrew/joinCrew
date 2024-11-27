import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMeetings, ResponseMeeting } from "../api/meetings.api";

export const useMeetings = ()=>{
    let location = useLocation();
    let [meetings, setMeetings] = useState<ResponseMeeting[]>([]);
    useEffect(()=>{
        getMeetings().then((res)=>{
            setMeetings(res);
        });
    }, []);

    
    return {meetings};

}

