import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

export default function MembershipScreen() {
  // Function to handle membership selection
  const handleMembershipSelect = (type: string) => {
    // Here you would typically save the membership type
    console.log('Selected membership:', type);
    // Navigate to the main app tabs with membership data
    router.replace({
      pathname: '/(tabs)',
      params: { membershipType: type }
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <Image
            source={require('@/assets/images/grace.png')}
            style={styles.logo}
          />
          <ThemedText type="title" style={styles.title}>Choose Your Membership</ThemedText>
          <ThemedText style={styles.subtitle}>Select the plan that best fits your needs</ThemedText>
        </ThemedView>

        {/* Membership Options */}
        <ThemedView style={styles.membershipContainer}>
          {/* Basic Plan */}
          <TouchableOpacity 
            style={styles.membershipCard}
            onPress={() => handleMembershipSelect('basic')}
          >
            <ThemedText type="subtitle" style={styles.planTitle}>Basic</ThemedText>
            <ThemedText style={styles.price}>$9.99<ThemedText style={styles.period}>/month</ThemedText></ThemedText>
            <ThemedView style={styles.features}>
              <ThemedText>• Basic profile features</ThemedText>
              <ThemedText>• Limited skill showcase</ThemedText>
              <ThemedText>• Standard support</ThemedText>
            </ThemedView>
          </TouchableOpacity>

          {/* Pro Plan */}
          <TouchableOpacity 
            style={[styles.membershipCard, styles.proCard]}
            onPress={() => handleMembershipSelect('pro')}
          >
            <ThemedText type="subtitle" style={styles.planTitle}>Pro</ThemedText>
            <ThemedText style={styles.price}>$19.99<ThemedText style={styles.period}>/month</ThemedText></ThemedText>
            <ThemedView style={styles.features}>
              <ThemedText>• All Basic features</ThemedText>
              <ThemedText>• Advanced profile customization</ThemedText>
              <ThemedText>• Priority support</ThemedText>
              <ThemedText>• Analytics dashboard</ThemedText>
            </ThemedView>
          </TouchableOpacity>

          {/* Enterprise Plan */}
          <TouchableOpacity 
            style={styles.membershipCard}
            onPress={() => handleMembershipSelect('enterprise')}
          >
            <ThemedText type="subtitle" style={styles.planTitle}>Enterprise</ThemedText>
            <ThemedText style={styles.price}>$49.99<ThemedText style={styles.period}>/month</ThemedText></ThemedText>
            <ThemedView style={styles.features}>
              <ThemedText>• All Pro features</ThemedText>
              <ThemedText>• Custom branding</ThemedText>
              <ThemedText>• 24/7 dedicated support</ThemedText>
              <ThemedText>• Advanced analytics</ThemedText>
              <ThemedText>• API access</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  membershipContainer: {
    gap: 20,
    paddingVertical: 10,
    width: '100%',
  },
  membershipCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
  },
  proCard: {
    borderColor: '#007AFF',
    borderWidth: 2,
    backgroundColor: '#f8f9ff',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  planTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  period: {
    fontSize: 16,
    opacity: 0.8,
  },
  features: {
    gap: 8,
    width: '100%',
  },
}); 