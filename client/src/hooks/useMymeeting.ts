import { useEffect, useState } from "react";
import { getPersonal, ResponseMeeting } from "../api/meetings.api";

export const useMymeetings = (token : string | null) => {
    let [meetings, setMeetings] = useState<ResponseMeeting[]>([]);

    useEffect(() => {
        if (token) {
            getPersonal(token).then((res) => {
                setMeetings(res);
            }).catch((error) => {
                console.error("useMymeeting.ts : ", error);
            });
        } else {
            console.log("useMymeeting.ts");
        }
    }, [token]); 
    return { meetings };
};