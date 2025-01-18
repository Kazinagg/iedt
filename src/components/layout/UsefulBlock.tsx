// components/UsefulBlock.tsx
import React from 'react';
import styles from './UsefulBlock.module.css';

interface UsefulCard {
  title: string;
  backgroundImage: string;
  content: React.ReactNode;
}

interface UsefulBlockProps {
  cards: UsefulCard[];
}

const UsefulBlock: React.FC<UsefulBlockProps> = ({ cards }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Полезное</h2>
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <article
            key={index}
            className={styles.card}
            style={{ backgroundImage: `url(${card.backgroundImage})` }}
          >
            <div className={styles.cardTop}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
            </div>
            <div className={styles.cardContent}>
              {card.content}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UsefulBlock;