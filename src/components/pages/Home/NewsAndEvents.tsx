// src/components/NewsAndEvents.tsx
import React from 'react';
import styles from './NewsAndEvents.module.css';


const NewsAndEvents: React.FC = () => {
  return (
    <div className={styles.container}>
      <section>
        <h2>Новости и события</h2>
        <ul>
          <li>Новость 1</li>
          <li>Событие 1</li>
        </ul>
      </section>
    </div>
    
  );
};

export default NewsAndEvents;