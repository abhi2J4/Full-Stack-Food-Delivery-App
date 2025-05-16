✅ 1. application.properties (in src/main/resources/ of your Spring Boot app)
Create a file named application.properties and add the following:

properties

# Application Name
spring.application.name=foodiesApi

# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/foodies

# AWS S3 Configuration
aws.access.key=${AWS_ACCESS_KEY}
aws.secret.key=${AWS_SECRET_KEY}
aws.region=ap-south-1
aws.s3.bucketname=

# JWT Secret Key
jwt.secret.key=

# Razorpay Configuration
razorpay_key=${RAZORPAY_KEY}
razorpay_secret=${RAZORPAY_SECRET}
✅ 2. Add the following to foodies/src/util/contants.js or a new file like razorpay.js


export const RAZORPAY_KEY = "";
✅ 3. Add this to README.md

## Project Setup Instructions

### Backend (Spring Boot - foodiesApi)

1. Configure application properties in `src/main/resources/application.properties`:
   ```properties
   spring.application.name=foodiesApi

   # MongoDB Configuration
   spring.data.mongodb.uri=mongodb://localhost:27017/foodies

   # AWS S3 Configuration
   aws.access.key=${AWS_ACCESS_KEY}
   aws.secret.key=${AWS_SECRET_KEY}
   aws.region=ap-south-1
   aws.s3.bucketname=

   # JWT Configuration
   jwt.secret.key=

   # Razorpay Configuration
   razorpay_key=${RAZORPAY_KEY}
   razorpay_secret=${RAZORPAY_SECRET}
Add the following environment variables:

AWS_ACCESS_KEY

AWS_SECRET_KEY

RAZORPAY_KEY

RAZORPAY_SECRET

Run backend in IntelliJ:

go

Run the `foodiesApi` Spring Boot application
Frontend (React Projects)
Admin Panel
Navigate to the admin panel directory:


cd adminpanel
Start the app:


npm run dev
Foodies
Navigate to the foodies directory:


cd foodies
Start the app:


npm run dev
Add Razorpay Key in foodies/src/util/contants.js:

export const RAZORPAY_KEY = "";