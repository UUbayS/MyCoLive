"use client";
import React from "react";
import RoomCard, { RoomCardData } from "./RoomCard";

interface RoomListProps {
  rooms: RoomCardData[];
  showEdit?: boolean;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, showEdit = false }) => {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">Belum ada ruangan</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={{ ...room, showEdit }} />
      ))}
    </div>
  );
};

export default RoomList;
