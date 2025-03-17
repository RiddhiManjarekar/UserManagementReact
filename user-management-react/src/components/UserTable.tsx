import { Table, Tbody, Td, Th, Thead, Tr, Button, Avatar, ButtonGroup } from '@chakra-ui/react';
import { memo } from 'react';
import { User } from '../types';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onPatch: (user: User) => void;
}

const UserTable = memo(({ users, onEdit, onDelete, onView, onPatch }: UserTableProps) => (
  <Table variant="simple" size="md" colorScheme="gray">
    <Thead>
      <Tr>
        <Th>Avatar</Th>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {users.map(user => (
        <Tr key={user.id}>
          <Td>
  <Avatar src={user.avatar} name={`${user.first_name} ${user.last_name}`} />
</Td>
          <Td>{user.first_name} {user.last_name}</Td>
          <Td>{user.email}</Td>
          <Td>
            <ButtonGroup spacing={2}>
              <Button colorScheme="blue" onClick={() => onEdit(user)}>Edit</Button>
              <Button colorScheme="yellow" onClick={() => onPatch(user)}>Patch</Button>
              <Button colorScheme="red" onClick={() => onDelete(user.id)}>Delete</Button>
              <Button colorScheme="teal" onClick={() => onView(user.id)}>View Details</Button>
            </ButtonGroup>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
));

export default UserTable;
