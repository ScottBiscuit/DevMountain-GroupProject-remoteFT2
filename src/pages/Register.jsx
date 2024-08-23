import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  const navigate = useNavigate();

  const handleSignup = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post("/api/user", formData);

    if (!res.data.error) {
      navigate("/login");
    } else {
      alert(res.data.error);
    }
  };

  return (
    <>
      <Card className="text-center">
        <Card.Img
          src="../images/bgportrait_beach.jpg"
          alt="beach with two sun umbrellas"
          className="opacity-50 vh-100"
        />
        <Card.ImgOverlay>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className="bg-success-subtle p-2">
                  Register
                </Card.Title>
                <Card.Text className="p-2">
                  <RegisterForm onSignup={handleSignup} />
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="p-3">
              <Card.Img
                variant="top"
                src="../images/welcome.jpg"
                alt="Welcome to paradise sign"
                className="opacity-75"
              />
            </Card>
          </CardGroup>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}
