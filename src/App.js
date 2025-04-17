import React, { useState } from 'react';
import { Button, Input, List, message } from 'antd';
import './App.css';

const App = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  
  const apiURL = "https://v1.nocodeapi.com/ulasemili/google_sheets/FSuGYPPofNsUEeLK?tabId=Sayfa1";

  const addTask = async () => {
    if (!task.trim()) return;

    const newTask = [[task]];

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
      });

      if (response.ok) {
        setTodos([...todos, task]);
        setTask('');
        message.success('Görev başarıyla eklendi!');
      } else {
        message.error('Görev eklenemedi!');
      }
    } catch (error) {
      message.error('Bir hata oluştu!');
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <div className="todo-header">
        <h1>Yapılacaklar Listesi</h1>
      </div>
      <div className="todo-input">
        <Input 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Yeni bir görev girin..." 
        />
        <Button type="primary" onClick={addTask}>Ekle</Button>
      </div>
      <div className="todo-list">
        <List
          bordered
          dataSource={todos}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </div>
  );
};

export default App;
