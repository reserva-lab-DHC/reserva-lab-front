export interface UserDTO {
    nomeUsuario: string;
    email?: string;
    senha: string;
    repetirSenha?: string;
    cargo?: string
}