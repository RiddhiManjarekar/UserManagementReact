import { Input } from '@chakra-ui/react';

const SearchFilter = ({ setSearch }: { setSearch: (query: string) => void }) => (
  <Input 
    placeholder="Search users..." 
    onChange={(e) => setSearch(e.target.value.trim())} 
  />
);

export default SearchFilter;
