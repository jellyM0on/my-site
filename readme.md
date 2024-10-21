## About 
This project is my portfolio site built using different AWS services to learn more about them. 

The frontend files are stored in a S3 bucket served through a CloudFront distribution. Its visitor counter works through a Lambda HTTP API. 
To streamline future deployments, it also integrates a CI/CD pipeline to automatically update the S3 files for the frontend, update the backend infrastructure through IaC, and conduct tests. 

## Stack
- Frontend: JavaScript, Bootstrap, rough-notation
- Hosting: AWS S3, CloudFront, Route53
- Serverless Backend: AWS DynamoDB, Lambda, API Gateway 
- Testing: Cypress
- IaC: Terraform 

The stack used for this project is based on the Cloud Resume Challenge guidelines by Forrest Brazael. 

