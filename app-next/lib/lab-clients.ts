// Registro de quién puede entrar a /lab y a qué hub llega. Deliberadamente
// un array en código, no una base de datos — agregar un cliente nuevo es
// agregar una línea acá + una variable de entorno con su contraseña
// (constitución, principio III: /lab es vitrina, no producto).
import { timingSafeEqual } from "./lab-session";

export type LabClient = {
  /** Usuario que se compara contra lo que se tipea en el gate (case-insensitive). */
  username: string;
  /** Nombre de la variable de entorno que guarda su contraseña real. */
  passwordEnvVar: string;
  /** Slug del hub al que se lo redirige tras loguearse: /lab/{clientSlug}. */
  clientSlug: string;
};

export const LAB_CLIENTS: LabClient[] = [
  {
    username: "Mark",
    passwordEnvVar: "LAB_PASSWORD_MARK",
    clientSlug: "retail-scheduling",
  },
];

/**
 * Valida usuario+contraseña contra el registro de clientes. Fail-safe: si la
 * env var de contraseña de ese usuario no está configurada, siempre null.
 * Devuelve el LabClient completo (con su clientSlug) para poder redirigir a
 * su hub, o null si las credenciales no coinciden con ningún cliente.
 */
export function verifyLabCredentials(
  username: string,
  password: string,
): LabClient | null {
  const client = LAB_CLIENTS.find(
    (c) => c.username.toLowerCase() === username.toLowerCase(),
  );
  if (!client) return null;

  const expectedPassword = process.env[client.passwordEnvVar];
  if (!expectedPassword) return null;

  return timingSafeEqual(password, expectedPassword) ? client : null;
}
