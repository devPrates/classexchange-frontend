"use client"

import { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

const courses = ["TADS - 3222", "TADS - 3223", "TI - 1022", "TI - 2024"];
const disciplines = ["Matemática", "História", "Biologia", "Física", "Química"];
const shifts = ["Matutino", "Vespertino", "Noturno"];
const lessons = ["1ª Aula", "2ª Aula", "3ª Aula", "4ª Aula", "5ª Aula"];

const mockAvailableTeachersList = [
  [
    { id: 1, name: "João Silva" },
    { id: 2, name: "Maria Oliveira" },
    { id: 3, name: "Carlos Santos" },
  ],
  [
    { id: 4, name: "Ana Souza" },
    { id: 5, name: "Fernando Lima" },
  ],
  [],
];

export default function ScheduleSelector() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [availableTeachers, setAvailableTeachers] = useState<{ id: number; name: string }[]>([]);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * mockAvailableTeachersList.length);
      setAvailableTeachers(mockAvailableTeachersList[randomIndex]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="pt-10">
        <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Substituição</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold my-3">Solicitar Substituição de Aula</h1>
      <div className="flex flex-col md:flex-row h-screen p-4 gap-6">
        <div className="flex flex-col w-full md:w-1/2 space-y-4 p-4 border rounded-lg shadow-md">
          <h1 className="font-bold text-xl">Formulario</h1>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Select onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um curso" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedDiscipline}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma disciplina" />
            </SelectTrigger>
            <SelectContent>
              {disciplines.map((discipline) => (
                <SelectItem key={discipline} value={discipline}>
                  {discipline}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedShift}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um turno" />
            </SelectTrigger>
            <SelectContent>
              {shifts.map((shift) => (
                <SelectItem key={shift} value={shift}>
                  {shift}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-4">
            {lessons.map((lesson) => (
              <label key={lesson} className="flex items-center space-x-2">
                <Checkbox
                  onCheckedChange={(checked) => {
                    setSelectedLessons((prev) =>
                      checked ? [...prev, lesson] : prev.filter((l) => l !== lesson)
                    );
                  }}
                />
                <span>{lesson}</span>
              </label>
            ))}
          </div>
          <Button onClick={handleSearch} disabled={!selectedCourse || !selectedDiscipline || !selectedShift || selectedLessons.length === 0 || !date}>
            Buscar Disponíveis
          </Button>
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <Suspense fallback={<Skeleton className="w-full h-24 rounded-lg" />}>
            {loading ? (
              <Skeleton className="w-full h-24 rounded-lg" />
            ) : availableTeachers.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-center">Nenhum professor encontrado</CardContent>
              </Card>
            ) : (
              availableTeachers.map((teacher) => (
                <Card key={teacher.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <span>{teacher.name}</span>
                    <Button variant="outline">Solicitar Substituição</Button>
                  </CardContent>
                </Card>
              ))
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
