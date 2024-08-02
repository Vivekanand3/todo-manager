import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProject, addTodo, updateTodo, deleteTodo } from '../services/projectService';

const ProjectView = () => {
  const { id } = useParams();
}
