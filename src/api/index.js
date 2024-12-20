// Base URL for the Storypath RESTful API
const API_BASE_URL = "https://0b5ff8b0.uqcloud.net/api";

// JWT token for authorization, replace with your actual token from My Grades in Blackboard
const JWT_TOKEN = ""; //Replace with your actual token from My Grades in Blackboard

// Your UQ student username, used for row-level security to retrieve your records
const USERNAME = "s4834800";

/**
 * Helper function to handle API requests.
 * It sets the Authorization token and optionally includes the request body.
 *
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} [method='GET'] - The HTTP method to use (GET, POST, PATCH).
 * @param {object} [body=null] - The request body to send, typically for POST or PATCH.
 * @returns {Promise<object>} - The JSON response from the API.
 * @throws Will throw an error if the HTTP response is not OK.
 */
async function apiRequest(endpoint, method = "GET", body = null) {
  const options = {
    method, // Set the HTTP method (GET, POST, PATCH)
    headers: {
      "Content-Type": "application/json", // Indicate that we are sending JSON data
      Authorization: `Bearer ${JWT_TOKEN}`, // Include the JWT token for authentication
    },
  };

  // If the method is POST or PATCH, we want the response to include the full representation
  if (method === "POST" || method === "PATCH") {
    options.headers["Prefer"] = "return=representation";
  }

  // If a body is provided, add it to the request and include the username
  if (body) {
    options.body = JSON.stringify({ ...body, username: USERNAME });
  }

  // Make the API request and check if the response is OK
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status.toString()}`);
  }

  if (method === "DELETE") {
    return;
  }
  // Return the response as a JSON object
  return response.json();
}

/**
 * Function to insert a new project into the database.
 *
 * @param {object} project - The project data to insert.
 * @returns {Promise<object>} - The created project object returned by the API.
 */
export async function createProject(project) {
  return apiRequest("/project", "POST", project);
}

export async function createLocation(location) {
  return apiRequest("/location", "POST", location);
}

/**
 * Function to list all projects associated with the current user.
 *
 * @returns {Promise<Array>} - An array of project objects.
 */
export async function getProjects() {
  return apiRequest("/project");
}

export async function deleteProject(id) {
  return apiRequest(`/project?id=eq.${id}`, "DELETE");
}

export async function deleteLocation(id) {
  return apiRequest(`/location?id=eq.${id}`, "DELETE");
}
/**
 * Function to get a single project by its ID.
 * The url is slightly different from usual RESTFul ...
 * See the operators section https://docs.postgrest.org/en/v12/references/api/tables_views.html
 * @param {string} id - The ID of the project to retrieve.
 * @returns {Promise<object>} - The project object matching the ID.
 */
export async function getProject(id) {
  return apiRequest(`/project?id=eq.${id}`);
}
//Get location for a given project
export async function getLocation(id) {
  return apiRequest(`/location?project_id=eq.${id}`);
}

export async function LocationById(id) {
  return apiRequest(`/location?id=eq.${id}`);
}

export const updateProject = async (id, project) => {
  return apiRequest(`/project?id=eq.${id}`, "PATCH", project);
};

export const updateLocation = async (id, location) => {
  return apiRequest(`/location?id=eq.${id}`, "PATCH", location);
};
