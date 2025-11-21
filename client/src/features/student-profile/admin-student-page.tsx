import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { Edit, Download, ExternalLink, AlertTriangle, FileText } from "lucide-react";
import { StudentResponseDTO } from "@/api";
import Link from "next/link";
import { RequestUpdateDialog } from "./components/request-update-dialog";

const studentData = {
  name: "Estudante Legal",
  birthDate: "19/11/2003",
  cpf: "123.456.789-00",
  rg: "123456-7",
  issuer: "SSP-AL",
  gender: "Feminino",
  pronouns: "Ela/dela",
  race: "Pardo",
  maritalStatus: "Solteira",
  hasDisability: true,
  institutionalEmail: "user@ufal.edge.br",
  personalEmail: "user@example.com",
  phone: "(82) 98765-4321",
  whatsapp: "(82) 98765-4321",
  country: "Brasil",
  zipCode: "57123-456",
  state: "Alagoas",
  city: "Maceió",
  neighborhood: "Antares",
  street: "R. dos Bobos",
  number: "0",
  complement: "0",
  linkedin: "https://www.linkedin.com/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  lattes: "http://lattes.cnpq.br",
  enrollment: "12345678",
  course: "Ciência da Computação",
  semester: "2019.1",
  currentPeriod: "8",
  academyClass: "Turma 2",
  joinDate: "20/06/2023",
  level: "Trainee II",
  photo: "",
  documents: [
    { name: "RG", file: "cnh.png", size: "89 KB" },
    { name: "CPF", file: "cpf.jpg", size: "120 KB" },
    { name: "Comprovante de residência", file: "brk.pdf", size: "75 KB" },
  ],
};

export default function AdminStudentPage({ studentInfo }: { studentInfo: StudentResponseDTO }) {
  const FieldDisplay = ({ label, value }: any) => (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground font-sans">{label}</p>
      <p className="text-sm font-medium font-sans">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1 font-sans">{studentInfo.name}</h1>
          <p className="text-sm text-muted-foreground font-sans">Detalhes do aluno</p>
        </div>
        <div className="flex gap-2">
          <RequestUpdateDialog />
          <Button 
            className="rounded-md bg-cyan-600 hover:bg-cyan-700 font-sans my-auto"
          >
            <Edit className="size-4" />
            EDITAR
          </Button>
        </div>
      </div>


      <Tabs defaultValue="cadastrais">
        <TabsList className="w-full flex gap-8 justify-start mb-3">
          <TabsTrigger
            value="cadastrais"
          >
            DADOS CADASTRAIS
          </TabsTrigger>

          <TabsTrigger
            value="projetos"
          >
            PROJETOS
          </TabsTrigger>

          <TabsTrigger
            value="avaliacoes"
          >
            AVALIAÇÕES
          </TabsTrigger>

          <TabsTrigger
            value="notas"
          >
            NOTAS
          </TabsTrigger>

          <TabsTrigger
            value="historico"
          >
            HISTÓRICO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cadastrais">
          <div className="grid  grid-cols-1 lg:grid-cols-3 3 gap-6">
            <Card className="col-span-2 rounded-md">
              <CardHeader>
                <CardTitle>
                  <h2 className="text-lg text-action-500 font-normal font-sans">Dados pessoais</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FieldDisplay label="Nome completo" value={studentData.name} />
                  <FieldDisplay label="Data de nascimento" value={studentData.birthDate} />
                  <FieldDisplay label="CPF" value={studentData.cpf} />
                  <FieldDisplay label="RG" value={studentData.rg} />
                  <FieldDisplay label="Órgão emissor" value={studentData.issuer} />
                  <FieldDisplay label="Gênero" value={studentData.gender} />
                  <FieldDisplay label="Pronomes" value={studentData.pronouns} />
                  <FieldDisplay label="Pessoa com deficiência" value={studentData.hasDisability ? "Sim" : "Não"} />
                  <FieldDisplay label="Raça/etnia" value={studentData.race} />
                  <FieldDisplay label="Estado civil" value={studentData.maritalStatus} />
                </div>
              </CardContent>
            </Card>

              <Card className="rounded-md">
              <CardHeader>
                <CardTitle>
                  <h2 className="text-lg text-action-500 font-normal font-sans">Foto</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Avatar className="w-36 h-36 mx-auto mb-4">
                  <AvatarFallback className="text-2xl font-sans">
                    {studentData.name.split(" ")[0][0]}{studentData.name.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>
                <div
                    key={"pic"}
                    className="p-3 bg-slate-50 border rounded-sm flex justify-between items-center"
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-cyan-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold font-sans">
                          Foto: <span className="font-normal">Foto.png</span>
                        </p>
                        <p className="text-xs text-muted-foreground font-sans">89 KB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
              </CardContent>
            </Card>

            <Card className="col-span-2 rounded-md">
              <CardHeader>
                <CardTitle>
                  <h2 className="text-lg text-action-500 font-normal font-sans">Dados de contato</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <FieldDisplay label="E-mail institucional" value={studentData.institutionalEmail} />
                  </div>
                  <div className="md:col-span-2">
                    <FieldDisplay label="E-mail pessoal" value={studentData.personalEmail} />
                  </div>
                  <FieldDisplay label="Telefone" value={studentData.phone} />
                  <FieldDisplay label="WhatsApp" value={studentData.whatsapp} />
                  <FieldDisplay label="País" value={studentData.country} />
                  <FieldDisplay label="Código postal" value={studentData.zipCode} />
                  <FieldDisplay label="Estado" value={studentData.state} />
                  <FieldDisplay label="Cidade" value={studentData.city} />
                  <FieldDisplay label="Bairro" value={studentData.neighborhood} />
                  <FieldDisplay label="Logradouro" value={studentData.street} />
                  <FieldDisplay label="Números" value={studentData.number} />
                  <FieldDisplay label="Complemento" value={studentData.complement} />
                  <div className="space-y-1 col-start-1 col-end-3">
                    <p className="text-xs text-muted-foreground font-sans">LinkedIn</p>
                    <div className="flex items-center gap-1">
                      <Link 
                        href={studentData.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-600 hover:text-cyan-700 font-sans overflow-hidden text-ellipsis"
                      >
                        {studentData.linkedin}
                      </Link>
                      <ExternalLink className="text-cyan-600 size-3 shrink-0" />
                    </div>
                  </div>
                  <div className="space-y-1 col-start-3 col-end-5">
                    <p className="text-xs text-muted-foreground font-sans">Lattes</p>
                    <div className="flex items-center gap-1">
                      <Link 
                        href={studentData.lattes} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-600 hover:text-cyan-700 font-sans overflow-hidden text-ellipsis"
                      >
                        {studentData.lattes}
                      </Link>
                      <ExternalLink className="text-cyan-600 size-3 shrink-0" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

              <Card className="rounded-md">
              <CardHeader>
                <CardTitle>
                  <h2 className="text-lg text-action-500 font-normal font-sans">Documentos</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="p-3 bg-slate-50 border rounded-sm flex justify-between items-center"
                    >
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-cyan-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold font-sans">
                            {doc.name}: <span className="font-normal">{doc.file}</span>
                          </p>
                          <p className="text-xs text-muted-foreground font-sans">{doc.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2 rounded-md">
              <CardHeader>
                <CardTitle>
                  <h2 className="text-lg text-action-500 font-normal font-sans">Dados acadêmicos</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <FieldDisplay label="Matrícula" value={studentData.enrollment} />
                  <FieldDisplay label="Curso" value={studentData.course} />
                  <FieldDisplay label="Semestre de ingresso" value={studentData.semester} />
                  <FieldDisplay label="Período Atual" value={studentData.currentPeriod} />
                  <FieldDisplay label="Turma do Academy" value={studentData.academyClass} />
                  <FieldDisplay label="Ingresso no Academy" value={studentData.joinDate} />
                  <FieldDisplay label="Nível" value={studentData.level} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>


      {/* <Alert variant="destructive" className="mt-6">
        <AlertTriangle className="h-5 w-5" />
        <div className="flex-1">
          <AlertTitle className="text-base font-bold mb-3 font-sans">
            Zona de perigo
          </AlertTitle>
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[250px]">
              <p className="font-bold text-sm mb-1 font-sans">DESLIGAR ALUNO</p>
              <AlertDescription className="text-xs font-sans">
                O aluno ficará inativo e não será possível modificar ou referenciá-lo.
              </AlertDescription>
            </div>
            <Button 
              variant="destructive" 
              className="rounded-md px-4 py-3 font-sans"
            >
              DESLIGAR ALUNO
            </Button>
          </div>
        </div>
      </Alert> */}
    </div>
  );
}