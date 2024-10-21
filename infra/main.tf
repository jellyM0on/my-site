terraform {
    required_providers{
        aws = {
            source = "hashicorp/aws"
            version = "~> 5.0"
        }
    }
    backend "s3"{
            
    }
}

variable "AWSRG" {
    type = string
}

provider "aws" {
    region = var.AWSRG
}

data "aws_secretsmanager_secret_version" "creds"{
    secret_id = "/mysite/secrets"
}

locals{
    cred = jsondecode(
        data.aws_secretsmanager_secret_version.creds.secret_string
    )
}

# DynamoDB
resource "aws_dynamodb_table" "db-table" {
    name = local.cred.DB_NAME
    hash_key = local.cred.DB_HASH
    attribute {
        name = local.cred.DB_HASH
        type = "S"
    }
    billing_mode = "PAY_PER_REQUEST"

    on_demand_throughput{
        max_read_request_units = 1
        max_write_request_units = 1
    }
}

# Lambda Policy with Database
resource "aws_iam_role_policy" "db-policy" {
    name = local.cred.POL_NAME
    role = local.cred.POL_ROLE
    
    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [{
            Action = [
                "dynamodb:GetItem",
                "dynamodb:UpdateItem",
                "dynamodb:PutItem",
            ]
            Effect = "Allow"
            Resource = local.cred.POL_RESOURCE
        }]
    })
}

# Lambda Function
resource "aws_lambda_function" "counter-func" {
    function_name = local.cred.LAM_NAME
    role = local.cred.LAM_ROLE
    filename = "lambda_function.zip"
    handler = "index.handler"
    runtime = "nodejs20.x"
    environment {
        variables = {
            "ITEM" = local.cred.DB_ITEM
            "ORIGIN" = "https://ylana-ong.com/"
            "TABLE_NAME" = local.cred.DB_NAME
        }
    }
}

# API Gateway
resource "aws_apigatewayv2_api" "api" {
    name = local.cred.API_NAME
    protocol_type = "HTTP"
    cors_configuration{
        allow_credentials = false
        allow_headers = ["content-type",]
        allow_methods = ["GET", "POST",]
        allow_origins = ["https://ylana-ong.com",]
        expose_headers = []
        max_age = 0
    }
}

# API Gateway Integration
resource "aws_apigatewayv2_integration" "lambda_integration" {
    api_id = local.cred.API_ID
    integration_method = "POST"
    integration_type = "AWS_PROXY"
    integration_uri  = local.cred.API_INT_URI
    payload_format_version = "2.0"
    request_parameters = {}
    request_templates = {}
}

# API Gateway Route
resource "aws_apigatewayv2_route" "get-route" {
    api_id = local.cred.API_ID
    authorization_scopes = []
    route_key = "GET /count"
    target = local.cred.API_GET_TARGET
}

resource "aws_apigatewayv2_route" "post-route" {
    api_id = local.cred.API_ID
    authorization_scopes = []
    route_key = "POST /count"
    target = local.cred.API_POST_TARGET
}

# API Stage
resource "aws_apigatewayv2_stage" "prod-stage" {
  api_id = local.cred.API_ID
  name = "prod"
  auto_deploy = false
  stage_variables = {}
  tags = {}
  default_route_settings{
    data_trace_enabled = false
    detailed_metrics_enabled = false
    throttling_burst_limit = 4
    throttling_rate_limit = 4
  }
}
