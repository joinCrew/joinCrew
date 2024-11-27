import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPersonal, ResponseMeeting } from "../api/meetings.api";

export const useMymeetings = ()=>{
    let location = useLocation();
    let [meetings, setMeetings] = useState<ResponseMeeting[]>([]);
    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        getPersonal({
            current_date : params.get('current_date')
        }).then((res)=>{
            setMeetings(res);
        });
    
    },[location.search]);
    return {meetings};

}