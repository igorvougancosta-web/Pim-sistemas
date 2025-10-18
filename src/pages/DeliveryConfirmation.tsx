
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  quantity: number;
  delivered: boolean;
}

const DeliveryConfirmation = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();
  
  const [clientData] = useState({
    name: "Padaria São João",
    address: "Rua das Flores, 123 - Centro, São Paulo - SP",
    phone: "(11) 98765-4321",
  });

  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Pão Francês (50 unidades)", quantity: 1, delivered: false },
    { id: "2", name: "Pão de Açúcar (20 unidades)", quantity: 1, delivered: false },
    { id: "3", name: "Croissant (15 unidades)", quantity: 1, delivered: false },
  ]);

  const [comments, setComments] = useState("");
  const [signature, setSignature] = useState("");

  const toggleProductDelivered = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, delivered: !product.delivered }
        : product
    ));
  };

  const handleConfirmDelivery = () => {
    const deliveredProducts = products.filter(p => p.delivered);
    
    if (deliveredProducts.length === 0) {
      toast({
        title: "Atenção",
        description: "Marque pelo menos um produto como entregue",
        variant: "destructive",
      });
      return;
    }

    if (!signature.trim()) {
      toast({
        title: "Assinatura necessária",
        description: "Por favor, solicite a assinatura do cliente",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Entrega confirmada!",
      description: `${deliveredProducts.length} produtos entregues com sucesso`,
    });

    // Simulação de confirmação
    setTimeout(() => {
      navigate("/delivery");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-prologi-white">
      {/* Header */}
      <div className="bg-white prologi-shadow p-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/delivery")}
            variant="ghost"
            size="sm"
            className="text-prologi-dark-blue"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>
          <h1 className="text-xl font-semibold text-prologi-dark-blue">
            Confirmação de Entrega
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Dados do cliente */}
        <div className="bg-white rounded-lg prologi-shadow p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-prologi-light-blue rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-prologi-dark-blue">
                {clientData.name}
              </h2>
              <Badge className="bg-prologi-light-blue text-white text-xs">
                Cliente #{clientId}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-start gap-2 text-sm text-prologi-medium-gray mb-2">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{clientData.address}</span>
          </div>
          
          <p className="text-sm text-prologi-medium-gray">
            Telefone: {clientData.phone}
          </p>
        </div>

        {/* Lista de produtos */}
        <div className="bg-white rounded-lg prologi-shadow p-4">
          <h3 className="font-medium text-prologi-dark-blue mb-4">
            Produtos para Entrega
          </h3>
          
          <div className="space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
              >
                <Checkbox
                  checked={product.delivered}
                  onCheckedChange={() => toggleProductDelivered(product.id)}
                  className="data-[state=checked]:bg-prologi-light-blue data-[state=checked]:border-prologi-light-blue"
                />
                <div className="flex-1">
                  <p className={`font-medium ${
                    product.delivered 
                      ? "text-green-600 line-through" 
                      : "text-prologi-dark-blue"
                  }`}>
                    {product.name}
                  </p>
                  <p className="text-sm text-prologi-medium-gray">
                    Quantidade: {product.quantity}
                  </p>
                </div>
                {product.delivered && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comentários */}
        <div className="bg-white rounded-lg prologi-shadow p-4">
          <h3 className="font-medium text-prologi-dark-blue mb-4">
            Observações (Opcional)
          </h3>
          <Textarea
            placeholder="Adicione observações sobre a entrega..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="min-h-[80px] border-2 border-gray-200 focus:border-prologi-light-blue"
          />
        </div>

        {/* Assinatura */}
        <div className="bg-white rounded-lg prologi-shadow p-4">
          <h3 className="font-medium text-prologi-dark-blue mb-4">
            Assinatura do Cliente
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[120px] bg-gray-50">
            <Input
              placeholder="Nome completo do responsável pelo recebimento"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              className="border-0 bg-transparent text-center text-lg placeholder:text-prologi-medium-gray focus-visible:ring-0"
            />
            <p className="text-xs text-prologi-medium-gray text-center mt-2">
              Digite o nome do responsável que recebeu a entrega
            </p>
          </div>
        </div>

        {/* Botão de confirmação */}
        <div className="pb-4">
          <Button
            onClick={handleConfirmDelivery}
            className="w-full h-12 prologi-gradient text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirmar Entrega
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryConfirmation;
