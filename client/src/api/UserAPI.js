import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [callback, setCallback] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get(
            "https://code-blogs-tech.herokuapp.com/user/info",
            {
              headers: { Authorization: token },
            }
          );
          setIsLogged(true);
          setUser(res.data.user);
          setLoading(false);
          toast.success("wellcome");
        } catch (error) {
          toast.error(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);
  return {
    isLogged: [isLogged, setIsLogged],
    callback: [callback, setCallback],
    user: [user, setUser],
    loading: [loading, setLoading],
  };
}

export default UserAPI;
