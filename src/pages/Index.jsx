import React, { useState } from "react";
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Badge, Flex, Spacer, useColorModeValue, Select } from "@chakra-ui/react";
import { FaRedo } from "react-icons/fa";

const transcriptions = [
  { id: 1, name: "Transcription 1", date: "2023-05-01", size: 10.5, summary: "Summary of transcription 1", status: "success" },
  { id: 2, name: "Transcription 2", date: "2023-05-02", size: 0, summary: "", status: "failed", failureReason: "chatgpt4" },
  { id: 3, name: "Transcription 3", date: "2023-05-03", size: 5.2, summary: "Summary of transcription 3", status: "success" },
  { id: 4, name: "Transcription 4", date: "2023-05-04", size: 0, summary: "", status: "failed", failureReason: "transcription" },
  { id: 5, name: "Transcription 5", date: "2023-05-05", size: 8.7, summary: "Summary of transcription 5", status: "success" },
  { id: 6, name: "Transcription 6", date: "2023-05-06", size: 3.1, summary: "Summary of transcription 6", status: "success" },
  { id: 7, name: "Transcription 7", date: "2023-05-07", size: 0, summary: "", status: "failed", failureReason: "chatgpt4" },
  { id: 8, name: "Transcription 8", date: "2023-05-08", size: 6.4, summary: "Summary of transcription 8", status: "success" },
  { id: 9, name: "Transcription 9", date: "2023-05-09", size: 0, summary: "", status: "failed", failureReason: "transcription" },
  { id: 10, name: "Transcription 10", date: "2023-05-10", size: 9.2, summary: "Summary of transcription 10", status: "success" },
];

const Index = () => {
  const [data, setData] = useState(transcriptions);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleRerun = (id) => {
    // Simulating rerunning the transcription
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return { ...item, size: Math.random() * 10, summary: `Rerun summary of transcription ${id}`, status: "success" };
      }
      return item;
    });
    setData(updatedData);
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const headerBgColor = useColorModeValue("gray.100", "gray.700");

  const filteredData = filterStatus === "all" ? data : data.filter((item) => item.status === filterStatus);

  return (
    <Box p={4}>
      <Flex align="center" mb={4}>
        <Heading size="xl">Transcription Management</Heading>
        <Spacer />
        <Select w="200px" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </Select>
        <Spacer />
        <Button colorScheme="blue">Add Transcription</Button>
      </Flex>
      <Box bg={bgColor} borderRadius="md" boxShadow="md" p={4}>
        <Table variant="simple">
          <Thead>
            <Tr bg={headerBgColor}>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Size (MB)</Th>
              <Th>Summary</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.date}</Td>
                <Td>{item.size === 0 ? "-" : item.size.toFixed(2)}</Td>
                <Td>{item.summary || "-"}</Td>
                <Td>
                  <Badge colorScheme={item.status === "success" ? "green" : "red"}>{item.status === "failed" ? `Failed (${item.failureReason})` : "Success"}</Badge>
                </Td>
                <Td>
                  {item.size === 0 && (
                    <Button size="sm" leftIcon={<FaRedo />} onClick={() => handleRerun(item.id)}>
                      Rerun
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Index;
