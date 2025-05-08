import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function useAuth() {
    const cookies = new Cookies();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(user)return;
        const checkUserSession = async() => {
            try {    
                const sessionData = await fetch('/api/check-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        'token': cookies.get('twchat')
                    })
                });
    
                const response = await sessionData.json();
                
                if(sessionData.ok){
                    setUser(response);
                }
                else {
                    setUser({redirect:'/login'});
                }
                
            } catch (error) {
                console.error("Error fetching user session:", error);
                setUser({redirect:'/login'});
            }   
            
        };

        checkUserSession();

    },[user]);
    
    return {user};

}