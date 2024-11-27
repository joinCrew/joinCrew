import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getMeetings, ResponseMeeting } from "../api/meetings.api";

export const useMeetings = ()=>{
    let location = useLocation();
    let [meetings, setMeetings] = useState<ResponseMeeting[]>([]);
    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        getMeetings({
            current_date : params.get('current_date')
        }).then((res)=>{
            setMeetings(res);
        });
    
    },[location.search]);
    const deleteMeetings = (id : string|number)=>{

    }
    
    return {meetings, deleteMeetings};

}

