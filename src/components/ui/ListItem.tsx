// src/components/ui/ListItem.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
} from '@/constants/theme';

/**
 * Props del componente ListItem
 */
interface ListItemProps {
  // Contenido
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;

  // Elemento a la derecha (chevron, switch, badge, etc.)
  rightElement?: React.ReactNode;

  // Interacción
  onPress?: () => void;
  disabled?: boolean;

  // Posición en la lista (para bordes redondeados)
  isFirst?: boolean;
  isLast?: boolean;

  // Estilos personalizados
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;

  // Variantes
  variant?: 'default' | 'danger' | 'success';
}

/**
 * ListItem - Componente reutilizable para items de lista
 *
 * Uso:
 * ```tsx
 * <ListItem
 *   icon="person-outline"
 *   title="Mi Perfil"
 *   subtitle="Ver y editar información"
 *   onPress={() => router.push('/profile')}
 *   rightElement={<Ionicons name="chevron-forward" size={20} color="#999" />}
 * />
 * ```
 */
export default function ListItem({
  icon,
  title,
  subtitle,
  rightElement,
  onPress,
  disabled = false,
  isFirst = false,
  isLast = false,
  style,
  titleStyle,
  subtitleStyle,
  variant = 'default',
}: ListItemProps) {
  // Determinar estilos dinámicos
  const itemStyle = [
    styles.item,
    isFirst && styles.firstItem,
    isLast && styles.lastItem,
    disabled && styles.disabled,
    variant === 'danger' && styles.dangerItem,
    variant === 'success' && styles.successItem,
    style,
  ];

  const titleStyles = [
    styles.title,
    variant === 'danger' && styles.dangerText,
    variant === 'success' && styles.successText,
    titleStyle,
  ];

  const iconColor = getIconColor(variant, disabled);

  // Renderizar como TouchableOpacity si tiene onPress
  if (onPress && !disabled) {
    return (
      <TouchableOpacity
        style={itemStyle}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <ItemContent
          icon={icon}
          iconColor={iconColor}
          title={title}
          titleStyles={titleStyles}
          subtitle={subtitle}
          subtitleStyle={subtitleStyle}
          rightElement={rightElement}
        />
      </TouchableOpacity>
    );
  }

  // Renderizar como View si no tiene onPress o está disabled
  return (
    <View style={itemStyle}>
      <ItemContent
        icon={icon}
        iconColor={iconColor}
        title={title}
        titleStyles={titleStyles}
        subtitle={subtitle}
        subtitleStyle={subtitleStyle}
        rightElement={rightElement}
      />
    </View>
  );
}

/**
 * Componente interno para el contenido del ListItem
 */
interface ItemContentProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  titleStyles: any[];
  subtitle?: string;
  subtitleStyle?: TextStyle;
  rightElement?: React.ReactNode;
}

function ItemContent({
  icon,
  iconColor,
  title,
  titleStyles,
  subtitle,
  subtitleStyle,
  rightElement,
}: ItemContentProps) {
  return (
    <>
      {/* Icono izquierdo */}
      {icon && (
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
      )}

      {/* Contenido central */}
      <View style={styles.content}>
        <Text style={titleStyles} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]} numberOfLines={2}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Elemento derecho (chevron, switch, badge, etc.) */}
      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </>
  );
}

/**
 * Obtener color del icono según variante y estado
 */
function getIconColor(variant: ListItemProps['variant'], disabled: boolean): string {
  if (disabled) return Colors.grey[400];

  switch (variant) {
    case 'danger':
      return Colors.semantic.error;
    case 'success':
      return Colors.semantic.success;
    default:
      return Colors.brand.primary;
  }
}

/**
 * Estilos del componente
 */
const styles = StyleSheet.create({
  // Contenedor principal
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.base.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey[200],
  },

  // Posición en lista
  firstItem: {
    borderTopLeftRadius: BorderRadius.md,
    borderTopRightRadius: BorderRadius.md,
  },
  lastItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: BorderRadius.md,
    borderBottomRightRadius: BorderRadius.md,
  },

  // Estados
  disabled: {
    opacity: 0.5,
  },

  // Variantes
  dangerItem: {
    backgroundColor: Colors.semantic.error + '05',
  },
  successItem: {
    backgroundColor: Colors.semantic.success + '05',
  },

  // Icono
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.brand.primary + '10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },

  // Contenido
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.medium,
    color: Colors.light.text,
    lineHeight: Typography.size.base * 1.4,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    color: Colors.light.textSecondary,
    marginTop: 2,
    lineHeight: Typography.size.sm * 1.4,
  },

  // Variantes de texto
  dangerText: {
    color: Colors.semantic.error,
  },
  successText: {
    color: Colors.semantic.success,
  },

  // Elemento derecho
  rightElement: {
    marginLeft: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * Exports adicionales para composición
 */

/**
 * Chevron derecho común
 */
export function ChevronRight({ color = Colors.grey[400] }: { color?: string }) {
  return <Ionicons name="chevron-forward" size={20} color={color} />;
}

/**
 * Badge numérico
 */
export function Badge({ count, color = Colors.semantic.error }: { count: number; color?: string }) {
  if (count === 0) return null;

  return (
    <View style={[badgeStyles.container, { backgroundColor: color }]}>
      <Text style={badgeStyles.text}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
}

const badgeStyles = StyleSheet.create({
  container: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.semantic.error,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.base.white,
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
  },
});

/**
 * Status indicator
 */
export function StatusDot({ color }: { color: string }) {
  return (
    <View style={[statusStyles.dot, { backgroundColor: color }]} />
  );
}

const statusStyles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
