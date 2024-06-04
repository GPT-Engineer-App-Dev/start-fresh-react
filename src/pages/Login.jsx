import { Container, Box, VStack, Heading, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SupabaseAuthUI, useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Login = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container centerContent>
      <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" w="100%" maxW="md">
        <VStack spacing={4}>
          <Heading as="h1" size="lg">Login</Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          {session ? (
            <>
              <Button colorScheme="teal" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <SupabaseAuthUI />
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;