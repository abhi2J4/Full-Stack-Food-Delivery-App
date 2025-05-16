create application.properties  then write all the code given below



spring.application.name=foodiesApi


#mongodb configuration
spring.data.mongodb.uri=mongodb://localhost:27017/foodies


#aws s3 configuration
aws.access.key=${AWS_ACCESS_KEY}
aws.secret.key=${AWS_SECRET_KEY}
aws.region=ap-south-1
aws.s3.bucketname=

jwt.secret.key=


#razorpay configuration
razorpay_key=${RAZORPAY_KEY}
razorpay_secret=${RAZORPAY_SECRET}


adminpanel  start in terminal  npm run dev
foodies   start  in  terminal  npm run dev 

foodiesApi backend run in intellije

#environment variables add 
AWS_ACCESS_KEY
AWS_SECRET_KEY
RAZORPAY_KEY
RAZORPAY_SECRET  #add environment variables


foodies/src/util add 

export const RAZORPAY_KEY = "";