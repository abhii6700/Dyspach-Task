# TASK TRACKER APP

#### HOW TO RUN LOCALLY

1. Clone the respository from github.

2. In the project directory, Run `npm install`

3. Once the installation is complete, Run `npm start`

4. The Project will start locally in your browser.

#### APP DESCRIPTION

This is an Task Tracking App with all the functionalities for Adding, Updating, Deleting a Task and marking it as completed. This App uses `Redux Toolkit` for state management and `Material UI` for giving this application a decent UI experience. There are a few components and files which are grouped together to make this an completed Application:

1. `Task Modal` : It Contains a form to fill all the necessary information about your task, such as, Title, Description and Due Date. Also this component dispatches the actions for adding and updating a task.

2. `Task List` : It fetches all the Tasks and displays it in a form of list. All the task are sorted based on their creation date.

3. `Task Card` : This component is receiving a task and displaying it in a form of card. You can perform multiple action through this card, like, marking a task as completed, editing a task and deleting a task.

4. `Task Home` : This is the Home Page of the application which render all components. This component contains a Button to `Add Tasks`, a Filter component to `filter Tasks` based on their status and the Task List component.

5. `Task Slice` : This is a Slice which contains all the logic for adding, updating, deleting a task along with handling the filter.
