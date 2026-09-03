import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { reservationSteps } from '@/data/mockCatalog';
import { getNextReservationStep } from '@/features/reservations/reservation-flow';
import { getUsers } from '@/services/userService';
import type { ApiUser } from '@/types/user';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { API_BASE_URL } from '@/services/apiClient';
import { BottomTabInset, Spacing } from '@/constants/theme';

const nextStep = getNextReservationStep(reservationSteps, 'browse');

export default function HomeScreen() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function loadUsers() {
    setError('');
    setIsLoading(true);

    try {
      setUsers(await getUsers());
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to load users.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadUsers();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            MallTix Mobile
          </ThemedText>
          <ThemedText type="subtitle" style={styles.title}>
            Connected to Laravel
          </ThemedText>
          <ThemedText themeColor="textSecondary">
            This screen loads users from the backend API at {API_BASE_URL}.
          </ThemedText>
        </View>

        <ThemedView type="backgroundElement" style={styles.summaryPanel}>
          <View>
            <ThemedText type="small" themeColor="textSecondary">
              Shared backend resource
            </ThemedText>
            <ThemedText type="smallBold">Users</ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.summaryText}>
            Web and mobile both read from the same Laravel users endpoint. Next app feature: {nextStep.title}.
          </ThemedText>
        </ThemedView>

        <View style={styles.sectionHeader}>
          <ThemedText type="smallBold">Backend users</ThemedText>
          <Pressable style={styles.button} onPress={loadUsers} disabled={isLoading}>
            <ThemedText type="smallBold" style={styles.buttonText}>
              {isLoading ? 'Loading' : 'Refresh'}
            </ThemedText>
          </Pressable>
        </View>

        {error ? <ThemedText type="smallBold" style={styles.errorText}>{error}</ThemedText> : null}

        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <ThemedView type="backgroundElement" style={styles.emptyCard}>
              <ThemedText type="small" themeColor="textSecondary">
                {isLoading ? 'Loading users...' : 'No users found yet.'}
              </ThemedText>
            </ThemedView>
          }
          renderItem={({ item }) => (
            <ThemedView type="backgroundElement" style={styles.userCard}>
              <View>
                <ThemedText type="smallBold" style={styles.userName}>
                  {item.name}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {item.email}
                </ThemedText>
              </View>
              <ThemedText type="code">#{item.id}</ThemedText>
            </ThemedView>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  header: {
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  title: {
    lineHeight: 38,
  },
  summaryPanel: {
    gap: Spacing.two,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    marginBottom: Spacing.three,
  },
  summaryText: {
    maxWidth: 340,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  button: {
    minHeight: 40,
    justifyContent: 'center',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    backgroundColor: '#2563eb',
  },
  buttonText: {
    color: '#ffffff',
  },
  errorText: {
    color: '#b91c1c',
    marginBottom: Spacing.three,
  },
  listContent: {
    gap: Spacing.three,
  },
  emptyCard: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  userName: {
    fontSize: 20,
    lineHeight: 26,
  },
});
