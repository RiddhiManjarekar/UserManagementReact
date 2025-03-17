import { Button, HStack } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <HStack spacing={2} mt={4}>
      <Button isDisabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</Button>
      <Button isDisabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</Button>
    </HStack>
  );
};

export default Pagination;
