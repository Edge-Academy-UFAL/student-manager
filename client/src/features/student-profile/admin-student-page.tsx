'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Avatar,
  Button,
  IconButton,
  Link,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Edit,
  Download,
  OpenInNew,
  Warning,
  Description,
} from '@mui/icons-material';

const studentData = {
  name: 'Estudante Legal',
  birthDate: '19/11/2003',
  cpf: '123.456.789-00',
  rg: '123456-7',
  issuer: 'SSP-AL',
  gender: 'Feminino',
  pronouns: 'Ela/dela',
  race: 'Pardo',
  maritalStatus: 'Solteira',
  hasDisability: true,
  institutionalEmail: 'user@ufal.edge.br',
  personalEmail: 'user@example.com',
  phone: '(82) 98765-4321',
  whatsapp: '(82) 98765-4321',
  country: 'Brasil',
  zipCode: '57123-456',
  state: 'Alagoas',
  city: 'Maceió',
  neighborhood: 'Antares',
  street: 'R. dos Bobos',
  number: '0',
  complement: '0',
  linkedin: 'https://www.linkedin.com',
  lattes: 'http://lattes.cnpq.br',
  enrollment: '12345678',
  course: 'Ciência da Computação',
  semester: '2019.1',
  currentPeriod: '8',
  academyClass: 'Turma 2',
  joinDate: '20/06/2023',
  level: 'Trainee II',
  photo: '',
  documents: [
    { name: 'RG', file: 'cnh.png', size: '89 KB' },
    { name: 'CPF', file: 'cpf.jpg', size: '120 KB' },
    { name: 'Comprovante de residência', file: 'brk.pdf', size: '75 KB' },
  ],
};

export default function AdminStudentPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const FieldDisplay = ({ label, value }: { label: string; value: string }) => (
    <Box>
      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ 
          fontSize: '0.7rem',
          fontFamily: 'Work Sans, sans-serif'
        }}
      >
        {label}
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 0.5, 
          fontWeight: 500,
          fontFamily: 'Work Sans, sans-serif'
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              gutterBottom
              sx={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              {studentData.name}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              Detalhes do aluno
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              sx={{ 
                textTransform: 'none',
                borderColor: '#00acc1',
                color: '#00acc1',
                '&:hover': {
                  borderColor: '#00838f',
                  bgcolor: '#e0f7fa'
                },
                borderRadius: '16px',
                fontFamily: 'Work Sans, sans-serif'
              }}
            >
              SOLICITAR ATUALIZAÇÃO
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Edit />} 
              sx={{ 
                textTransform: 'none', 
                bgcolor: '#00acc1',
                '&:hover': {
                  bgcolor: '#00838f'
                },
                borderRadius: '16px',
                fontFamily: 'Work Sans, sans-serif'
              }}
            >
              EDITAR
            </Button>
          </Box>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                fontFamily: 'Work Sans, sans-serif'
              }
            }}
          >
            <Tab label="DADOS CADASTRAIS" />
            <Tab label="PROJETOS" />
            <Tab label="AVALIAÇÕES" />
            <Tab label="NOTAS" />
            <Tab label="HISTÓRICO" />
          </Tabs>
        </Paper>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Dados Pessoais */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: '8px' }}>
              <Typography 
                variant="h6" 
                className="text-action-500" 
                gutterBottom
                sx={{ fontWeight: 400, fontFamily: 'Work Sans, sans-serif' }}
              >
                Dados pessoais
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FieldDisplay label="Nome completo" value={studentData.name} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FieldDisplay label="Data de nascimento" value={studentData.birthDate} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="CPF" value={studentData.cpf} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="RG" value={studentData.rg} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="Órgão emissor" value={studentData.issuer} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="Gênero" value={studentData.gender} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="Pronomes" value={studentData.pronouns} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FormControlLabel
                    control={<Checkbox checked={studentData.hasDisability} disabled size="small" />}
                    label={
                      <Typography 
                        variant="body2"
                        sx={{ fontFamily: 'Work Sans, sans-serif' }}
                      >
                        Pessoa com deficiência?
                      </Typography>
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FieldDisplay label="Raça/etnia" value={studentData.race} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FieldDisplay label="Estado civil" value={studentData.maritalStatus} />
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3, mb: 3, borderRadius: '8px' }}>
              <Typography 
                variant="h6" 
                className="text-action-500" 
                gutterBottom
                sx={{ fontWeight: 400, fontFamily: 'Work Sans, sans-serif' }}
              >
                Dados de contato
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid size={12}>
                  <FieldDisplay label="E-mail institucional" value={studentData.institutionalEmail} />
                </Grid>
                <Grid size={12}>
                  <FieldDisplay label="E-mail pessoal" value={studentData.personalEmail} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FieldDisplay label="Telefone" value={studentData.phone} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FieldDisplay label="WhatsApp" value={studentData.whatsapp} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FieldDisplay label="País" value={studentData.country} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FieldDisplay label="Código postal" value={studentData.zipCode} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FieldDisplay label="Estado" value={studentData.state} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FieldDisplay label="Cidade" value={studentData.city} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FieldDisplay label="Bairro" value={studentData.neighborhood} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FieldDisplay label="Logradouro" value={studentData.street} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FieldDisplay label="Números" value={studentData.number} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FieldDisplay label="Complemento" value={studentData.complement} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: '0.7rem',
                      fontFamily: 'Work Sans, sans-serif'
                    }}
                  >
                    LinkedIn
                  </Typography>
                  <Link 
                    href={studentData.linkedin} 
                    target="_blank" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5, 
                      mt: 0.5,
                      fontFamily: 'Work Sans, sans-serif'
                    }}
                  >
                    <Typography 
                      variant="body2"
                      sx={{ fontFamily: 'Work Sans, sans-serif' }}
                    >
                      {studentData.linkedin}
                    </Typography>
                    <OpenInNew sx={{ fontSize: 14 }} />
                  </Link>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: '0.7rem',
                      fontFamily: 'Work Sans, sans-serif'
                    }}
                  >
                    Lattes
                  </Typography>
                  <Link 
                    href={studentData.lattes} 
                    target="_blank" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5, 
                      mt: 0.5,
                      fontFamily: 'Work Sans, sans-serif'
                    }}
                  >
                    <Typography 
                      variant="body2"
                      sx={{ fontFamily: 'Work Sans, sans-serif' }}
                    >
                      {studentData.lattes}
                    </Typography>
                    <OpenInNew sx={{ fontSize: 14 }} />
                  </Link>
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3, mb: 3, borderRadius: '8px' }}>
              <Typography 
                variant="h6" 
                className="text-action-500" 
                gutterBottom
                sx={{ fontWeight: 400, fontFamily: 'Work Sans, sans-serif' }}
              >
                Dados acadêmicos
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="Matrícula" value={studentData.enrollment} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="Curso" value={studentData.course} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="Semestre de ingresso" value={studentData.semester} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="Período Atual" value={studentData.currentPeriod} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="Turma do Academy" value={studentData.academyClass} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FieldDisplay label="Ingresso no Academy" value={studentData.joinDate} />
                </Grid>
                <Grid size={12}>
                  <FieldDisplay label="Nível" value={studentData.level} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, mb: 3, borderRadius: '8px' }}>
              <Typography 
                variant="h6" 
                className="text-action-500" 
                gutterBottom
                sx={{ fontWeight: 400, fontFamily: 'Work Sans, sans-serif' }}
              >
                Foto
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  children={`${studentData.name.split(' ')[0][0]}${studentData.name.split(' ')[1][0]}`}
                  sx={{ 
                    width: 150, 
                    height: 150, 
                    mx: 'auto', 
                    mb: 2,
                    fontFamily: 'Work Sans, sans-serif'
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 0.5 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontFamily: 'Work Sans, sans-serif' }}
                  >
                    Foto: foto.png
                  </Typography>
                  <IconButton size="small" color="primary">
                    <Download fontSize="small" />
                  </IconButton>
                </Box>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontFamily: 'Work Sans, sans-serif' }}
                >
                  89 KB
                </Typography>
              </Box>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: '8px' }}>
              <Typography 
                variant="h6" 
                className="text-action-500" 
                gutterBottom
                sx={{ fontWeight: 400, fontFamily: 'Work Sans, sans-serif' }}
              >
                Documentos
              </Typography>
              <Box sx={{ mt: 2 }}>
                {studentData.documents.map((doc, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1.5,
                      bgcolor: '#f5f7fa',
                      border: 1,
                      borderRadius: '5px',
                      borderColor: '#00acc1',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                      <Description sx={{ color: '#00acc1', mt: 0.3 }} />
                      <Box>
                        <Typography 
                          variant="body2" 
                          fontWeight="600"
                          sx={{ fontFamily: 'Work Sans, sans-serif' }}
                        >
                          {doc.name}: <Box component="span" fontWeight="400">{doc.file}</Box>
                        </Typography>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ fontFamily: 'Work Sans, sans-serif' }}
                        >
                          {doc.size}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton size="small" color="primary">
                      <Download fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Alert
          severity="error"
          icon={<Warning />}
          sx={{
            mb: 3,
            p: 3,
            '& .MuiAlert-message': {
              width: '100%',
              fontFamily: 'Work Sans, sans-serif',
            },
            '& .MuiAlert-action': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              fontFamily: 'Work Sans, sans-serif',
              mb: 2,
              fontSize: '1rem'
            }}
          >
            Zona de perigo
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              gap: 2,
              flexWrap: 'wrap'
            }}
          >
            <Box sx={{ flex: 1, minWidth: 250 }}>
              <Typography
                variant="subtitle1"
                fontWeight="700"
                sx={{ fontFamily: 'Work Sans, sans-serif' }}
              >
                DESLIGAR ALUNO
              </Typography>

              <Typography
                variant="caption"
                display="block"
                sx={{
                  fontFamily: 'Work Sans, sans-serif',
                  mt: 0.5,
                  lineHeight: 1.4
                }}
              >
                O aluno ficará inativo e não será possível modificar ou referenciá-lo.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="error"
                variant="contained"
                size="small"
                sx={{
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  fontFamily: 'Work Sans, sans-serif',
                  borderRadius: '16px',
                  px: 3,
                  py: 1.2
                }}
              >
                DESLIGAR ALUNO
              </Button>
            </Box>
          </Box>
        </Alert>

      </Container>
    </Box>
  );
}