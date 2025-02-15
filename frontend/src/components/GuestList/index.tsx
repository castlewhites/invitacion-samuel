

const invitados = [
    { id: 1, nombre: "MARTHA SALAS", cupos: 1 },
    { id: 2, nombre: "MIRIAM SALAS", cupos: 1 },
    { id: 3, nombre: "CAMILO MARTINEZ", cupos: 2 },
    { id: 4, nombre: "NICOLAS VARÓN Y FAMILIA", cupos: 3 },
    { id: 5, nombre: "ABUELITOS BETTY Y CARLOS", cupos: 2 },
    { id: 6, nombre: "PAULA CASTILLO Y FAMILIA", cupos: 4 },
    { id: 7, nombre: "HEIMY BLANCO Y FAMILIA", cupos: 3 },
    { id: 8, nombre: "MAURICIO SALAS", cupos: 1 },
    { id: 9, nombre: "CAMI Y JUANDI", cupos: 2 },
    { id: 10, nombre: "ANGÉLICA Y MAJO", cupos: 2 },
    { id: 11, nombre: "ANGIE GÓMEZ Y FAMILIA", cupos: 3 },
    { id: 12, nombre: "JESSI CIFUENTES Y CHARLY", cupos: 2 },
    { id: 13, nombre: "CATA CIFUENTES Y FAMILIA", cupos: 3 },
    { id: 14, nombre: "JUANCHO Y MANUELA", cupos: 2 },
    { id: 15, nombre: "DIANA Y FAMILIA", cupos: 4 },
    { id: 16, nombre: "MATEO EZQUIVEL", cupos: 1 },
    { id: 17, nombre: "FELIPE OLIVARES", cupos: 1 },
    { id: 18, nombre: "LEANDRO SERRATO", cupos: 1 },
    { id: 19, nombre: "ANNY VELANDIA Y FAMILIA", cupos: 3 },
    { id: 20, nombre: "FIDEL DIAZ", cupos: 1 },
    { id: 21, nombre: "JEFFER Y TATI", cupos: 2 },
    { id: 22, nombre: "JENNY DIAZ Y FAMILIA", cupos: 3 },
    { id: 23, nombre: "JULY DIAZ", cupos: 1 },
    { id: 24, nombre: "KEVIN Y DANI", cupos: 2 },
    { id: 25, nombre: "MAIRA CASTIBLANCO", cupos: 3 },
    { id: 26, nombre: "LINA LONDOÑO", cupos: 1 },
    { id: 27, nombre: "KAREN GOMEZ", cupos: 1 },
    { id: 28, nombre: "MATEO OLIVARES", cupos: 1 },
    { id: 29, nombre: "FAMILIA CASTIBLANCO IBAÑEZ", cupos: 3 },
    { id: 30, nombre: "RICARDO Y FAMILIA", cupos: 2 },
    { id: 31, nombre: "JAMER HERNANDEZ Y FAMILIA", cupos: 3 },
    { id: 32, nombre: "JULIAN HERNANDEZ Y FAMILIA", cupos: 2 },
    { id: 33, nombre: "MABEL MORENO Y FAMILIA", cupos: 3 },
    { id: 34, nombre: "ANGIE MURILLO", cupos: 1 },
    { id: 35, nombre: "LAURA PIRAQUIVE Y FAMILIA", cupos: 4 },
    { id: 36, nombre: "KIS", cupos: 2 },
    { id: 37, nombre: "SANTIAGO CASTILLO", cupos: 1 },
    { id: 38, nombre: "PAOLA HERNANDEZ", cupos: 1 },
    { id: 39, nombre: "CARLOS CASTILLO", cupos: 1 },
    { id: 40, nombre: "LUIS Y ROSA ", cupos: 2 },
    { id: 41, nombre: "TATIANA ", cupos: 2 },
];

const generarLink = (invitado: any) => {
  const urlBase = "https://castlewhites.github.io/invitacion-samuel"; // Ruta de la invitación
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
