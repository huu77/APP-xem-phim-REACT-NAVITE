 
import React from 'react';
 
 import Navigation from './src/Navigation';
import rootStore, { StoreProvider } from './src/StoreMobx';
function App() {
  
  return (
<StoreProvider value={rootStore}>
  <Navigation/>
</StoreProvider>
 
  );
}
 

export default App;
