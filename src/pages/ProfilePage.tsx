import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import PaymentDateChecker from "../components/PaymentDateChecker";

const ProfilePage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchUser(token);
        setUser(data.user);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError("Unauthorized");
          navigate("/login");
        } else {
          setError("Failed to fetch user data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p>Loading user info...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Welcome {user.full_name}</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Business Name:</strong> {user.Company?.name}
      </p>
      <p>
        <strong>Company Expected Activity:</strong> {user.roles}
      </p>

      <PaymentDateChecker />
    </div>
  );
};

export default ProfilePage;
