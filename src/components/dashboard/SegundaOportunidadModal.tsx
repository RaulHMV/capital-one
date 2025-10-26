"use client";

import React, { useState } from 'react';
import { HiX } from 'react-icons/hi';

interface SegundaOportunidadModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export const SegundaOportunidadModal: React.FC<SegundaOportunidadModalProps> = ({
  isOpen,
  onAccept,
  onReject,
}) => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  if (!isOpen) return null;

  const canAccept = acceptTerms && acceptPrivacy;

  const handleAccept = () => {
    if (canAccept) {
      onAccept();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-center">Segunda Oportunidad</h2>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-4">
          <div className="space-y-3 text-gray-700">
            <h3 className="font-semibold text-lg text-blue-700">
              ¿Qué es Segunda Oportunidad?
            </h3>
            
            <p className="text-sm leading-relaxed">
              Segunda Oportunidad es un programa diseñado para ayudarte a recuperar el control de tus finanzas personales cuando tienes un saldo negativo en tu cuenta de crédito.
            </p>

            <h4 className="font-semibold text-blue-700 mt-4">Beneficios:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Plan de pago personalizado según tu capacidad</li>
              <li>Reducción de intereses moratorios</li>
              <li>Asesoría financiera gratuita</li>
              <li>Sin afectación a tu historial crediticio</li>
              <li>Flexibilidad en los plazos de pago</li>
            </ul>

            <h4 className="font-semibold text-blue-700 mt-4">Requisitos:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Tener un saldo negativo en tu cuenta</li>
              <li>Comprometerte a realizar pagos mensuales</li>
              <li>Mantener comunicación activa con tu asesor</li>
              <li>No generar nuevos cargos durante el programa</li>
            </ul>

            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-xs text-blue-900">
                <strong>Nota importante:</strong> Al aceptar este programa, te comprometes a seguir el plan de pagos acordado. El incumplimiento puede resultar en la cancelación del programa y la aplicación de medidas adicionales.
              </p>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-3 pt-4 border-t">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Acepto los términos y condiciones del programa Segunda Oportunidad
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptPrivacy}
                onChange={(e) => setAcceptPrivacy(e.target.checked)}
                className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Acepto las políticas de privacidad y el tratamiento de mis datos personales
              </span>
            </label>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t flex gap-3">
          <button
            onClick={onReject}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            disabled={!canAccept}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-colors ${
              canAccept
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};