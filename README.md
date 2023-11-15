# WeWalk Project

WeWalk is a web application designed to enhance the safety of individuals walking alone at night. The application allows users to register, log in, and be authenticated. The project is currently in the early stages, offering basic registration and authentication features. Users can log in, and their session is remembered.

## Features

- User Registration: Users can create an account by providing their details, including username, email, password, and emergency contact information.
- Secure authentication using bcrypt to hash passwords, ensuring user data protection.
- Session Management: Users are remembered in a session after logging in, providing a seamless experience during their visit.
- Map Integration: Although the Google Maps API key is not functional in the current version, the map page serves as a placeholder for future implementation.

## Project Structure

- `index.ejs`: Landing page for the application.
- `login.ejs`: Page for user registration.
- `userlogin.ejs`: Page for user login.
- `map.ejs`: Map page that users are redirected to upon successful login.
- `404.ejs`: Error page for handling 404 Not Found errors.
- `public/`: Static assets, including stylesheets and client-side scripts.
- `views/`: EJS templates for rendering pages.
- `app.js`: Node.js server file containing route definitions, database connection, and session management.

## Getting Started

1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Start the application

## Future Enhancements

- Real-Time User Tracking: Implement a feature to show other active users on the map in real-time.
- Notification System: Integrate a notification system to alert users and their emergency contacts in case of emergency situations.

## Notes

- The Google Maps API key is currently a placeholder, and you need to replace it with a valid API key.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for improvements or new features.
