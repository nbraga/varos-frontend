"use client";

export const UserStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-card p-4 rounded-lg border shadow-sm">
        <p className="text-sm text-muted-foreground">Total de Usuários</p>
        <p className="text-2xl font-bold">{0}</p>
      </div>
      <div className="bg-card p-4 rounded-lg border shadow-sm">
        <p className="text-sm text-muted-foreground">Clientes</p>
        <p className="text-2xl font-bold">{0}</p>
      </div>
      <div className="bg-card p-4 rounded-lg border shadow-sm">
        <p className="text-sm text-muted-foreground">Consultores</p>
        <p className="text-2xl font-bold">{0}</p>
      </div>
    </div>
  );
};
