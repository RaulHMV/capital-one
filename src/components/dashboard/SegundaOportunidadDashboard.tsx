"use client";
import React, { useState, useEffect } from "react";
import {
  HiDocumentText,
  HiMicrophone,
  HiCheckCircle,
  HiX,
} from "react-icons/hi";
import { useRouter } from "next/navigation";

interface Survey {
  id: string;
  title: string;
  questions: {
    question: string;
    type: "text" | "radio" | "scale";
    options?: string[];
  }[];
}

const surveys: Record<string, Survey> = {
  "Plan de Pagos": {
    id: "universidad-monterrey",
    title: "Encuesta - Universidad Tecnológica de Monterrey",
    questions: [
      {
        question: "¿Cuántas horas al día utilizas dispositivos digitales?",
        type: "radio",
        options: ["Menos de 2 horas", "2-4 horas", "4-6 horas", "Más de 6 horas"],
      },
      {
        question:
          "¿Cómo calificarías tu bienestar emocional actualmente? (1=Muy bajo, 5=Excelente)",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        question: "¿Qué estrategias de estudio utilizas principalmente?",
        type: "text",
      },
    ],
  },
  "Realizar Pago": {
    id: "universidad-torreon",
    title: "Estudio de Reconocimiento de Voz",
    questions: [
      {
        question: "¿Con qué frecuencia utilizas asistentes de voz?",
        type: "radio",
        options: ["Nunca", "Ocasionalmente", "Frecuentemente", "Diariamente"],
      },
      {
        question:
          "¿Qué tan cómodo te sientes usando comandos de voz? (1=Nada cómodo, 5=Muy cómodo)",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        question: "Describe tu experiencia con tecnología de reconocimiento de voz",
        type: "text",
      },
    ],
  },
  "Contactar Asesor": {
    id: "capital-one",
    title: "Encuesta de Producto - Capital One",
    questions: [
      {
        question: "¿Qué características valoras más en productos financieros?",
        type: "radio",
        options: ["Seguridad", "Facilidad de uso", "Recompensas", "Atención al cliente"],
      },
      {
        question:
          "¿Qué tan satisfecho estás con tu experiencia bancaria actual? (1=Muy insatisfecho, 5=Muy satisfecho)",
        type: "scale",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        question: "Sugerencias para mejorar nuestros servicios",
        type: "text",
      },
    ],
  },
};

interface SegundaOportunidadDashboardProps {
  userName?: string;
  currentBalance?: string | number;
  customerId: string;
  onBalanceUpdate?: () => void;
}

interface OptionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  price?: string | number;
  isCompleted?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  price,
  isCompleted,
}) => {
  if (isCompleted) return null;

  return (
    <button
      onClick={onClick}
      className="relative w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-left border-2 border-transparent hover:border-blue-500 group"
    >
      {price !== undefined && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-bold shadow-md">
            {typeof price === "number" ? `$${price}` : price}
          </span>
        </div>
      )}
      <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-600 transition-colors">
          <Icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
        </div>
        <div className="flex-1 pr-16">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </button>
  );
};

// === Modal de encuesta ===
const SurveyModal: React.FC<{
  survey: Survey;
  onClose: () => void;
  onSubmit: () => void;
  price: number | string;
}> = ({ survey, onClose, onSubmit, price }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const allAnswered = survey.questions.every((_, idx) => answers[idx]);
    if (!allAnswered) {
      alert("Por favor responde todas las preguntas");
      return;
    }

    setIsSubmitting(true);
    setShowSuccess(true);

    setTimeout(() => {
      onSubmit();
      setIsSubmitting(false);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <HiCheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Tarea realizada exitosamente!
          </h3>
          <p className="text-gray-600 mb-4">
            Se han acreditado {typeof price === "number" ? `$${price}` : price} a tu cuenta
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold">{survey.title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-800 rounded-full p-2 transition-colors"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {survey.questions.map((q, idx) => (
            <div key={idx} className="border-b pb-6 last:border-b-0">
              <label className="block text-gray-800 font-semibold mb-3">
                {idx + 1}. {q.question}
              </label>

              {q.type === "text" && (
                <textarea
                  value={answers[idx] || ""}
                  onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Escribe tu respuesta aquí..."
                />
              )}

              {q.type === "radio" && (
                <div className="space-y-2">
                  {q.options?.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={opt}
                        checked={answers[idx] === opt}
                        onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.type === "scale" && (
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                  {q.options?.map((opt) => (
                    <label
                      key={opt}
                      className="flex flex-col items-center cursor-pointer hover:bg-white p-3 rounded-lg transition-colors"
                    >
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={opt}
                        checked={answers[idx] === opt}
                        onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
                        className="h-5 w-5 text-blue-600 mb-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 font-semibold">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Enviando..." : "Aceptar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// === DASHBOARD PRINCIPAL ===
export const SegundaOportunidadDashboard: React.FC<SegundaOportunidadDashboardProps> = ({
  userName = "Juan Pérez",
  currentBalance,
  customerId,
  onBalanceUpdate,
}) => {
  const router = useRouter();

  // 1️⃣ Mostrar términos solo la primera vez
  const [showTermsModal, setShowTermsModal] = useState(false);
  useEffect(() => {
    const accepted = localStorage.getItem("acceptedTerms");
    if (!accepted) setShowTermsModal(true);
  }, []);
  const handleAcceptTerms = () => {
    localStorage.setItem("acceptedTerms", "true");
    setShowTermsModal(false);
  };

  // 2️⃣ Guardar encuestas completadas de forma persistente
  const [completedSurveys, setCompletedSurveys] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("completedSurveys");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionClick = (option: string) => {
    setActiveModal(option);
  };

  const handleSurveySubmit = async (option: string, amount: number) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/update-balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          amount,
          surveyId: surveys[option].id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const updated = new Set([...completedSurveys, option]);
        setCompletedSurveys(updated);
        localStorage.setItem("completedSurveys", JSON.stringify(Array.from(updated)));

        setActiveModal(null);
        if (onBalanceUpdate) onBalanceUpdate();

        // 3️⃣ Redirigir al Home al terminar encuesta
        router.push("/dashboard");
      } else {
        alert(`Error: ${data.error || "No se pudo actualizar el balance"}`);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
      alert("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const options = [
    {
      key: "Plan de Pagos",
      icon: HiDocumentText,
      title: "Universidad Tecnologica de Monterrey",
      description:
        "Le extendemos una cordial invitación para participar en una investigación académica realizada por la Universidad Tecnologica de Monterrey. El objetivo principal de este estudio es analizar la relación entre el uso de dispositivos digitales, las estrategias de estudio y el bienestar emocional de la población estudiantil.",
      price: 15,
    },
    {
      key: "Realizar Pago",
      icon: HiMicrophone,
      title: "Universidad Tecnologica",
      description:
        "Capital One, en colaboración con la Universidad Tecnologica De Torreon, le ofrece la oportunidad de reducir su deuda pendiente de tarjeta de crédito participando en un estudio científico sobre reconocimiento de voz humana.",
      price: 10,
    },
    {
      key: "Contactar Asesor",
      icon: HiDocumentText,
      title: "Capital One",
      description:
        "Le invitamos a participar en una encuesta rápida sobre un nuevo producto tecnológico. Sus opiniones nos ayudarán a mejorar el diseño y la experiencia del producto antes de su lanzamiento.",
      price: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 mb-8 shadow-xl">
          {currentBalance !== undefined && (
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-blue-700 text-base font-bold shadow-lg">
                {typeof currentBalance === "number"
                  ? `$${currentBalance.toFixed(2)}`
                  : currentBalance}
              </span>
            </div>
          )}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido, {userName}!</h1>
            <p className="text-blue-100 text-lg">Programa Segunda Oportunidad</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed text-center">
            Estás en el camino correcto para recuperar tu estabilidad financiera.
            Selecciona una de las opciones a continuación para continuar.
          </p>
        </div>

        <div className="space-y-4">
          {options.map((opt) => (
            <OptionCard
              key={opt.key}
              icon={opt.icon}
              title={opt.title}
              description={opt.description}
              onClick={() => handleOptionClick(opt.key)}
              price={opt.price}
              isCompleted={completedSurveys.has(opt.key)}
            />
          ))}
        </div>

        {completedSurveys.size > 0 && (
          <div className="mt-6 bg-green-50 rounded-xl p-6 border border-green-200">
            <p className="text-green-800 text-center font-semibold">
              ✓ Has completado {completedSurveys.size} encuesta
              {completedSurveys.size > 1 ? "s" : ""}
            </p>
          </div>
        )}

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2 text-center">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-sm text-blue-800 text-center">
            Nuestro equipo está disponible de Lunes a Viernes de 9:00 AM a 6:00 PM
          </p>
          <p className="text-sm text-blue-800 text-center mt-1">
            📞 Tel: 800-123-4567 | 📧 ayuda@segundaoportunidad.com
          </p>
        </div>
      </div>

      {/* Modal de encuesta */}
      {activeModal && surveys[activeModal] && !isLoading && (
        <SurveyModal
          survey={surveys[activeModal]}
          onClose={() => setActiveModal(null)}
          onSubmit={() => {
            const option = options.find((o) => o.key === activeModal);
            if (option) handleSurveySubmit(activeModal, option.price);
          }}
          price={options.find((o) => o.key === activeModal)?.price || 0}
        />
      )}

      {/* Modal de términos solo la primera vez */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 max-w-lg text-center shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Aceptar términos y condiciones
            </h2>
            <p className="text-gray-600 mb-6">
              Para continuar utilizando el programa Segunda Oportunidad, debes aceptar
              los términos y condiciones.
            </p>
            <button
              onClick={handleAcceptTerms}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
