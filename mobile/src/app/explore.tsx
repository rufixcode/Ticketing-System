import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { featuredEvents, reservationSteps } from '@/data/mockCatalog';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, Spacing } from '@/constants/theme';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Browse catalog
          </ThemedText>
          <ThemedText type="subtitle" style={styles.title}>
            Schedules and venues
          </ThemedText>
        </View>

        <FlatList
          data={featuredEvents}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.stepsRow}>
              {reservationSteps.map((step, index) => (
                <ThemedView type="backgroundElement" style={styles.stepCard} key={step.id}>
                  <ThemedText type="code">{String(index + 1).padStart(2, '0')}</ThemedText>
                  <ThemedText type="smallBold">{step.title}</ThemedText>
                </ThemedView>
              ))}
            </View>
          }
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ThemedView type="backgroundElement" style={styles.listItem}>
              <View style={styles.listItemHeader}>
                <ThemedText type="smallBold">{item.title}</ThemedText>
                <ThemedText type="code">{item.type}</ThemedText>
              </View>
              <ThemedText type="small" themeColor="textSecondary">
                {item.venue}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {item.schedule} · {item.availableSlots} slots · {item.price}
              </ThemedText>
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
  listContent: {
    gap: Spacing.three,
  },
  stepsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  stepCard: {
    flex: 1,
    minHeight: 84,
    justifyContent: 'space-between',
    borderRadius: Spacing.three,
    padding: Spacing.two,
  },
  listItem: {
    gap: Spacing.two,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
});
