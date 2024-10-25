# JIRA-clone API

This API provides endpoints to manage comments related to tasks, users, and comments. Below are the available routes and their usage.

## Endpoints

### Get All Tasks

- **URL:** `/tasks`
- **Method:** `GET`
- **Query Parameters:**
  - `assignedTo` (optional): Filter tasks by the user they are assigned to.
  - `createdBy` (optional): Filter tasks by the user who created them.
- **Description:** Retrieves all tasks. If `assignedTo` is provided, it filters tasks by the specified user. If `createdBy` is provided, it filters tasks by the creator.

### Get a Task by ID

- **URL:** `/tasks/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific task by its ID, along with its related comments.

### Create a Task

- **URL:** `/tasks`
- **Method:** `POST`
- **Body Parameters:**
  - `createdBy` (required): The ID of the user creating the task.
  - `title` (required): The title of the task.
  - `description` (required): The description of the task.
  - `assignedTo` (required): The ID of the user the task is assigned to.
- **Description:** Creates a new task with the provided details. The task is initialized with a status of "To Do".

### Update a Task

- **URL:** `/tasks/:id`
- **Method:** `PATCH`
- **Body Parameters:**
  - `title` (optional): The new title of the task.
  - `description` (optional): The new description of the task.
  - `assignedTo` (optional): The new user ID the task is assigned to.
  - `status` (optional): The new status of the task.
- **Description:** Updates the specified fields of a task by its ID.

### Delete a Task

- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Description:** Deletes a specific task by its ID.

### Get All Users

- **URL:** `/users`
- **Method:** `GET`
- **Description:** Retrieves a list of all users.

### Get a User by ID

- **URL:** `/users/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific user by their unique ID.

### Create a User

- **URL:** `/users`
- **Method:** `POST`
- **Body Parameters:**
  - `name` (required): The name of the user.
  - `username` (required): The username of the user.
  - `email` (required): The email address of the user.
- **Description:** Creates a new user with the provided details. Ensures the username is unique.

### Update a User

- **URL:** `/users/:id`
- **Method:** `PATCH`
- **Body Parameters:** Any fields of the user that need to be updated.
- **Description:** Updates the specified fields of a user by their ID.

### Delete a User

- **URL:** `/users/:id`
- **Method:** `DELETE`
- **Description:** Deletes a specific user by their ID.

### Get Tasks Assigned to a User

- **URL:** `/users/:id/assignedtasks`
- **Method:** `GET`
- **Description:** Retrieves tasks that are assigned to a specific user by their ID.

### Get Tasks Created by a User

- **URL:** `/users/:id/createdtasks`
- **Method:** `GET`
- **Description:** Retrieves tasks that were created by a specific user by their ID.

### Get Comments by a User

- **URL:** `/users/:id/comments`
- **Method:** `GET`
- **Description:** Retrieves comments made by a specific user by their ID.

### Get All Comments

- **URL:** `/api/comments/`
- **Method:** `GET`
- **Query Parameters:**
  - `userId` (optional): Filter comments by user ID.
  - `taskId` (optional): Filter comments by task ID.
- **Description:** Retrieves all comments. If `userId` is provided, it filters comments by the specified user. If `taskId` is provided, it filters comments by the specified task.

### Create a Comment

- **URL:** `/api/comments/`
- **Method:** `POST`
- **Body Parameters:**
  - `userId` (required): The ID of the user creating the comment.
  - `taskId` (required): The ID of the task the comment is related to.
  - `content` (required): The content of the comment.
- **Description:** Creates a new comment associated with a user and a task.

### Get a Comment by ID

- **URL:** `/api/comments/:id`
- **Method:** `GET`
- **Description:** Retrieves a specific comment by its ID.

### Update a Comment

- **URL:** `/api/comments/:id`
- **Method:** `PATCH`
- **Body Parameters:** Any fields of the comment that need to be updated.
- **Description:** Updates the specified fields of a comment by its ID.

### Delete a Comment

- **URL:** `/api/comments/:id`
- **Method:** `DELETE`
- **Description:** Deletes a specific comment by its ID.
