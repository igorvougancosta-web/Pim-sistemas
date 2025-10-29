import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios"; 

// URL DA API C# (VERIFIQUE SUA PORTA!)
const API_URL = "https://localhost:7143/api/Auth/login"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => { 
    e.preventDefault();

    if (!username || !password) {
      toast({
        title: "Erro de autenticação",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    try {
      // REQUISIÇÃO REAL AO BACKEND C#
      const response = await axios.post(API_URL, {
        username: username,
        password: password,
      });

      const { token, role } = response.data; // Recebe o token e a role

      // SALVAR O TOKEN E A ROLE
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo! Redirecionando para o painel de ${role}...`,
      });

      // CORREÇÃO AQUI: REDIRECIONAMENTO PARA AS ROTAS CORRETAS REGISTRADAS NO APP.TSX
      if (role === "Admin") {
        navigate("/AdminDashboard"); // ROTA CORRETA
      } else if (role === "Entregador") {
        navigate("/DeliveryConfirmation"); // ROTA CORRETA
      } else {
        navigate("/"); 
      }
    } catch (error) {
      // TRATAMENTO DE ERROS
      let errorMessage = "Credenciais inválidas. Tente novamente.";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || "Credenciais inválidas.";
      }

      toast({
        title: "Falha na Autenticação",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-prologi-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg prologi-shadow p-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-prologi-dark-blue mb-2">
              Prólogi
            </h1>
            <p className="text-prologi-medium-gray text-sm">
              Gestão de Rotas de Entrega
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Campo de usuário */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-prologi-medium-gray h-5 w-5" />
              <Input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 h-12 border-2 border-gray-200 focus:border-prologi-light-blue rounded-lg"
              />
            </div>

            {/* Campo de senha */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-prologi-medium-gray h-5 w-5" />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 border-2 border-gray-200 focus:border-prologi-light-blue rounded-lg"
              />
            </div>

            {/* Botão de login */}
            <Button
              type="submit"
              className="w-full h-12 bg-prologi-dark-blue hover:bg-prologi-dark-blue/90 text-white font-medium rounded-lg transition-colors"
            >
              Entrar
            </Button>
          </form>

          {/* Esqueci minha senha */}
          <div className="text-center mt-6">
            <button className="text-prologi-light-blue hover:underline text-sm">
              Esqueci minha senha
            </button>
          </div>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-prologi-medium-gray text-center mb-2">
              Credenciais de demonstração:
            </p>
            <div className="text-xs text-center space-y-1">
              <div>Admin: admin / admin</div>
              <div>Entregador: entregador / 12345</div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;