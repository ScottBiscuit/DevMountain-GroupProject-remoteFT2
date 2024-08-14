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
      // alert('New user added - click OK to do cool stuff!')
    } else {
      alert(res.data.error);
    }
  };

  return (
    <>
      <Card className="text-center">
        <Card.Img
          src="../images/world_map.jpg"
          alt="Card image"
          className="opacity-50"
        />
        <Card.ImgOverlay>
          <CardGroup>
            <Card>
              <Card.Img
                variant="top"
                src="../images/world_map_pins.png"
                className="opacity-75"
              />
            </Card>
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
          </CardGroup>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}
