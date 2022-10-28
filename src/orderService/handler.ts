import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import fetch from "node-fetch";
import AWS from "aws-sdk";

type Order = {
  id: string;
  billingDate: Date;
};

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const tableName = "ordersTable";

  if (event.httpMethod === "POST") {
    if (event.body) {
      const data = JSON.parse(event.body) as Order;

      const params = {
        TableName: tableName,
        Item: data,
      };

      const response = await fetch(
        "https://gq5qiy5s3g.execute-api.eu-west-1.amazonaws.com/dev/ghi"
      );

      const productData = await response.json();
      console.log(productData);

      try {
        await docClient.put(params).promise();
        return {
          statusCode: 200,
          body: JSON.stringify(data),
        };
      } catch (err) {
        return {
          statusCode: 400,
          body: `POST error: ${err}`,
        };
      }
    }
  }

  if (event.httpMethod === "GET") {
    const id = event.pathParameters!.id;

    if (!id) {
      throw new Error("ID not provided");
    }

    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };

    try {
      const data = await docClient.get(params).promise();

      if (!data) {
        return {
          statusCode: 400,
          body: "Item with this ID not found",
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (err) {
      return {
        statusCode: 400,
        body: `GET error: ${err}`,
      };
    }
  }

  return {
    statusCode: 400,
    body: "UNAUTHORIZED",
  };
};
