
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, CheckCircle } from "lucide-react";

interface Client {
  id: string;
  name: string;
  address: string;
  status: "pending" | "en-route" | "delivered";
  priority: number;
}

const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const [clients] = useState<Client[]>([
    {
      id: "1",
      name: "Padaria São João",
      address: "Rua das Flores, 123 - Centro",
      status: "pending",
      priority: 1,
    },
    {
      id: "2",
      name: "Mercado Família",
      address: "Av. Principal, 456 - Jardim Europa",
      status: "pending",
      priority: 2,
    },
    {
      id: "3",
      name: "Restaurante Sabor",
      address: "Rua do Comércio, 789 - Vila Nova",
      status: "en-route",
      priority: 3,
    },
    {
      id: "4",
      name: "Lanchonete Central",
      address: "Praça Central, 321 - Centro",
      status: "delivered",
      priority: 4,
    },
  ]);

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { color: "bg-prologi-medium-gray text-white", label: "Pendente", icon: Clock },
      "en-route": { color: "bg-prologi-light-blue text-white", label: "Em Rota", icon: Navigation },
      delivered: { color: "bg-green-500 text-white", label: "Entregue", icon: CheckCircle },
    };
    
    const variant = variants[status as keyof typeof variants];
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} text-xs`}>
        <Icon className="w-3 h-3 mr-1" />
        {variant.label}
      </Badge>
    );
  };

  const handleStartRoute = () => {
    // Simulação de início de rota
    window.open(
      "https://www.google.com/maps/dir/Current+Location/Rua+das+Flores,+123+-+Centro/Av.+Principal,+456+-+Jardim+Europa/Rua+do+Comércio,+789+-+Vila+Nova",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-prologi-white">
      {/* Header */}
      <div className="bg-white prologi-shadow p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-prologi-dark-blue">
            Minhas Entregas de Hoje
          </h1>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            size="sm"
            className="border-prologi-medium-gray text-prologi-medium-gray"
          >
            Sair
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Lista de clientes */}
        <div className="bg-white rounded-lg prologi-shadow p-4">
          <h2 className="font-medium text-prologi-dark-blue mb-4">
            Lista de Entregas ({clients.length})
          </h2>
          
          <div className="space-y-3">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-prologi-dark-blue">
                      {client.name}
                    </h3>
                    {getStatusBadge(client.status)}
                  </div>
                  <div className="flex items-center text-sm text-prologi-medium-gray">
                    <MapPin className="w-4 h-4 mr-1" />
                    {client.address}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(client.address)}`, "_blank")}
                    className="border-prologi-light-blue text-prologi-light-blue hover:bg-prologi-light-blue hover:text-white"
                  >
                    Ver no mapa
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/delivery/confirm/${client.id}`)}
                    className="border-prologi-light-blue text-prologi-light-blue hover:bg-prologi-light-blue hover:text-white"
                  >
                    Ver Pedido
                 
                  </Button>
                  
                  
                  {client.status !== "delivered" && (
                    <Button
                      size="sm"
                      onClick={() => navigate(`/delivery/confirm/${client.id}`)}
                      className="bg-prologi-dark-blue hover:bg-prologi-dark-blue/90 text-white"
                    >
                      Confirmar
                    </Button>

                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mapa integrado */}
        <div className="bg-white rounded-lg prologi-shadow p-4">
          <h2 className="font-medium text-prologi-dark-blue mb-4">
            Rota Completa
          </h2>
          
          {/* Placeholder do mapa - em produção seria um iframe do Google Maps */}
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-prologi-light-blue mx-auto mb-2" />
              <p className="text-prologi-medium-gray">
                Mapa com trajeto completo
              </p>
              <p className="text-sm text-prologi-medium-gray mt-1">
                {clients.filter(c => c.status !== "delivered").length} entregas pendentes
              </p>
            </div>
          </div>
          
          {/* Botão Iniciar Rota */}
          <Button
            onClick={handleStartRoute}
            className="w-full h-12 prologi-gradient text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <Navigation className="w-5 h-5 mr-2" />
            Iniciar Rota no Google Maps
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
