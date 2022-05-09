import { Handler } from "aws-lambda";

export const createUser: Handler = async (event: any): Promise<any> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
    },
    body: "Creating user",
  };
};

export const getUser: Handler = async (event: any): Promise<any> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/plain",
    },
		body: "Getting user",
  };
};

export const updateUser: Handler = async (event:any): Promise<any> => {
	return {
		statusCode: 200,
		headers: {
			"Content-Type": "text/plain",
		},
		body: "Updating user",
	};
};

export const deleteUser: Handler = async (event: any): Promise<any> => {
	return {
		statusCode: 200,
		headers: {
			"Content-Type": "text/plain",
		},
		body: "Deleting user",
	};
};
