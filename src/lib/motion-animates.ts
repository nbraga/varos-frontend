export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay de 0.2s entre cada item
      delayChildren: 0.1, // Delay inicial antes do primeiro item
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20, // Vem de baixo
    scale: 0.9, // Começa menor
  },
  visible: {
    opacity: 1,
    y: 0, // Vai para posição normal
    scale: 1, // Escala normal
    transition: {
      stiffness: 100,
      damping: 12,
      duration: 0.5,
    },
  },
};
