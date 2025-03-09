import { Table, Tbody, Td, Th, Thead, Tr, Button, Avatar } from '@chakra-ui/react';

const UserTable = ({ users, onEdit, onDelete, onView }: 
  { users: any[], onEdit: (user: any) => void, onDelete: (id: number) => void, onView: (id: number) => void }) => (
  <Table variant="striped">
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
          <Td><Avatar src={user.avatar} /></Td>
          <Td>{user.first_name} {user.last_name}</Td>
          <Td>{user.email}</Td>
          <Td>
            <Button colorScheme="blue" onClick={() => onEdit(user)}>Edit</Button>
            <Button colorScheme="red" onClick={() => onDelete(user.id)} ml={2}>Delete</Button>
            <Button colorScheme="teal" onClick={() => onView(user.id)} ml={2}>View Details</Button>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default UserTable;
