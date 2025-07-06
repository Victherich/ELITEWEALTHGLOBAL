// back end of former sign up swithg sendibng of otp 

// <?php
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST');
// header('Access-Control-Allow-Headers: Content-Type');
// header('Content-Type: application/json');

// include 'config.php';

// function logError($message) {
//     file_put_contents("error_log.txt", date('Y-m-d H:i:s') . " - " . $message . PHP_EOL, FILE_APPEND);
// }

// // Validate request
// if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
//     logError("Invalid request method.");
//     echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
//     exit();
// }

// $data = json_decode(file_get_contents('php://input'), true);

// if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['password']) || empty($data['country']) || empty($data['username'])) {
//     logError("Missing fields in request.");
//     echo json_encode(['success' => false, 'error' => 'All fields are required.']);
//     exit();
// }

// // Sanitize input
// $name = trim($data['name']);
// $email = trim($data['email']);
// $phone = trim($data['phone']);
// $password = password_hash($data['password'], PASSWORD_DEFAULT);
// $country = trim($data['country']);
// $username = trim($data['username']);

// // Check if email exists
// $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
// $stmt->bind_param("s", $email);
// $stmt->execute();
// $result = $stmt->get_result();
// if ($result->num_rows > 0) {
//     echo json_encode(['success' => false, 'error' => 'Email is already registered.']);
//     exit();
// }

// // Check if username exists
// $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
// $stmt->bind_param("s", $username);
// $stmt->execute();
// $result = $stmt->get_result();
// if ($result->num_rows > 0) {
//     echo json_encode(['success' => false, 'error' => 'Username is already taken.']);
//     exit();
// }

// // Generate 6-digit verification code
// $verification_code = random_int(100000, 999999);

// // Insert user with verification code
// $stmt = $conn->prepare("INSERT INTO users (name, email, phone, password, country, username, created_at, balance, verification_code) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 0.00, ?)");
// $stmt->bind_param("sssssss", $name, $email, $phone, $password, $country, $username, $verification_code);
// $stmt->execute();

// if ($stmt->affected_rows > 0) {
//     // Send email
//     $subject = "Your Email Verification Code";
//     $message = "Hello $name,\n\nThank you for signing up!\nYour email verification code is: $verification_code\n\nPlease enter this code to verify your email.\n\n- Elite Wealth Global";
//     $headers = "From: contact@elitewealthglobal.com/";

//     if (mail($email, $subject, $message, $headers)) {
//         echo json_encode(['success' => true, 'message' => 'User registered successfully. Verification code sent.']);
//     } else {
//         logError("Mail sending failed to $email");
//         echo json_encode(['success' => false, 'error' => 'User created, but failed to send verification email.']);
//     }
// } else {
//     echo json_encode(['success' => false, 'error' => 'User registration failed.']);
// }

// $stmt->close();
// $conn->close();
// ?>
