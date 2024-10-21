import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;
const item = process.env.ITEM; 

export const handler = async (event) => {
  const origin = event.headers.Origin || event.headers.origin; 
  if(origin != "https://ylana-ong.com"){
    return{
      statusCode: 403, 
      body: JSON.stringify({error: "Origin not allowed"}),
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Headers": "Content-Type", 
      }
    }
  }
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json", 
    "Access-Control-Allow-Origin": "https://ylana-ong.com",
    "Access-Control-Allow-Headers": "Content-Type", 
    "Access-Control-Allow-Methods": "GET, POST"
  };

  try {
    switch(event.routeKey){
      case "GET /count":
        const getResponse = await dynamo.send(
          new GetCommand({
            TableName: tableName, 
            Key: {
              id: item,
            },
          })
        );
        const currentCountGet = getResponse.Item ? getResponse.Item.count : 0;
        body = { count: currentCountGet };
        break;
        
      case "POST /count": 
        const updateResponse = await dynamo.send(
          new UpdateCommand({
            TableName: tableName,
            Key: {
              id: item, 
            },
            UpdateExpression: "ADD #count :inc",
            ExpressionAttributeNames: {
              "#count": "count"
            }, 
            ExpressionAttributeValues: {
              ":inc": 1
            },
            ReturnValues: "UPDATED_NEW"
          })
        );
        body = { count: updateResponse.Attributes.count };
        break;
        
      default:
        statusCode = 405; 
        body: {error: `Unsupported HTTP method: ${event.httpMethod}`}
      
    }
      
  } catch (err){
    statusCode = 500;
    body = { error: 'Internal Server Error' };
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
