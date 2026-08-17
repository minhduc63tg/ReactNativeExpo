import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoCardProps {
  title: string;
  email: string;
  className: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, email, className }) => {
  return (
    <View
      style={styles.cardContainer}
      accessible={true}
      accessibilityLabel={`${title}. Email: ${email}. Lớp: ${className}`}
    >
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>Email: {email}</Text>
      <Text style={styles.cardText}>Lớp: {className}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#F0F4F8',
    borderColor: '#CCE0F5',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },
});