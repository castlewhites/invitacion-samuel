

const invitados = [
  { id: 1, nombre: "PÉREZ PÉREZ", cupos: 4 },
  { id: 2, nombre: "Familia Gómez", cupos: 3 },
  { id: 3, nombre: "Familia Rodríguez", cupos: 2 },
];

const generarLink = (invitado: any) => {
  const urlBase = "http://localhost:5173/invitacion-samuel"; // Ruta de la invitación
  return `${urlBase}?familia=${encodeURIComponent(invitado.nombre)}&cupos=${invitado.cupos}`;
};

const ListaInvitados = () => {
  return (
    <div>
      <h2>Invitados</h2>
      <ul>
        {invitados.map((invitado) => (
          <li key={invitado.id}>
            <p>
              {invitado.nombre} - {invitado.cupos} cupos
            </p>
            <a
              href={generarLink(invitado)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver invitación
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaInvitados;
