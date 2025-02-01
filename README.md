**Trivora - Web-Based Quiz Application**  

Access the live website: [Trivora](https://trivora.vercel.app)

Trivora is an interactive web-based quiz application that incorporates gamification features to enhance the quiz experience. Users can start a quiz, track their streaks, and receive personalized messages based on their performance. The app includes a dark/light theme toggle and is styled using Tailwind CSS for a smooth and responsive UI.

Steps to Set Up and Run the Application

1. Install Dependencies
   
First, you need to install the required dependencies. Open your terminal and run the following command:

`npm install`

This will install all the necessary packages required for the application to run.

3. Create .env File
   
Due to CORS (Cross-Origin Resource Sharing) issues, we need to create an .env file for the API URL. Create a new file named .env in the root of your project and add the following line:

`VITE_API_URL=https://api.allorigins.win/get?url="YOUR URL LINK"`

This will bypass the CORS restrictions by routing the API through AllOrigins, ensuring that the API call works smoothly.

4. Run the Development Server

Once the dependencies are installed and the .env file is set up, you can start the development server by running:
`npm run dev`
The app will start running on your local server, usually available at http://localhost:3000.

**Features of Trivora**

**1. Dark/Light Theme**

Trivora comes with a built-in dark and light theme toggle, allowing users to switch between the two modes for an enhanced visual experience. This is fully styled using Tailwind CSS.

**2. Quiz with Gamification Features**

The app allows users to start a quiz and track their progress. Some key gamification features include:

	•	Streaks: As users answer questions correctly, they will earn streaks. These streaks are awarded based on accuracy, such as:
 
	•	3 streak
 
	•	5 streak
 
	•	7 streak
 
The streaks motivate users to maintain accuracy and improve their scores.

	•	Personalized Messages: When the quiz ends, based on the user’s accuracy, a customized congratulatory message is displayed. The messages vary depending on the performance (e.g., “Outstanding!”, “Great Job!”, “Keep Going!”, etc.).
 
**3. User-Friendly Interface**

The UI is designed to be intuitive and easy to navigate. All features, including the quiz interface, dark/light theme toggle, and streak tracking, are integrated seamlessly for a smooth user experience.
Technologies Used

	•	React: For building the frontend.
 
	•	Vite: For fast development with a modern build tool.
 
	•	Tailwind CSS: For styling and creating responsive layouts.
 
	•	AllOrigins: To resolve CORS issues with API requests.
 
 
**Future Improvements**

	•	More quizzes and categories: Expanding the quiz database with different topics.
 
	•	User profiles and score tracking: Adding a way for users to track their scores across multiple sessions.
 
	•	Social sharing options: Allowing users to share their quiz results on social media platforms.
 
