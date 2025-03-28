// Import necessary components from React Native and other libraries
import React from 'react';
import { Image, StyleSheet, Platform, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

// Import custom themed components
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  // State management for user profile data
  const [profile, setProfile] = useState({
    fName: '', // First name
    lName: '', // Last name
    about: '', // About me section
    email: '', // Email address
    skills: '', // Skills (stored as newline-separated text)
    dateOfBirth: new Date(), // Date of birth with default as current date
    streetAddress: '', // Street address
    unitBuilding: '', // Apartment/Unit number (optional)
    city: '', // City
    state: '', // State
    zipCode: '', // ZIP code
  });

  // State for controlling edit/view modes
  const [isEditing, setIsEditing] = useState(true);
  // State for controlling date picker visibility
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle saving profile data
  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to a database or local storage
    console.log('Profile saved:', profile);
  };

  // Function to handle switching to edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to handle date selection changes
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'web') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setProfile({ ...profile, dateOfBirth: selectedDate });
    }
  };

  // Function to format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to render date picker based on platform
  const renderDatePicker = () => {
    if (Platform.OS === 'web') {
      // Web version uses HTML date input
      return (
        <input
          type="date"
          value={profile.dateOfBirth.toISOString().split('T')[0]}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setProfile({ ...profile, dateOfBirth: newDate });
          }}
          style={styles.webDateInput}
        />
      );
    }

    // Mobile version uses native DateTimePicker
    return (
      <>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <ThemedText>{formatDate(profile.dateOfBirth)}</ThemedText>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={profile.dateOfBirth}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </>
    );
  };

  // Render edit mode view
  if (isEditing) {
    return (
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.container}>
          {/* Profile Header Section */}
          <ThemedView style={styles.header}>
            {/* Profile Picture */}
            <Image
              source={require('@/assets/images/grace.png')}
              style={styles.profileImage}
            />
            {/* Name Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={profile.fName}
              onChangeText={(text) => setProfile({ ...profile, fName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={profile.lName}
              onChangeText={(text) => setProfile({ ...profile, lName: text })}
            />
            {/* Date of Birth Section */}
            <ThemedView style={styles.dateContainer}>
              <ThemedText style={styles.dateLabel}>Date of Birth</ThemedText>
              {renderDatePicker()}
            </ThemedView>

            {/* Contact Section */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={profile.email}
              onChangeText={(text) => setProfile({ ...profile, email: text })}
              keyboardType="email-address"
            />

            {/* Address Section */}
            <ThemedView style={styles.dateContainer}>
              <ThemedText style={styles.dateLabel}>Address</ThemedText>
              <TextInput
                style={styles.input}
                placeholder="Street Address"
                value={profile.streetAddress}
                onChangeText={(text) => setProfile({ ...profile, streetAddress: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Unit/Building (Optional)"
                value={profile.unitBuilding}
                onChangeText={(text) => setProfile({ ...profile, unitBuilding: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={profile.city}
                onChangeText={(text) => setProfile({ ...profile, city: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="State"
                value={profile.state}
                onChangeText={(text) => setProfile({ ...profile, state: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="ZIP Code"
                value={profile.zipCode}
                onChangeText={(text) => setProfile({ ...profile, zipCode: text })}
                keyboardType="numeric"
              />
            </ThemedView>
          </ThemedView>
          {/* Skills Section */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Skills</ThemedText>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter your skills (one per line)"
              value={profile.skills}
              onChangeText={(text) => setProfile({ ...profile, skills: text })}
              multiline
            />
          </ThemedView>

          

          {/* Save Button */}
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <ThemedText style={styles.buttonText}>Save Profile</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    );
  }

  // Render view mode
  return (
    <ScrollView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        {/* Profile Header Section */}
        <ThemedView style={styles.header}>
          <Image
            source={require('@/assets/images/grace.png')}
            style={styles.profileImage}
          />
          <ThemedText type="title">{profile.fName} {profile.lName}</ThemedText>
        </ThemedView>

        {/* About Me Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">About Me</ThemedText>
          <ThemedText>{profile.about}</ThemedText>
        </ThemedView>

        {/* Personal Info Section */}
        <ThemedView style={styles.section}>
          <ThemedView style={styles.dateContainer}>
            <ThemedText style={styles.dateLabel}>Date of Birth</ThemedText>
            <ThemedText>{formatDate(profile.dateOfBirth)}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.dateContainer}>
            <ThemedText style={styles.dateLabel}>Address</ThemedText>
            <ThemedText>{profile.streetAddress}</ThemedText>
            {profile.unitBuilding && <ThemedText>{profile.unitBuilding}</ThemedText>}
            <ThemedText>{profile.city}, {profile.state} {profile.zipCode}</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Skills Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Skills</ThemedText>
          <ThemedView style={styles.skillsContainer}>
            {profile.skills.split('\n').map((skill, index) => (
              <ThemedText key={index}>• {skill}</ThemedText>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Contact Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Contact</ThemedText>
          <ThemedText>Email: {profile.email}</ThemedText>
        </ThemedView>

        {/* Edit Button */}
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  scrollView: {
    flex: 1, // Takes up all available space
  },
  container: {
    flex: 1,
    padding: 20, // Padding around the container
  },
  header: {
    alignItems: 'center', // Centers items horizontally
    marginBottom: 30,
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes the image circular
    marginBottom: 15,
  },
  section: {
    marginBottom: 25,
    gap: 8, // Space between elements
  },
  skillsContainer: {
    marginTop: 5,
    gap: 5, // Space between skills
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', // Aligns text to top for multiline input
  },
  button: {
    backgroundColor: '#007AFF', // iOS blue color
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
  webDateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
  dateContainer: {
    width: '100%',
    alignItems: 'flex-start', // Aligns items to the left
  },
  dateLabel: {
    textAlign: 'left',
    marginBottom: 5,
  },
});