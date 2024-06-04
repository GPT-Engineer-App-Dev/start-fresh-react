import { Container, Text, VStack, Box, Flex, Spacer, IconButton, useColorMode, useColorModeValue, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { FaSun, FaMoon } from "react-icons/fa";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { session, logout } = useSupabaseAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");

  return (
    <Box bg={bg} color={color} minH="100vh">
      <Flex as="nav" p={4} boxShadow="md">
        <Text fontSize="xl" fontWeight="bold">MyApp</Text>
        <Spacer />
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
        {session ? (
          <Button ml={4} onClick={handleLogout}>Logout</Button>
        ) : (
          <Button ml={4} onClick={() => navigate("/login")}>Login</Button>
        )}
      </Flex>
      <Container centerContent maxW="container.md" py={8}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Your Blank Canvas</Text>
          <Text>Chat with the agent to start making edits.</Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;