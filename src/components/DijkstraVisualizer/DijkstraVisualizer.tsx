'use client';

import React from 'react';
import { AppProviders } from './Context/Providers';
import Layout from './Layout/Layout';
import GraphContainer from './Graph/GraphContainer';

// TODO: Agregar otro tipo de visualizador, imaginando un grid donde cada cuadradito es un nodo, asi se veria mejor la propagacion de la busqueda
// TODO: Agregar visualizador de codigo y si es posible debugear ese codigo
// TODO: Agregar un graph container mejorado, que permita hacer zoom y mover e lgrafo
const DijkstraVisualizer: React.FC = () => {
  return (
    <AppProviders>
      <Layout>
        <GraphContainer />
      </Layout>
    </AppProviders>
  );
};

export default DijkstraVisualizer;
