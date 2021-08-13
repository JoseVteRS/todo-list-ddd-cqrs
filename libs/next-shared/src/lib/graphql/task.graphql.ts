import { gql } from '@apollo/client';

export const task_update = gql`
  mutation task_update($taskId: ID!, $input: TaskUpdateInput!) {
    task_update(taskId: $taskId, input: $input)
  }
`;

export const task_find_by_id = gql`
  query task_find_by_id($taskId: ID!) {
    task_find_by_id(taskId: $taskId) {
      _id
      title
      description
      is_finish
    }
  }
`;

export const task_list = gql`
  query task_list {
    task_list {
      _id
      title
      description
      is_finish
    }
  }
`;

export const task_mark_as_finished = gql`
  mutation task_mark_as_finished($taskId: ID!) {
    task_mark_as_finished(taskId: $taskId)
  }
`;

export const task_mark_as_not_finished = gql`
  mutation task_mark_as_not_finished($taskId: ID!) {
    task_mark_as_not_finished(taskId: $taskId)
  }
`;

export const task_delete = gql`
  mutation task_delete($taskId: ID!) {
    task_delete(taskId: $taskId)
  }
`;

export const task_create = gql`
  mutation task_create($input: TaskCreateInput!) {
    task_create(input: $input)
  }
`;