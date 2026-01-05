import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

type TimelineStep = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    description: string;
    status: 'completed' | 'active' | 'pending';
};

type RegistrationTimelineProps = {
    steps: TimelineStep[];
};

export default function RegistrationTimeline({ steps }: RegistrationTimelineProps) {
    return (
        <View style={styles.timeline}>
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <View style={styles.step}>
                        <View style={[
                            styles.circle,
                            step.status === 'completed' && styles.completedCircle,
                            step.status === 'active' && styles.activeCircle,
                            step.status === 'pending' && styles.pendingCircle,
                        ]}>
                            <Ionicons
                                name={step.icon}
                                size={20}
                                color={step.status === 'pending' ? Colors.light.textSecondary : Colors.base.white}
                            />
                        </View>
                        <View style={styles.stepText}>
                            <Text style={[styles.stepTitle, step.status === 'pending' && styles.pendingText]}>{step.title}</Text>
                            <Text style={styles.stepDesc}>{step.description}</Text>
                        </View>
                    </View>
                    {index < steps.length - 1 && (
                        <View style={[
                            styles.line,
                            step.status === 'completed' && styles.completedLine,
                        ]} />
                    )}
                </React.Fragment>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    timeline: {
        width: '100%',
        marginBottom: 40,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    completedCircle: {
        backgroundColor: Colors.brand.primary,
    },
    activeCircle: {
        backgroundColor: Colors.brand.primary,
    },
    pendingCircle: {
        backgroundColor: Colors.grey[300],
    },
    stepText: {
        marginLeft: 15,
        flex: 1,
    },
    stepTitle: {
        fontWeight: 'bold',
        color: Colors.light.textSecondary,
        fontSize: 14,
    },
    pendingText: {
        color: Colors.grey[500],
    },
    stepDesc: {
        color: Colors.grey[500],
        fontSize: 10,
    },
    line: {
        width: 2,
        height: 30,
        backgroundColor: Colors.grey[200],
        marginLeft: 19,
        marginTop: -5,
        marginBottom: -5,
    },
    completedLine: {
        backgroundColor: Colors.brand.primary,
    },
});
