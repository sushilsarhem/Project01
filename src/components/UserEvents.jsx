import React, { useEffect, useState, useContext } from "react";
import { account, databases, Query, storage } from "./appwrite/appwrite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "./appwrite/Context";
import "./UserEvents.css";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const UserEvents = () => {
  const [taskList, SetTaskList] = useState([]);
  const [newTask, SetNewTask] = useState("");

  const { user } = useContext(UserContext);

  async function FetchEvents() {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION2_ID,
        [Query.equal("userId", user.$id)]
      );
      const notes =
        response.documents.length > 0 ? response.documents[0].Notes : [];
      SetTaskList(notes || []);
    } catch (error) {
      console.log("Unable to fetch tasks", error);
    }
  }

  async function AddTask() {
    const updatedTask = [...taskList, [newTask]];
    if (newTask.trim() === "") {
      console.log("input field cannot be empty");
      return;
    }
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION2_ID,
        [Query.equal("userId", user.$id)]
      );
      if (response.documents.length === 0) {
        await databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION2_ID,
          "unique()",
          {
            userId: user.$id,
            Notes: newTask,
          }
        );
      } else {
        const documentId = response.documents[0].$id;
        await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION2_ID,
          documentId,
          {
            Notes: updatedTask,
          }
        );
      }
      SetTaskList(updatedTask);
      SetNewTask("");
    } catch (error) {
      console.log("Error loading task", error);
    }
  }

  useEffect(() => {
    FetchEvents();
    // AddTask();
  }, [user]);

  async function DeleteTask(index) {
    const updatedTask = taskList.filter((_, id) => id != index);
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION2_ID,
        [Query.equal("userId", user.$id)]
      );
      if (response.documents.length > 0) {
        const documentId = response.documents[0].$id;
        await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION2_ID,
          documentId,
          {
            Notes: updatedTask,
          }
        );
      }
      SetTaskList(updatedTask);
    } catch (error) {
      console.log("Error deleting task", error);
    }
  }

  return (
    <div className="event-wrapper">
      <div className="event-container">
        <input
          type="text"
          name="notes"
          value={newTask}
          placeholder="enter a new event..."
          onChange={(event) => SetNewTask(event.target.value)}
        />
        <button onClick={AddTask}>ADD</button>
      </div>
      <div className="todo-container">
        <ul className="user-list">
          <h2>Your Event List:</h2>
          {taskList.map((task, index) => (
            <div key={index}>
              <li>{task}</li>
              <span>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => DeleteTask(index)}
                />
              </span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
