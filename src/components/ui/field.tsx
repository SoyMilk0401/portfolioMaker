import React from "react";

interface FieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function Field({ icon, label, value }: FieldProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-blue-600">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{label}</h3>
        <p className="text-gray-700 text-sm">{value}</p>
      </div>
    </div>
  );
}
