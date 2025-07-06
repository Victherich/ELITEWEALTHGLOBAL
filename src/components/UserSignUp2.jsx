


import React, { useContext, useState , useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from './Context';
import logo3 from '../Images2/logo3.jpeg'

// Styled Components
const Page = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f2f4f8;
  color: #000050;
  font-family: 'Segoe UI', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #000050, #1b1f78);
  color: white;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
    text-align: center;
    align-items: center;
  }
`;



const RightPanel = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Form = styled.form`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #000050;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin-top: 10px;

  &:hover {
    background-color: #1b1f78;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const MotivationalHeading = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
 text-align:center;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const MotivationalText = styled.p`
  font-size: 18px;
  line-height: 1.6;
text-align:center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const AuthPrompt = styled.p`
  color: #000050;
  cursor: pointer;
  text-align: center;
  margin-top: 12px;
  font-size: 14px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Select = styled.select`
padding:10px;
cursor:pointer;
outline :none;
width:100%;
`


const Img = styled.img`
  width:200px;
  margin:0 auto;
  // margin-top:
  border-radius:50%;
`

const UserSignUp2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { color1 } = useContext(Context);
  const [countries, setCountries]=useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {referrer}=useParams();



  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const countryNames = response.data.map((country) => country.name.common);
      setCountries(countryNames);
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Fallback to the static country list if the API call fails
      setCountries([
        'United States',
        'Canada',
        'India',
        'Australia',
        'United Kingdom',
        'Germany',
        'France',
        'Italy',
        'Japan',
        'Brazil',
      ]);
    }
  };

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !confirmEmail || !phone || !password || !confirmPassword || !country || !username) {
      Swal.fire({
        icon: 'error',
        title: 'Missing fields',
        text: 'All fields are required.',
      });
      return;
    }

    if (email !== confirmEmail) {
      Swal.fire({
        icon: 'error',
        title: 'Email mismatch',
        text: 'The emails do not match.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password mismatch',
        text: 'The passwords do not match.',
      });
      return;
    }

    Swal.fire({ text: "Please wait..." });
    Swal.showLoading();

    try {
      const res = await axios.post('https://elitewealthglobal.com/api/user_signup2.php', {
        name,
        email,
        phone,
        password,
        country,
        username,
        referrer,
      });

      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered. Please login',
        });
        // navigate('/verifyemail');
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: res.data.error,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Could not connect to server.',
      });
    }
  };




  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };


  return (
    <Page>
      <LeftPanel>
      <Img src={logo3} alt='logo'/>
        <MotivationalHeading>Start Growing Your Wealth</MotivationalHeading>
        
        <MotivationalText>
          Sign up today and take the first step toward financial freedom. 
          Our tools and experts will guide you every step of the way.
        </MotivationalText>
        
      </LeftPanel>

      <RightPanel>
        <Form onSubmit={handleSubmit}>
          <Title>Create Your Account</Title>

          <Label>Name</Label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" required />

          <Label>Username</Label>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose a username" required />

          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />

          <Label>Confirm Email</Label>
          <Input type="email" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} placeholder="Confirm your email" required />

          <Label>Phone</Label>
          <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" required />

          <Label>Country</Label>
          <Select value={country} onChange={(e) => setCountry(e.target.value)} required>
            <option value="">Select your country</option>
            {countries.sort().map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </Select>

          <Label>Password</Label>
          <div style={{ position: 'relative' }}>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {passwordVisible ? '🙈' : '👁️'}
          </button>
        </div>
      
          {/* <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required /> */}

          <Label>Confirm Password</Label>
          {/* <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" required /> */}
          <div style={{ position: 'relative' }}>
          <Input
            type={confirmPasswordVisible ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {confirmPasswordVisible ? '🙈' : '👁️'}
          </button>
        </div>
          <Button type="submit">Sign Up</Button>

          <AuthPrompt onClick={() => navigate('/login')}>
            Already have an account? <strong>Login</strong>
          </AuthPrompt>
        </Form>
      </RightPanel>
    </Page>
  );
};

export default UserSignUp2;
