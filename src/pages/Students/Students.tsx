// src/pages/Students.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import HeroSection from "../../components/pages/Home/HeroSection";
import NewsAndEvents from "../../components/pages/Home/NewsAndEvents";
import UsefulBlock from '../../components/layout/UsefulBlock';
import UniversityInfo from '../../components/pages/Home/UniversityInfo';


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

const Students: React.FC = () => {

  return (
    <>
      <HeroSection />
      <NewsAndEvents />
      <UsefulBlock />
      <Container maxWidth="md">
        <Box mt={4} mb={4}>
            <Typography variant="h4" component="h1" gutterBottom>
                Абитуриенту института инженерных и цифровых технологий
            </Typography>
            <Typography variant="body1" paragraph>
                Уважаемые друзья, абитуриенты, родители!
            </Typography>
            <Typography variant="body1" paragraph>
                Институт инженерных и цифровых технологий представляет собой единую систему подготовки профессионалов и ученых по следующим направлениям:
            </Typography>
            <List>
                {faculties.map((faculty) => (
                <ListItem key={faculty.link} component={Link} to={faculty.link} > {/* Удалили button */}
                    <ListItemText primary={faculty.name} />
                </ListItem>
                ))}
            </List>
            <Typography variant="body1" paragraph>
                В настоящее время в Институте реализуется концепция многоуровневой подготовки специалистов с высшим образованием, которая предусматривает подготовку и выпуск бакалавров (срок обучения 4 года), магистров (срок обучения 2 года), аспирантов и докторантов. Эти виды квалификации приняты по международной классификации и приветствуются работодателями во всем мире.
            </Typography>

            </Box>
            <Box mt={4} mb={4}>
              <Typography variant="h5" component="h2" gutterBottom>
                Аспирантура
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Направление подготовки</TableCell>
                      <TableCell>Вступительные испытания</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {postgraduatePrograms.map((program, index) => (
                      <TableRow key={index}>
                        <TableCell>{program.direction}</TableCell>
                        <TableCell>{program.exam}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

      </Container>
    </>
  );
};

export default Students;