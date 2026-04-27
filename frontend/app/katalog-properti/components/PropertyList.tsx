"use client";
import React from "react";
import PropertyCard, { PropertyData } from "./PropertyCard";

const PropertyList: React.FC<{ properties: PropertyData[] }>= ({ properties }) => {
  if (!properties || properties.length === 0) {
    return <div className="text-sm text-gray-600">Tidak ada properti yang ditemukan.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
};

export default PropertyList;
