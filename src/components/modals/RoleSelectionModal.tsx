import React from 'react';
import styles from './RoleSelectionModal.module.css'

interface RoleSelectionModalProps {
    onSelect: (role: string) => void;
  }

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ onSelect }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Выберите вашу роль:</h2>
        <button onClick={() => onSelect('/employees')}>Сотрудник</button>
        <button onClick={() => onSelect('/students')}>Студент</button>
        <button onClick={() => onSelect('/admission')}>Поступающий</button>
        {/* Добавьте другие роли */}
      </div>
    </div>
  );
};

export default RoleSelectionModal;