export enum Fotos {
    LabEspecializado = '/assets/img/lab_especializado.webp',
    LabMetodologias = '/assets/img/lab_metodologias.webp',
    Sala = '/assets/img/sala.webp',
}

export const FotosPorNumero: Record<number, Fotos> = {
  1: Fotos.Sala,
  2: Fotos.LabEspecializado,
  3: Fotos.LabMetodologias
};