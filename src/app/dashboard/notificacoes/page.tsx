"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
}

const messages: Message[] = [
  { id: 1, sender: "João da Silva", subject: "Troca de Aula", content: "Preciso trocar aula no dia 25/03/25 da primeira a terceira aula do periodo noturno" },
  { id: 2, sender: "Maria Oliveira", subject: "Substituição de Aula", content: "Preciso de uma substituição no dia 25/03/25 da primeira a terceira aula do periodo noturno" },
  { id: 3, sender: "Carlos Vieira", subject: "Substituição de Aula", content: "Preciso de uma substituição no dia 25/03/25 da primeira a terceira aula do periodo noturno" },
];

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  return (
    <div>
      <div className="my-6">
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
      </div>
      <div className="flex gap-4  bg-gray-100 min-h-screen">
        
        
        {/* Lista de Mensagens */}
        <ScrollArea className="w-1/3 border rounded-lg bg-white shadow-md p-2">
          {messages.map((msg) => (
            <Card key={msg.id} className="mb-2 cursor-pointer transition-all hover:bg-gray-50 shadow-sm" onClick={() => setSelectedMessage(msg)}>
              <CardHeader className="p-3 flex flex-col gap-1 border-b">
                <span className="text-sm font-medium text-gray-700">{msg.sender}</span>
                <CardTitle className="text-md text-gray-900 font-semibold">{msg.subject}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 p-3 truncate">{msg.content}</CardContent>
            </Card>
          ))}
        </ScrollArea>

        {/* Detalhes da Mensagem */}
        <Card className="w-2/3 bg-white shadow-md p-6 rounded-lg">
          {selectedMessage ? (
            <>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Assunto: {selectedMessage.subject}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700">
                <p className="text-sm text-gray-500 mb-2"><strong>De:</strong> {selectedMessage.sender}</p>
                <Separator className="my-3" />
                <p className="mt-2 leading-relaxed">{selectedMessage.content}</p>
                <div className="mt-4 flex gap-2">
                  <Button className="bg-green-500 hover:bg-green-600 text-white">Aceitar</Button>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Recusar</Button>
                </div>
              </CardContent>
              <div className="flex justify-between mt-4">
                <Button onClick={() => setSelectedMessage(null)} className="bg-red-500 hover:bg-red-600 text-white">Fechar</Button>
                <Button className="bg-gray-500 hover:bg-gray-600 text-white">Responder</Button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center py-10">Selecione uma mensagem para visualizar.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
