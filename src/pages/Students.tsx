import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Students.module.css';

const faculties = [
    { name: "Факультет математики и информатики", link: "/mathematics" },
    { name: "Физико-технический факультет", link: "/physics" },
    { name: "Факультет \"Инженерный спецназ\"", link: "/engineering" },
];

const postgraduatePrograms = [
    { direction: "1.1.2 Дифференциальные уравнения и математическая физика", exam: "Специальность (устно)" },
    { direction: "1.2.2 Математическое моделирование, численные методы и комплексы программ", exam: "Специальность (устно)" },
    // ... другие программы
];

export default function Students() {
    return (
        <div className={styles.container}>
            <div className={styles.intro}> {/* отдельный блок для вводной информации */}
                <h1>Абитуриенту института инженерных и цифровых технологий</h1>
                <p>Уважаемые друзья, абитуриенты, родители!</p>
                <p>Институт инженерных и цифровых технологий представляет собой единую систему подготовки профессионалов и ученых по следующим направлениям:</p>
                <ul className={styles.facultyList}>
                    {faculties.map(faculty => (
                        <li key={faculty.link} className={styles.facultyItem}>
                            <Link to={faculty.link}>{faculty.name}</Link>
                        </li>
                    ))}
                </ul>
                <p>
                    В настоящее время в Институте реализуется концепция многоуровневой подготовки специалистов с высшим образованием, которая предусматривает подготовку и выпуск бакалавров (срок обучения 4 года), магистров (срок обучения 2 года), аспирантов и докторантов. Эти виды квалификации приняты по международной классификации и приветствуются работодателями во всем мире.
                </p>
            </div>


            <div className={styles.postgraduate}> {/* отдельный блок для аспирантуры */}
                <h2>Аспирантура</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Направление подготовки</th>
                            <th>Вступительные испытания</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postgraduatePrograms.map((program, index) => (
                            <tr key={index}>
                                <td>{program.direction}</td>
                                <td>{program.exam}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}