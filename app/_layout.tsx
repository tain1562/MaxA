import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    // Redirect to membership screen on initial load
    router.replace('/membership');
  }, []);

  return (
    <Stack>
      <Stack.Screen name="membership" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
