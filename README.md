# Teacher Web Portal of *Simply Message and Study* (SMS)
The website to allow teacher to upload quizzes and study material using SMS <br/>
***The Video of the project can be seen here https://youtu.be/YnQ7-6pbJd4*** <br/>
The problem Simply Message and Study (SMS) solves:
One of the main demographics affected by the current COVID 19 situation is students. Students do not have any proper access to the internet, especially in the rural areas. Due to this, they are lagging behind to get proper education, which is possible only a high-speed internet connection for remote collaboration.
Our solution solves this problem by using SMS service and not relying upon the internet for learning. SMS is more widespread and cheaply available even in the remotest of areas. Using our application, the students can get proper textual education with negligible costs.
Our application consists of two parts:

### Teacher web portal: A web app used by teachers to
 1. Register new students using their mobile number
 2. Create classes and enroll students in them
 3. Create quizzes and send them to the students SMS
 4. Create Study material (textual study material) and send them to the students using SMS

### Mobile Application:
  1. Intercept the messages sent from Twilio, an SMS messaging application and present them inside an android app
  2. Give students the ability to access classes
  3. Allow students to give quizzes and submit them
  4. Allow students to access textual study material.

### Setting up the project:
   Starting the backend server
   ```
   cd backend/
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver 0.0.0.0:8000
   ```
   Starting the frontend server
   ```
   cd frontend/  # Go to the frontend server
   npm install   # Install the dependencies
   npm run start  # Start the development server
   ```
   Setting up ngrok tunnel
   ```
   ngork http 8000  # Forward the ngrok tunnel to port 8000 in localhost, for setting up twilio
   ```
   Setting up twilio
   ```
   1. Register for a free Twilio account
   2. Register a free US number for sending sms
   3. Install twilio python client
   4. Setup the webhook using the public URL from the ngrok tunnel, to the specific view https://[ngrok-server]/classroom/receive_sms/
   ```
  
### Parts of the web application:
  
  Backend: Django, Django Rest Framework, Twilio python API, Amazon SNS <br/>
  Frontend: React, Material UI React


### Future plans:
   
   Add pdf conversion to textual study material to SMS format. <br/>
   Deploy using AWS Elastic BeanStalk, or an EC2 instance
 
