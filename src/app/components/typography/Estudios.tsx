"use client";
import { DollarSign, Brain, Code, Database, ChartBar } from "lucide-react";
import React from 'react';

// Definición del tipo de encuesta
interface Survey {
  id: string;
  titulo: string;
  recompensa: number;
  icono: React.ReactElement;
  categoria: string;
  tiempoEstimado: string;
}

// Datos de ejemplo de las encuestas
const encuestas: Survey[] = [
  {
    id: "1",
    titulo: "Evaluación de Modelos de IA",
    recompensa: 25,
    icono: <Brain className="text-blue-500" size={20} />,
    categoria: "Inteligencia Artificial",
    tiempoEstimado: "15 min"
  },
  {
    id: "2",
    titulo: "Prácticas de Desarrollo de Software",
    recompensa: 30,
    icono: <Code className="text-green-500" size={20} />,
    categoria: "Programación",
    tiempoEstimado: "20 min"
  },
  {
    id: "3",
    titulo: "Uso de Herramientas de Ciencia de Datos",
    recompensa: 35,
    icono: <Database className="text-purple-500" size={20} />,
    categoria: "Ciencia de Datos",
    tiempoEstimado: "25 min"
  },
  {
    id: "4",
    titulo: "Aplicaciones de Machine Learning",
    recompensa: 40,
    icono: <ChartBar className="text-orange-500" size={20} />,
    categoria: "Machine Learning",
    tiempoEstimado: "30 min"
  }
];

export default function Estudios() {
  return (
    <main className="h-screen w-full bg-slate-100 flex items-stretch font-sans">
      <div className="flex-1 flex flex-col w-full">
        <section className="w-full bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-start gap-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Encuestas Disponibles</h2>
            <div className="text-sm text-gray-500">
              {encuestas.length} encuestas disponibles
            </div>
          </div>

          <div className="grid gap-4">
            {encuestas.map((encuesta) => (
              <div
                key={encuesta.id}
                className="bg-white border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {encuesta.icono}
                    <div>
                      <h3 className="font-semibold text-gray-800">{encuesta.titulo}</h3>
                      <p className="text-sm text-gray-500">{encuesta.categoria}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-green-600">
                      <DollarSign size={18} />
                      <span className="font-bold">{encuesta.recompensa}</span>
                    </div>
                    <span className="text-sm text-gray-400">| {encuesta.tiempoEstimado}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-blue-700 text-sm">
              💡 ¡Completa encuestas para ganar recompensas! ¡Cuantas más encuestas completes, mayor será tu potencial de ganancias!
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}