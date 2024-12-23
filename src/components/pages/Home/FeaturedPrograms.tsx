// src/components/FeaturedPrograms.tsx
import React from 'react';
import styles from './FeaturedPrograms.module.css';

interface Program {
  title: string;
  description: string;
  link: string;
}

const programs: Program[] = [
    { title: "Программа 1", description: "Описание программы 1", link: "/program1"},
    { title: "Программа 2", description: "Описание программы 2", link: "/program2"},
    { title: "Программа 3", description: "Описание программы 3", link: "/program3"},
];

const FeaturedPrograms: React.FC = () => {
  return (
    <section className={styles.featuredPrograms}>
      <h2>Рекомендуемые программы</h2>
      <div className={styles.programList}>
          {programs.map(program => (
              <div key={program.title} className={styles.program}>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                  <a href={program.link}>Подробнее</a>
              </div>

          ))}

      </div>

    </section>
  );
};

export default FeaturedPrograms;