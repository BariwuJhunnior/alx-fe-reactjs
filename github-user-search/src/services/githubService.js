import axios from "axios";

const GITHUB_BASE_URL = "https://api.github.com";

export const fetchUserData = async (username) => {
  if (!username) {
    throw new Error("Username cannot be empty.");
  }

  const url = `${GITHUB_BASE_URL}/users/${username}`;

  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.Error(
      "Error fetching user data: ",
      error.response || error.message
    );

    if (error.response && error.response.status === 404) {
      throw new Error("User not found.");
    } else {
      throw new Error("An error occurred during the API request.");
    }
  }
};
