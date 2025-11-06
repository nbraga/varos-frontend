"use client";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Dashboard de Usuários. Todos os
            direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Privacidade
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Termos
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Suporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
