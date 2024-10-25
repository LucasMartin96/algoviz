'use client';

import React from 'react';
import { AppProviders } from './Context/Providers';
import Layout from './Layout/Layout';
import ArrayContainer from './Array/ArrayContainer';

// TODO: Agregar un visualizador de codigo y si es posible debugear ese codigo
// TODO: Agregar un array container mejorado
// TODO: Agregar un visualizador de memoria, para poder ver como se guardan los datos en la memoria en el caso de que el algoritmo use
const SortingVisualizer: React.FC = () => {
  return (
    <AppProviders>
      <Layout>
        <ArrayContainer />
      </Layout>
    </AppProviders>
  );
};

export default SortingVisualizer;
