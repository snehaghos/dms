import { useMutation } from "@tanstack/react-query";
import { authLogin } from "../services/auth-api";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";



export const useLogin=()=>{
    const { setUser, setToken, setRefreshToken } = useStateContext();
    const navigate=useNavigate();
    const loginMutation = useMutation({
        mutationFn: authLogin,
        onSuccess: (response) => {
          setUser(response.data);
          setToken(response.token);
          setRefreshToken(response.refreshToken);
    
        navigate('/upload',{ replace: true });
      
    // window.location.href="/"
        
        },
        onError: (err) => {
          console.log('Login failed:', err);
        },
      });
      return loginMutation
}